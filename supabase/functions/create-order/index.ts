import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...corsHeaders,'Content-Type':'application/json'}});
Deno.serve(async(req)=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:corsHeaders});
 if(req.method!=='POST')return json({error:'Method not allowed'},405);
 try{
  const body=await req.json(); const c=body.customer||{},d=body.delivery||{},items=body.items||[];
  const required=[c.name,c.email,c.phone,d.recipient_name,d.recipient_phone,d.address_line1,d.city,d.state];
  if(required.some(v=>typeof v!=='string'||!v.trim())||!Array.isArray(items)||items.length<1||items.length>30)return json({error:'Please complete all required details and add at least one item.'},400);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))return json({error:'Please provide a valid email address.'},400);
  const url=Deno.env.get('SUPABASE_URL')!,key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const db=createClient(url,key,{auth:{persistSession:false}});
  const ids=items.map((x:any)=>x.product_id);
  if(ids.some((id:any)=>typeof id!=='string'))return json({error:'Invalid product selection.'},400);
  const {data:products,error:productError}=await db.from('products').select('id,name,price,is_active,track_inventory,stock_quantity,is_personalisable').in('id',ids).eq('is_active',true);
  if(productError)throw productError;
  const byId=new Map((products||[]).map((p:any)=>[p.id,p]));
  let subtotal=0;const lines=[];
  for(const item of items){const p=byId.get(item.product_id);const q=Number(item.quantity);if(!p||!Number.isInteger(q)||q<1||q>20)return json({error:'A selected product or quantity is no longer available.'},400);if(p.track_inventory&&p.stock_quantity<q)return json({error:p.name+' does not have enough stock for this quantity.'},409);const price=Number(p.price);subtotal+=price*q;lines.push({product_id:p.id,product_name:p.name,unit_price:price,quantity:q,personalisation_note:p.is_personalisable?String(item.personalisation_note||'').slice(0,1000):null,line_total:price*q});}
  // Delivery is confirmed by the ONE O team; never invent a fee or payment details.
  const {data:order,error:orderError}=await db.from('orders').insert({customer_name:c.name.trim().slice(0,160),customer_email:c.email.trim().toLowerCase(),customer_phone:c.phone.trim().slice(0,40),recipient_name:d.recipient_name.trim().slice(0,160),recipient_phone:d.recipient_phone.trim().slice(0,40),address_line1:d.address_line1.trim().slice(0,240),address_line2:String(d.address_line2||'').slice(0,240),city:d.city.trim().slice(0,100),state:d.state.trim().slice(0,100),postal_code:String(d.postal_code||'').slice(0,30),delivery_note:String(d.delivery_note||'').slice(0,1000),gift_message:String(body.gift_message||'').slice(0,1000),subtotal,delivery_fee:0,total_amount:subtotal,status:'received',payment_status:'unpaid'}).select('id,order_number').single();
  if(orderError)throw orderError;
  const {error:lineError}=await db.from('order_items').insert(lines.map(x=>({...x,order_id:order.id})));
  if(lineError){await db.from('orders').delete().eq('id',order.id);throw lineError;}
  return json({id:order.id,order_number:order.order_number});
 }catch(e){console.error('create-order failed',e);return json({error:'We could not submit your order just now. Please try again or contact ONE O.'},500);}
});
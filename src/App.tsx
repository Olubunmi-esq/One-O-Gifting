import { useEffect,useMemo,useState } from 'react';
import { ArrowRight,ArrowUpRight,Check,ChevronDown,Heart,Menu,Minus,Plus,ShoppingBag,X,PackageCheck,Instagram,Mail,MapPin,Lock,LogOut,LayoutDashboard,ClipboardList,Boxes } from 'lucide-react';
import { demoProducts, type Product } from './data/products';
import { supabase } from './lib/supabase';
import { calculateCartSubtotal, normaliseQuantity } from './lib/commerce';
type CartLine={product:Product;quantity:number;note:string};
type Page='home'|'shop'|'story'|'corporate'|'contact'|'checkout'|'admin';
const money=(n:number)=>new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n);
function App(){
 const [page,setPage]=useState<Page>(()=>location.pathname.startsWith('/admin')?'admin':location.pathname==='/shop'?'shop':location.pathname==='/our-story'?'story':location.pathname==='/corporate-gifting'?'corporate':location.pathname==='/contact'?'contact':location.pathname==='/checkout'?'checkout':'home');
 const [cart,setCart]=useState<CartLine[]>(()=>{try{return JSON.parse(localStorage.getItem('oneo-cart')||'[]')}catch{return[]}});
 const [drawer,setDrawer]=useState(false),[mobile,setMobile]=useState(false),[category,setCategory]=useState('All gifts'),[search,setSearch]=useState(''),[notice,setNotice]=useState('');
 const [products,setProducts]=useState<Product[]>(demoProducts);
 useEffect(()=>{localStorage.setItem('oneo-cart',JSON.stringify(cart))},[cart]);
 useEffect(()=>{if(supabase){supabase.from('products').select('*').eq('is_active',true).order('created_at',{ascending:false}).then(({data,error})=>{if(!error&&data)setProducts(data.map((p:any)=>({...p,active:p.is_active,personalised:p.is_personalisable,featured:p.is_featured,occasion:p.occasions||[],imageUrls:p.image_urls||[]})))})}},[]);
 const navigate=(p:Page,path?:string)=>{setPage(p);history.pushState({},'',path||({home:'/',shop:'/shop',story:'/our-story',corporate:'/corporate-gifting',contact:'/contact',checkout:'/checkout',admin:'/admin'} as Record<Page,string>)[p]);setMobile(false);setDrawer(false);window.scrollTo(0,0)};
 useEffect(()=>{const f=()=>{const p=location.pathname;setPage(p.startsWith('/admin')?'admin':p==='/shop'?'shop':p==='/our-story'?'story':p==='/corporate-gifting'?'corporate':p==='/contact'?'contact':p==='/checkout'?'checkout':'home')};addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);
 const add=(product:Product)=>{setCart(old=>{const found=old.find(x=>x.product.id===product.id);return found?old.map(x=>x.product.id===product.id?{...x,quantity:normaliseQuantity(x.quantity+1)}:x):[...old,{product,quantity:1,note:''}]});setDrawer(true)};
 const count=cart.reduce((n,x)=>n+x.quantity,0),subtotal=calculateCartSubtotal(cart.map(x=>({unitPrice:x.product.price,quantity:x.quantity})));
 const filtered=useMemo(()=>products.filter(p=>p.active&&(category==='All gifts'||p.category===category||p.occasion.includes(category))&&(p.name+' '+p.description+' '+p.category).toLowerCase().includes(search.toLowerCase())),[products,category,search]);
 const updateQty=(id:string,delta:number)=>setCart(old=>old.map(x=>x.product.id===id?{...x,quantity:normaliseQuantity(x.quantity+delta)}:x));
 const updateNote=(id:string,note:string)=>setCart(old=>old.map(x=>x.product.id===id?{...x,note}:x));
 return <><div className="announcement">Thoughtful gifting, made personal. <span>Discover the ONE O experience</span></div><header className="header"><button className="icon-btn mobile-toggle" onClick={()=>setMobile(!mobile)} aria-label="Menu"><Menu/></button><button className="wordmark" onClick={()=>navigate('home')}>ONE O<span>MADE WITH YOU IN MIND</span></button><nav className={mobile?'nav open':'nav'}><button onClick={()=>navigate('shop')}>Shop all</button><button onClick={()=>navigate('shop')}>Gift collections</button><button onClick={()=>navigate('corporate')}>Corporate gifting</button><button onClick={()=>navigate('story')}>Our story</button></nav><div className="header-actions"><button className="icon-btn" aria-label="Instagram"><Instagram/></button><button className="bag-btn" onClick={()=>setDrawer(true)}><ShoppingBag size={19}/><span>Bag</span><b>{count}</b></button></div></header>
 {page==='home'&&<><main><section className="hero"><div className="hero-copy"><p className="eyebrow">THE ART OF THOUGHTFUL GIVING</p><h1>Some gifts say<br/><em>everything.</em></h1><p className="hero-text">The best gifts do more than mark a moment. They make someone feel seen. Discover meaningful pieces, thoughtfully personalised and made with the recipient in mind.</p><button className="button dark" onClick={()=>navigate('shop')}>Find a meaningful gift <ArrowUpRight size={17}/></button><div className="hero-note"><span>01 / 03</span><span>PERSONALISED · HANDCRAFTED · THOUGHTFUL</span></div></div><div className="hero-art"><div className="art-sun"/><div className="gift gift-one"><span>ONE O</span></div><div className="gift gift-two"/><div className="art-ribbon"/><div className="art-caption">A little thought<br/>goes a long way.</div></div></section>
 <section className="intro section-pad"><p className="eyebrow">A GIFT SHOULD FEEL LIKE YOU THOUGHT OF THEM</p><h2>Not just something to give.<br/><em>Something to remember.</em></h2><p>ONE O is a meaningful gifting house for the moments, people and relationships worth celebrating. From handcrafted resin keepsakes to carefully curated gift boxes, every detail begins with one question: what would make this feel personal?</p></section>
 <section className="section-pad"><div className="section-head"><div><p className="eyebrow">A GOOD PLACE TO BEGIN</p><h2>Find the feeling.</h2></div><button className="text-link" onClick={()=>navigate('shop')}>Explore all gifts <ArrowRight size={16}/></button></div><div className="occasion-grid">{[['For the ones you love','Love'],['For a day worth remembering','Birthday'],['For the people who show up','Appreciation'],['For teams & milestones','Corporate']].map(([t,c],i)=><button className={'occasion occasion-'+i} key={c} onClick={()=>{setCategory(c);navigate('shop')}}><span>0{i+1}</span><strong>{t}</strong><i>Explore <ArrowUpRight size={14}/></i></button>)}</div></section>
 <section className="feature-band"><div className="feature-image"><div className="feature-object">ONE O</div></div><div className="feature-copy"><p className="eyebrow">MADE WITH MEANING</p><h2>The beauty is<br/>in the <em>details.</em></h2><p>Personalised names. Considered colour. A note that says what you sometimes cannot. We bring the pieces together so your gift feels like it could only ever belong to one person.</p><button className="button outline" onClick={()=>navigate('story')}>Get to know us <ArrowRight size={16}/></button></div></section>
 <section className="section-pad"><div className="section-head"><div><p className="eyebrow">THE ONE O EDIT</p><h2>Thoughtfully chosen.</h2></div><button className="text-link" onClick={()=>navigate('shop')}>Shop the collection <ArrowRight size={16}/></button></div><div className="product-grid">{products.filter(p=>p.featured).slice(0,3).map(p=><ProductCard key={p.id} product={p} add={add}/>)}</div>{!products.length&&<p className="catalogue-pending">Our first collection is being prepared with care. For a personalised or corporate gifting enquiry, <button className="text-link" onClick={()=>navigate('contact')}>speak to ONE O</button>.</p>}</section>
 <section className="corporate-strip"><div><p className="eyebrow">FOR BUSINESSES & BIG MOMENTS</p><h2>Make appreciation<br/><em>feel personal.</em></h2><p>Thoughtful corporate gifting for teams, clients, partners and milestones.</p><button className="button dark" onClick={()=>navigate('corporate')}>Explore corporate gifting <ArrowUpRight size={16}/></button></div><div className="corporate-art"><span>ONE O</span><small>THE SIGNATURE EDIT</small></div></section></main></>}
 {page==='shop'&&<main className="page-wrap"><div className="page-heading"><p className="eyebrow">THE ONE O COLLECTION</p><h1>Find a gift that <em>means something.</em></h1><p>Explore keepsakes, curated sets and thoughtful gestures, each made to feel personal.</p></div><div className="shop-tools"><div className="filters">{['All gifts','Curated gift sets','Resin keepsakes','Corporate gifting','Birthday','Love','Appreciation'].map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div><input className="search" placeholder="Search the collection" value={search} onChange={e=>setSearch(e.target.value)}/></div><p className="result-count">{filtered.length} pieces to discover</p><div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p} add={add}/>)}</div>{!filtered.length&&<p className="catalogue-pending">We are preparing this collection. <button className="text-link" onClick={()=>navigate('contact')}>Ask us about a gift</button>.</p>}</main>}
 {page==='story'&&<main className="page-wrap story-page"><p className="eyebrow">THE HEART OF ONE O</p><h1>Made with you<br/><em>in mind.</em></h1><div className="story-body"><p className="lead">We believe a gift is at its most beautiful when it carries a little piece of the person giving it, and a little understanding of the person receiving it.</p><p>ONE O began with a simple thought: meaningful gifting should feel considered, personal and memorable. Not rushed. Not chosen simply because it was available. But shaped around the person, the relationship and the moment.</p><p>We bring together personalised details, handcrafted resin pieces and curated gift collections to help you say what matters. Sometimes that is love. Sometimes gratitude. Sometimes a quiet reminder that someone is thought of.</p><p>Every order is an opportunity to make an ordinary object carry an extraordinary meaning. That is the care we want you to feel in every ONE O experience.</p><p className="signature">With thought, <strong>ONE O</strong></p></div></main>}
 {page==='corporate'&&<main className="page-wrap corporate-page"><p className="eyebrow">THOUGHTFUL GIFTING AT WORK</p><h1>Because appreciation<br/>should feel <em>personal.</em></h1><p className="lead">Make your brand part of a moment someone remembers. ONE O creates considered gifting for teams, clients, partners, events and milestones.</p><div className="corporate-benefits"><div><b>01</b><h3>Thoughtful curation</h3><p>Gift sets shaped around your people, occasion and budget.</p></div><div><b>02</b><h3>Personalised details</h3><p>Names, messages and branded touches that make the gift yours.</p></div><div><b>03</b><h3>Made to coordinate</h3><p>We work with you on quantities, presentation and delivery timelines.</p></div></div><CorporateForm/></main>}
 {page==='contact'&&<main className="page-wrap contact-page"><p className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</p><h1>Let's make it <em>meaningful.</em></h1><p>Questions about an order, a personalised piece or a gifting idea? Send us a note.</p><EnquiryForm/></main>}
 {page==='checkout'&&<Checkout cart={cart} subtotal={subtotal} updateQty={updateQty} updateNote={updateNote} onBack={()=>navigate('shop')} onComplete={(id)=>{setCart([]);setNotice('Your order request '+id+' has been received. We will be in touch to confirm the details and payment.');navigate('home')}}/>}
 {page==='admin'&&<Admin products={products} setProducts={setProducts} onExit={()=>navigate('home')}/>}
 <footer className="footer"><div className="footer-main"><div><button className="wordmark footer-mark" onClick={()=>navigate('home')}>ONE O<span>MADE WITH YOU IN MIND</span></button><p>Meaningful gifting, thoughtfully personalised.</p></div><div><b>EXPLORE</b><button onClick={()=>navigate('shop')}>Shop all gifts</button><button onClick={()=>navigate('corporate')}>Corporate gifting</button><button onClick={()=>navigate('story')}>Our story</button></div><div><b>HERE TO HELP</b><button onClick={()=>navigate('contact')}>Contact us</button><button onClick={()=>navigate('contact')}>Delivery & orders</button><button onClick={()=>navigate('contact')}>FAQs</button></div><div><b>STAY IN THE KNOW</b><p>Thoughtful notes, new collections and gifting inspiration.</p><Newsletter/></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ONE O. Made with you in mind.</span><span>Thoughtfully made. Meaningfully given.</span><button onClick={()=>navigate('admin')}>Admin</button></div></footer>
 {drawer&&<div className="overlay" onClick={()=>setDrawer(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your bag <span>({count})</span></h2><button className="icon-btn" onClick={()=>setDrawer(false)}><X/></button></div>{cart.length===0?<div className="empty-bag"><ShoppingBag size={32}/><h3>Your bag is waiting.</h3><p>Find something thoughtful to make someone's day.</p><button className="button dark" onClick={()=>navigate('shop')}>Explore gifts</button></div>:<><div className="cart-lines">{cart.map(x=><div className="cart-line" key={x.product.id}><div className="mini-art">{x.product.imageUrls?.[0]?<img src={x.product.imageUrls[0]} alt=""/>:<span>Photo pending</span>}</div><div className="cart-info"><b>{x.product.name}</b><small>{money(x.product.price)}</small><div className="qty"><button onClick={()=>updateQty(x.product.id,-1)}><Minus size={12}/></button>{x.quantity}<button onClick={()=>updateQty(x.product.id,1)}><Plus size={12}/></button></div></div><strong>{money(x.product.price*x.quantity)}</strong></div>)}</div><div className="drawer-foot"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><small>Delivery is calculated after your delivery details are provided.</small><button className="button dark full" onClick={()=>navigate('checkout')}>Continue to checkout <ArrowRight size={16}/></button></div></>}</aside></div>}
 {notice&&<div className="notice"><Check size={18}/>{notice}<button onClick={()=>setNotice('')}><X size={16}/></button></div>}
 </>;
}
function ProductCard({product,add}:{product:Product;add:(p:Product)=>void}){return <article className="product-card"><button className="product-visual" onClick={()=>add(product)} aria-label={'Add '+product.name+' to bag'}>{product.imageUrls?.[0]?<img className="product-photo" src={product.imageUrls[0]} alt={product.name} loading="lazy"/>:<span className="photo-pending">Original product photograph<br/>coming soon</span>}<span className="quick-add"><Plus size={17}/></span>{product.personalised&&<span className="personalised-tag">MADE PERSONAL</span>}</button><div className="product-meta"><div><p>{product.category}</p><h3>{product.name}</h3></div><b>{money(product.price)}</b></div><button className="product-add" onClick={()=>add(product)}>Add to bag <ArrowUpRight size={15}/></button></article>}
function EnquiryForm(){const [sent,setSent]=useState(false);return <form className="form-card" onSubmit={async e=>{e.preventDefault();const f=new FormData(e.currentTarget);if(!supabase){alert('The enquiry service is not connected yet. Please contact ONE O directly.');return}const {error}=await supabase.functions.invoke('create-enquiry',{body:{name:f.get('name'),email:f.get('email'),subject:f.get('subject'),message:f.get('message')}});if(error){alert('We could not send this message. Please try again.');return}setSent(true)}}><label>Your name<input name="name" required/></label><label>Email address<input type="email" name="email" required/></label><label>What is this about?<select name="subject"><option>General enquiry</option><option>Existing order</option><option>Personalised gifting</option><option>Corporate gifting</option></select></label><label>Your message<textarea name="message" rows={4} required/></label><button className="button dark" type="submit">Send enquiry <ArrowRight size={16}/></button>{sent&&<p className="success">Thank you. Your enquiry has been received.</p>}</form>}
function CorporateForm(){return <div className="corporate-form"><h2>Tell us what you have in mind.</h2><EnquiryForm/></div>}
function Newsletter(){const [done,setDone]=useState(false);return <form className="newsletter" onSubmit={async e=>{e.preventDefault();const email=String(new FormData(e.currentTarget).get('email'));if(!supabase){alert('The newsletter service is not connected yet.');return}const {error}=await supabase.functions.invoke('subscribe-newsletter',{body:{email}});if(error){alert('We could not complete your subscription. Please try again.');return}setDone(true)}}><input type="email" name="email" placeholder="Your email address" required/><button aria-label="Subscribe"><ArrowRight size={17}/></button>{done&&<small>You're on the list. Thank you.</small>}</form>}
function Checkout({cart,subtotal,updateQty,updateNote,onBack,onComplete}:{cart:CartLine[];subtotal:number;updateQty:(id:string,d:number)=>void;updateNote:(id:string,n:string)=>void;onBack:()=>void;onComplete:(id:string)=>void}){const [busy,setBusy]=useState(false),[error,setError]=useState('');return <main className="page-wrap checkout-page"><button className="back-link" onClick={onBack}>← Continue shopping</button><p className="eyebrow">THE FINAL DETAILS</p><h1>Let's get this <em>to them.</em></h1><div className="checkout-layout"><form className="form-card checkout-form" onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');const f=new FormData(e.currentTarget);const payload={customer:{name:f.get('name'),email:f.get('email'),phone:f.get('phone')},delivery:{recipient_name:f.get('recipient'),recipient_phone:f.get('recipient_phone'),address_line1:f.get('address'),city:f.get('city'),state:f.get('state'),postal_code:f.get('postal'),delivery_note:f.get('delivery_note')},items:cart.map(x=>({product_id:x.product.id,quantity:x.quantity,personalisation_note:x.note})),gift_message:f.get('gift_message')};try{if(!supabase)throw new Error('The ordering system is not connected yet. Please contact ONE O to place this order.');const {data,error}=await supabase.functions.invoke('create-order',{body:payload});if(error)throw error;onComplete(data.order_number||data.id)}catch(err:any){setError(err.message||'We could not submit your order. Please try again.')}finally{setBusy(false)}}}><h2>Your details</h2><div className="field-row"><label>Full name<input name="name" required autoComplete="name"/></label><label>Email address<input type="email" name="email" required autoComplete="email"/></label></div><label>Phone number<input name="phone" required autoComplete="tel" placeholder="+234"/></label><div className="form-divider"/><h2>Delivery details</h2><label>Recipient's name<input name="recipient" required/></label><label>Recipient's phone number<input name="recipient_phone" required placeholder="+234"/></label><label>Delivery address<input name="address" required placeholder="House number, street and area"/></label><div className="field-row"><label>City / town<input name="city" required/></label><label>State<input name="state" required placeholder="e.g. Oyo"/></label></div><label>Postal code (if applicable)<input name="postal"/></label><label>Delivery instructions<textarea name="delivery_note" rows={2}/></label><div className="form-divider"/><h2>A note from you</h2><label>Gift message (optional)<textarea name="gift_message" rows={3} placeholder="Write a message to include with the gift..."/></label><p className="fine-print">Your order is a request until our team confirms availability, delivery fee, production timeline and payment instructions. Please do not send payment until you receive an official confirmation from ONE O.</p>{error&&<p className="error">{error}</p>}<button className="button dark full" disabled={busy||!cart.length}>{busy?'Submitting...':'Submit order request'} <ArrowRight size={16}/></button></form><aside className="order-summary"><h2>Your order</h2>{cart.map(x=><div className="summary-line" key={x.product.id}><div><b>{x.product.name}</b><small>{x.quantity} × {money(x.product.price)}</small>{x.product.personalised&&<textarea placeholder="Personalisation details (name, colour, date...)" value={x.note} onChange={e=>updateNote(x.product.id,e.target.value)}/>}</div><strong>{money(x.product.price*x.quantity)}</strong><div className="qty"><button type="button" onClick={()=>updateQty(x.product.id,-1)}><Minus size={12}/></button>{x.quantity}<button type="button" onClick={()=>updateQty(x.product.id,1)}><Plus size={12}/></button></div></div>)}<div className="summary-total"><span>Subtotal</span><b>{money(subtotal)}</b></div><small>Delivery fee will be confirmed based on the destination.</small></aside></div></main>}
function Admin({products,setProducts,onExit}:{products:Product[];setProducts:(p:Product[])=>void;onExit:()=>void}) {
  const [session,setSession]=useState<any>(null);
  const [authorized,setAuthorized]=useState(false);
  const [checkingRole,setCheckingRole]=useState(true);
  const [tab,setTab]=useState('orders');
  const [orders,setOrders]=useState<any[]>([]);
  const [enquiries,setEnquiries]=useState<any[]>([]);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [refreshing,setRefreshing]=useState(false);

  useEffect(()=>{
    if(!supabase){setCheckingRole(false);return;}
    supabase.auth.getSession().then(({data})=>setSession(data.session));
    const {data}=supabase.auth.onAuthStateChange((_event,nextSession)=>setSession(nextSession));
    return ()=>data.subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    let alive=true;
    async function verify(){
      if(!supabase||!session){setAuthorized(false);setCheckingRole(false);return;}
      setCheckingRole(true);
      const {data,error}=await supabase.from('user_roles').select('role').eq('user_id',session.user.id).in('role',['admin','staff']);
      if(alive){setAuthorized(!error&&Boolean(data?.length));setCheckingRole(false);}
    }
    verify();
    return ()=>{alive=false;};
  },[session]);

  const refresh=async()=>{
    if(!supabase||!authorized)return;
    setRefreshing(true);
    const [ordersResult,enquiriesResult,productsResult]=await Promise.all([
      supabase.from('orders').select('*,order_items(*)').order('created_at',{ascending:false}),
      supabase.from('enquiries').select('*').order('created_at',{ascending:false}),
      supabase.from('products').select('*').order('created_at',{ascending:false}),
    ]);
    if(!ordersResult.error)setOrders(ordersResult.data||[]);
    if(!enquiriesResult.error)setEnquiries(enquiriesResult.data||[]);
    if(!productsResult.error){
      const mapped=(productsResult.data||[]).map((p:any)=>({...p,active:p.is_active,personalised:p.is_personalisable,featured:p.is_featured,occasion:p.occasions||[],imageUrls:p.image_urls||[]}));
      setProducts(mapped.filter((p:Product)=>p.active));
    }
    setRefreshing(false);
  };

  useEffect(()=>{if(authorized)refresh();},[authorized]);

  const signIn=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!supabase){setError('The administration service is not connected yet.');return;}
    setLoading(true);setError('');
    const {error:authError}=await supabase.auth.signInWithPassword({email,password});
    setError(authError?.message||'');
    setLoading(false);
  };

  const updateOrderStatus=async(id:string,status:string)=>{
    if(!supabase)return;
    const {error}=await supabase.from('orders').update({status,updated_at:new Date().toISOString()}).eq('id',id);
    if(error){setError('We could not update that order. Please refresh and try again.');return;}
    setOrders(old=>old.map(order=>order.id===id?{...order,status}:order));
  };

  if(!session) {
    return (
      <main className="admin-login"><div className="admin-login-card">
        <span className="admin-symbol">ONE O</span><p className="eyebrow">PRIVATE ADMINISTRATION</p>
        <h1>Welcome <em>back.</em></h1><p>Sign in with an authorised ONE O administrator account.</p>
        <form onSubmit={signIn}>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
          {error&&<p className="error">{error}</p>}
          <button className="button dark full" disabled={loading}>{loading?'Signing in...':'Sign in securely'}</button>
        </form><button className="back-link" onClick={onExit}>Return to storefront</button>
      </div></main>
    );
  }

  if(checkingRole)return <main className="admin-login"><p>Verifying administration access…</p></main>;
  if(!authorized)return <main className="admin-login"><div className="admin-login-card">
    <span className="admin-symbol">ONE O</span><p className="eyebrow">ACCESS RESTRICTED</p>
    <h1>This area is <em>private.</em></h1><p>Your account is signed in, but it has not been assigned an ONE O staff or administrator role.</p>
    <button className="button dark full" onClick={()=>supabase?.auth.signOut()}>Sign out</button>
    <button className="back-link" onClick={onExit}>Return to storefront</button>
  </div></main>;

  return <main className="admin-page">
    <aside className="admin-sidebar">
      <span className="admin-symbol">ONE O</span><p>ADMINISTRATION</p>
      <button className={tab==='orders'?'selected':''} onClick={()=>setTab('orders')}><ClipboardList/> Orders</button>
      <button className={tab==='products'?'selected':''} onClick={()=>setTab('products')}><Boxes/> Products & photographs</button>
      <button className={tab==='enquiries'?'selected':''} onClick={()=>setTab('enquiries')}><Mail/> Enquiries</button>
      <button onClick={onExit}><LayoutDashboard/> Storefront</button>
      <button onClick={()=>supabase?.auth.signOut()}><LogOut/> Sign out</button>
    </aside>
    <section className="admin-content">
      <div className="admin-top"><div><p className="eyebrow">ONE O CONTROL ROOM</p><h1>{tab==='orders'?'Orders':tab==='products'?'Products & photographs':'Customer enquiries'}</h1></div><div className="admin-tools"><span>{session.user.email}</span><button className="text-link" onClick={refresh} disabled={refreshing}>{refreshing?'Refreshing…':'Refresh data'}</button></div></div>
      {error&&<p className="error">{error}</p>}
      {tab==='orders'&&<>
        <div className="admin-stat"><span>Orders received</span><b>{orders.length}</b></div>
        <div className="admin-table">
          <div className="admin-row admin-header"><span>Order / Date</span><span>Customer</span><span>Items</span><span>Status</span><span>Total</span></div>
          {orders.map(order=><div className="admin-row" key={order.id}>
            <span>{order.order_number}<small>{new Date(order.created_at).toLocaleString()}</small></span>
            <span>{order.customer_name}<small>{order.customer_email}<br/>{order.customer_phone}</small></span>
            <span>{(order.order_items||[]).map((item:any)=>item.product_name+' × '+item.quantity).join(', ')}</span>
            <span><select value={order.status} onChange={e=>updateOrderStatus(order.id,e.target.value)}>{['received','awaiting_confirmation','confirmed','in_production','ready_for_dispatch','dispatched','delivered','cancelled'].map(status=><option key={status} value={status}>{status.replaceAll('_',' ')}</option>)}</select></span>
            <span>{money(Number(order.total_amount||0))}<small>{order.payment_status}</small></span>
          </div>)}
          {!orders.length&&<p className="empty-admin">No orders yet. New customer orders will appear here.</p>}
        </div>
      </>}
      {tab==='products'&&<ProductAdmin products={products} setProducts={setProducts}/>}
      {tab==='enquiries'&&<div className="admin-table">
        <div className="admin-row admin-header"><span>Received</span><span>Name</span><span>Email</span><span>Subject</span><span>Message</span></div>
        {enquiries.map(item=><div className="admin-row" key={item.id}><span>{new Date(item.created_at).toLocaleDateString()}</span><span>{item.name}</span><span>{item.email}</span><span>{item.subject}</span><span>{item.message}</span></div>)}
        {!enquiries.length&&<p className="empty-admin">No customer enquiries yet.</p>}
      </div>}
    </section>
  </main>;
}

function ProductAdmin({products,setProducts}:{products:Product[];setProducts:(p:Product[])=>void}) {
  const [catalogue,setCatalogue]=useState<Product[]>([]);
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('Curated gift sets');
  const [description,setDescription]=useState('');
  const [photo,setPhoto]=useState<File|null>(null);
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState('');

  const loadCatalogue=async()=>{
    if(!supabase)return;
    const {data,error}=await supabase.from('products').select('*').order('created_at',{ascending:false});
    if(error){setMessage('Unable to load the catalogue. Check the Supabase connection and staff permissions.');return;}
    setCatalogue((data||[]).map((p:any)=>({...p,active:p.is_active,personalised:p.is_personalisable,featured:p.is_featured,occasion:p.occasions||[],imageUrls:p.image_urls||[]})));
  };
  useEffect(()=>{loadCatalogue();},[]);

  const uploadPhoto=async(product:Product,file:File)=>{
    if(!supabase)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024){setMessage('Use an original JPG, PNG or WebP photograph under 8 MB.');return;}
    setSaving(true);setMessage('');
    try{
      const extension=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
      const path=product.id+'/'+crypto.randomUUID()+'.'+extension;
      const {error:uploadError}=await supabase.storage.from('one-o-product-images').upload(path,file,{contentType:file.type,cacheControl:'3600',upsert:false});
      if(uploadError)throw uploadError;
      const {data:publicData}=supabase.storage.from('one-o-product-images').getPublicUrl(path);
      const urls=[publicData.publicUrl,...(product.imageUrls||[])].slice(0,8);
      const {data,error}=await supabase.from('products').update({image_urls:urls,is_active:true,updated_at:new Date().toISOString()}).eq('id',product.id).select().single();
      if(error)throw error;
      const mapped={...product,...data,active:true,personalised:data.is_personalisable,featured:data.is_featured,occasion:data.occasions||[],imageUrls:data.image_urls||urls};
      setCatalogue(old=>old.map(p=>p.id===product.id?mapped:p));
      setProducts(old=>[...old.filter(p=>p.id!==mapped.id),mapped]);
      setMessage('Photograph uploaded. This product is now published in the storefront.');
    }catch(error){setMessage(error instanceof Error?error.message:'We could not upload that photograph. Please try again.');}
    finally{setSaving(false);}
  };

  const createProduct=async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!supabase){setMessage('Connect Supabase before adding catalogue items.');return;}
    if(!photo){setMessage('Add an original product photograph before publishing this item.');return;}
    if(!['image/jpeg','image/png','image/webp'].includes(photo.type)||photo.size>8*1024*1024){setMessage('Use an original JPG, PNG or WebP photograph under 8 MB.');return;}
    setSaving(true);setMessage('');
    const slug=name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    try{
      const {data,error}=await supabase.from('products').insert({name:name.trim(),slug,price:Number(price),category,description:description.trim(),is_active:false,is_personalisable:true}).select().single();
      if(error)throw error;
      const draft={...data,active:false,personalised:data.is_personalisable,featured:false,occasion:data.occasions||[],imageUrls:[]};
      setCatalogue(old=>[draft,...old]);
      await uploadPhoto(draft,photo);
      setName('');setPrice('');setDescription('');setPhoto(null);
    }catch(error){setMessage(error instanceof Error?error.message:'We could not create this product. Please try again.');}
    finally{setSaving(false);}
  };

  return <>
    <div className="admin-stat"><span>Catalogue products</span><b>{catalogue.length}</b></div>
    <form className="admin-product-form" onSubmit={createProduct}>
      <h2>Add a product with its real photograph</h2>
      <p>Only owner-supplied product photography is published. AI-generated and stock product imagery is not accepted in this workflow.</p>
      <label>Product name<input value={name} onChange={e=>setName(e.target.value)} required/></label>
      <div className="field-row">
        <label>Price (₦)<input type="number" min="1" value={price} onChange={e=>setPrice(e.target.value)} required/></label>
        <label>Category<select value={category} onChange={e=>setCategory(e.target.value)}><option>Curated gift sets</option><option>Resin keepsakes</option><option>Corporate gifting</option></select></label>
      </div>
      <label>Description<textarea value={description} onChange={e=>setDescription(e.target.value)} required/></label>
      <label>Original product photograph<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setPhoto(e.target.files?.[0]||null)} required/><small>JPG, PNG or WebP · Maximum 8 MB</small></label>
      <button className="button dark" disabled={saving}>{saving?'Saving product and photograph…':'Create and publish product'}</button>
      {message&&<p role="status">{message}</p>}
    </form>
    <div className="admin-product-list">{catalogue.map(product=><article className="admin-product-item" key={product.id}>
      {product.imageUrls?.[0]?<img src={product.imageUrls[0]} alt={product.name}/>:<div className="admin-photo-pending">No photograph uploaded</div>}
      <div><b>{product.name}</b><small>{product.category} · {money(product.price)}</small><small>{product.active?'Published':'Draft — not visible in the shop'}</small></div>
      <label className="photo-replace">Upload / replace photograph<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)uploadPhoto(product,file);e.currentTarget.value='';}}/></label>
    </article>)}</div>
  </>;
}
export default App;
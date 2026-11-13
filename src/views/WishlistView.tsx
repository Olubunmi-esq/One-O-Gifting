import React, { useState } from 'react'
import { Heart, ArrowRight, Trash2, Share2, Copy, Check, Sparkles, MessageCircle, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCurrency } from '../context/CurrencyContext'
import { Product } from '../data/products'
import { ProductImage } from '../components/ProductImage'
import { STUDIO_INFO, getWhatsAppOrderUrl } from '../data/studioInfo'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface WishlistViewProps {
  onSelectProduct: (product: Product) => void
  setCurrentView: (view: string) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  onSelectProduct,
  setCurrentView,
  onRequestQuote
}) => {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist()
  const { formatPrice } = useCurrency()
  const [copied, setCopied] = useState(false)

  const totalValue = wishlistItems
    .filter((item) => !item.isCustomQuote && item.price > 0)
    .reduce((acc, item) => acc + item.price, 0)
  const hasQuoteItems = wishlistItems.some((item) => item.isCustomQuote || item.price === 0)

  const generateWishlistSummary = () => {
    let text = `Hello ONE O Studio,\n\nHere is my saved Wishlist of personalized resin gifts:\n\n`
    wishlistItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.title}\n`
      text += `   - Collection: ${item.collection}\n`
      text += `   - Price: ${item.isCustomQuote ? 'Customizable · Request a Quote' : formatPrice(item.price)}\n`
      text += `   - Details: ${item.subtitle}\n\n`
    })
    text += `Total Estimated Value: ${hasQuoteItems ? `${formatPrice(totalValue)} + Custom Quote items` : formatPrice(totalValue)}\n`
    text += `Please let me know how to proceed with personalization and delivery.\n`
    return text
  }

  const handleShareWhatsApp = () => {
    const text = generateWishlistSummary()
    window.open(getWhatsAppOrderUrl(text), '_blank')
  }

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateWishlistSummary()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#1B3326] font-semibold bg-white px-3.5 py-1.5 border border-[#DDD8CE]">
          <Heart className="w-3.5 h-3.5 fill-[#D47563] text-[#D47563]" />
          <span>Saved Gifts · Wishlist ({wishlistCount})</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#191817] tracking-tight">
          Your Saved Gift List
        </h1>
        <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
          Keep track of handmade resin gifts you want to send for birthdays, anniversaries, weddings, or thank-yous. Ready to add their name whenever you are.
        </p>
      </div>

      {/* Main Content */}
      {wishlistItems.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-[#DDD8CE] shadow-sm space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#F5F4F0] flex items-center justify-center text-[#4A4640]">
            <Heart className="w-8 h-8 text-[#D47563]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#191817]">
              No Saved Gifts Yet
            </h3>
            <p className="text-sm text-[#38342F] leading-relaxed">
              Look through our handmade gift shop and tap the heart icon on any piece you love to save it here.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setCurrentView('catalogue')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-all shadow-sm"
            >
              <span>Browse Gift Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Action Toolbar */}
          <div className="bg-white p-4 sm:p-5 border border-[#DDD8CE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-sm text-[#4A4640]">
                Saved Gifts: <strong className="text-[#191817]">{wishlistItems.length}</strong>
              </span>
              <span className="mx-2 text-[#D0CCC4]">·</span>
              <span className="text-sm text-[#4A4640]">
                Total Price: <strong className="text-[#1B3326] font-serif text-base">{hasQuoteItems ? `${formatPrice(totalValue)} + Quote` : formatPrice(totalValue)}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors"
                title="Share saved gifts on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C2A264]" />
                <span>Send List on WhatsApp</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#E0DDD7] bg-[#FAFAF8] text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-emerald-800">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#4A4640]" />
                    <span>Copy List</span>
                  </>
                )}
              </button>

              <button
                onClick={clearWishlist}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8A4A3E] hover:text-[#5E2B21] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Wishlist Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-[#DDD8CE] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image with Heart remove button */}
                  <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden border-b border-[#EAE6DE]">
                    <ProductImage
                      src={product.imageUrl}
                      alt={product.title}
                      aspectRatio="auto"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 cursor-pointer"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="px-2.5 py-0.5 text-xs uppercase tracking-wider font-semibold bg-[#1B3326] text-white shadow-sm">
                        {product.collection.split(' ')[0]}
                      </span>
                    </div>

                    {/* Remove from Wishlist Heart Button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md text-[#D47563] transition-all hover:scale-110 z-10"
                      title="Remove from saved gifts"
                      aria-label="Remove from saved gifts"
                    >
                      <Heart className="w-4 h-4 fill-[#D47563]" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#4A4640] gap-2">
                      <span className="uppercase tracking-wider truncate max-w-[160px] font-medium">
                        {product.itemType}
                      </span>
                      {product.isCustomQuote ? (
                        <button
                          type="button"
                          onClick={() =>
                            onRequestQuote?.({
                              id: product.id,
                              title: product.title,
                              subtitle: product.subtitle,
                              imageUrl: product.imageUrl,
                              collection: product.collection,
                              minOrderQty: product.minOrderQty,
                              itemsIncluded: product.itemsIncluded
                            })
                          }
                          className="px-2.5 py-1 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shrink-0"
                        >
                          Request a Quote
                        </button>
                      ) : (
                        <span className="font-serif text-lg font-bold text-[#1B3326] shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-lg sm:text-xl font-bold text-[#191817] hover:text-[#1B3326] transition-colors leading-snug cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    <p className="text-sm text-[#38342F] line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    <div className="pt-2 border-t border-[#F0ECE4] text-xs text-[#4A4640]">
                      <span className="font-semibold text-[#191817]">Design &amp; Colors: </span>
                      <span>{product.resinPalette}</span>
                    </div>

                    {product.itemsIncluded && product.itemsIncluded.length > 0 && (
                      <div className="pt-2 border-t border-[#F0ECE4] space-y-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1B3326]">
                          What You Get Inside:
                        </p>
                        <ul className="space-y-1 text-xs text-[#38342F]">
                          {product.itemsIncluded.slice(0, 3).map((inc, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B3326] mt-1.5 shrink-0" />
                              <span className="line-clamp-1">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-[#F0ECE4] flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      product.isCustomQuote
                        ? onRequestQuote?.({
                            id: product.id,
                            title: product.title,
                            subtitle: product.subtitle,
                            imageUrl: product.imageUrl,
                            collection: product.collection,
                            minOrderQty: product.minOrderQty,
                            itemsIncluded: product.itemsIncluded
                          })
                        : onSelectProduct(product)
                    }
                    className="flex-1 py-2.5 px-3 bg-[#1B3326] text-white hover:bg-[#122319] text-xs uppercase tracking-[0.12em] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>{product.isCustomQuote ? 'Request a Quote' : 'Add Name & Order'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2.5 border border-[#E0DDD7] bg-[#FAFAF8] hover:bg-white text-[#8A4A3E] transition-colors"
                    title="Remove from saved gifts"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="bg-[#F5F4F0] p-6 sm:p-8 border border-[#DDD8CE] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
                Want to Put Items Together in One Box?
              </h3>
              <p className="text-sm text-[#38342F]">
                Use our Build Your Gift Box tool to pair a main gift with matching keychains, coasters, or bookmarks inside one ribbon-tied box.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('builder')}
              className="px-6 py-3 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-colors flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#C2A264]" />
              <span>Build a Gift Box</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

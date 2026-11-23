import React, { useState, useMemo } from 'react'
import { Heart, ArrowRight } from 'lucide-react'
import { SAMPLE_PRODUCTS, Product } from '../data/products'
import { ProductImage } from '../components/ProductImage'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface OccasionsViewProps {
  onSelectProduct: (product: Product) => void
  setCurrentView: (view: string) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

interface OccasionTab {
  id: string
  label: string
  filter: (p: Product) => boolean
}

const OCCASION_TABS: OccasionTab[] = [
  {
    id: 'packages',
    label: 'Occasion Packages',
    filter: (p) => p.itemType === 'Occasion Gift Packages'
  },
  {
    id: 'birthdays',
    label: 'Birthdays',
    filter: (p) => p.collections.includes('Birthday Celebrations')
  },
  {
    id: 'weddings',
    label: 'Weddings & Owambe',
    filter: (p) =>
      p.collections.includes('Wedding & Anniversary Sets') ||
      p.collections.includes('Bridal & Groomsmen Packages')
  },
  {
    id: 'baby-family',
    label: 'Baby & Family',
    filter: (p) => p.collections.includes('Baby, Naming & Family')
  },
  {
    id: 'corporate',
    label: 'Corporate',
    filter: (p) => p.collections.includes('Corporate & Office Collections')
  },
  {
    id: 'graduations-faith',
    label: 'Graduations & Faith',
    filter: (p) => p.collections.includes('Graduations & Religious Celebrations')
  },
  {
    id: 'retirement',
    label: 'Retirement',
    filter: (p) => p.collections.includes('Retirement Sets')
  },
  {
    id: 'kitchen',
    label: 'Kitchen & Home',
    filter: (p) => p.collections.includes('Pinterest Kitchen & Dining Collections')
  },
  {
    id: 'festive',
    label: 'December Hampers',
    filter: (p) => p.collections.includes('December Festive & Holiday Hampers')
  }
]

export const OccasionsView: React.FC<OccasionsViewProps> = ({
  onSelectProduct,
  setCurrentView,
  onRequestQuote
}) => {
  const { formatPrice } = useCurrency()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [activeTabId, setActiveTabId] = useState<string>('packages')

  const activeTab = OCCASION_TABS.find((t) => t.id === activeTabId) || OCCASION_TABS[0]

  const products = useMemo(
    () => SAMPLE_PRODUCTS.filter(activeTab.filter),
    [activeTab]
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#191817]">
            Shop by Occasion
          </h1>
          <p className="text-sm text-[#57534D]">
            Pick an occasion below — {products.length} options ready.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('builder')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3326] hover:underline self-start sm:self-auto"
        >
          <span>Or build a custom box</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Occasion Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#EAE8E3] scrollbar-none">
        {OCCASION_TABS.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 border ${
                isActive
                  ? 'bg-[#1B3326] text-white border-[#1B3326]'
                  : 'bg-white text-[#38342F] border-[#DDD8CE] hover:border-[#1B3326]'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Uniform Clean Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="group bg-white border border-[#E5E2DC] hover:border-[#1B3326] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden">
                <ProductImage
                  src={product.imageUrl}
                  alt={product.title}
                  aspectRatio="auto"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product.id)
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    isWishlisted(product.id)
                      ? 'bg-white text-[#D47563] shadow-sm'
                      : 'bg-white/85 hover:bg-white text-[#4A4640]'
                  }`}
                  aria-label={isWishlisted(product.id) ? 'Remove from saved' : 'Save item'}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted(product.id) ? 'fill-[#D47563] text-[#D47563]' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-1.5">
                <p className="text-xs text-[#6B665F] truncate">{product.itemType}</p>
                <h3 className="text-base font-semibold text-[#191817] group-hover:text-[#1B3326] leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-[#57534D] line-clamp-1">
                  {product.subtitle}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-[#F2EFEA] flex items-center justify-between gap-2">
              {product.isCustomQuote ? (
                <>
                  <span className="text-xs font-medium text-[#57534D]">
                    {product.minOrderQty ? `Min. ${product.minOrderQty} pcs` : 'Custom quote'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRequestQuote?.({
                        id: product.id,
                        title: product.title,
                        subtitle: product.subtitle,
                        imageUrl: product.imageUrl,
                        collection: product.collection,
                        minOrderQty: product.minOrderQty,
                        itemsIncluded: product.itemsIncluded
                      })
                    }}
                    className="px-3.5 py-1.5 bg-[#1B3326] hover:bg-[#122319] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    Request a Quote
                  </button>
                </>
              ) : (
                <>
                  <span className="font-serif text-lg font-bold text-[#1B3326] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-semibold text-[#1B3326] group-hover:underline whitespace-nowrap">
                    Select →
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

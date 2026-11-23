import React, { useState, useMemo, useEffect } from 'react'
import { Search, Heart, X, RotateCcw, ArrowUpDown } from 'lucide-react'
import { SAMPLE_PRODUCTS, COLLECTIONS, ITEM_TYPES, Product } from '../data/products'
import { ProductImage } from '../components/ProductImage'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

export type BudgetPreset = 'all' | 'under-10k' | '10k-25k' | '25k-50k' | '50k-plus'
export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc'

export interface CatalogueFilterPreset {
  searchQuery?: string
  collection?: string
  itemType?: string
  budgetPreset?: BudgetPreset
  starterOnly?: boolean
  _ts?: number
}

interface CatalogueViewProps {
  onSelectProduct: (product: Product) => void
  setCurrentView: (view: string) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
  initialFilter?: CatalogueFilterPreset | null
}

const QUICK_TABS: { id: string; label: string; apply: () => CatalogueFilterPreset }[] = [
  { id: 'all', label: 'All', apply: () => ({}) },
  { id: 'top12', label: 'Top 12', apply: () => ({ starterOnly: true }) },
  { id: 'packages', label: 'Occasion Packages', apply: () => ({ itemType: 'Occasion Gift Packages' }) },
  { id: 'under10k', label: 'Under ₦10k', apply: () => ({ budgetPreset: 'under-10k' }) },
  { id: 'weddings', label: 'Weddings', apply: () => ({ collection: 'Wedding & Anniversary Sets' }) },
  { id: 'birthdays', label: 'Birthdays', apply: () => ({ collection: 'Birthday Celebrations' }) },
  { id: 'corporate', label: 'Corporate', apply: () => ({ collection: 'Corporate & Office Collections' }) },
  { id: 'baby', label: 'Baby & Family', apply: () => ({ collection: 'Baby, Naming & Family' }) }
]

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onSelectProduct,
  setCurrentView,
  onRequestQuote,
  initialFilter
}) => {
  const { formatPrice } = useCurrency()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const [selectedCollection, setSelectedCollection] = useState<string>(
    initialFilter?.collection || 'All Collections'
  )
  const [selectedItemType, setSelectedItemType] = useState<string>(
    initialFilter?.itemType || 'All Items'
  )
  const [searchQuery, setSearchQuery] = useState<string>(initialFilter?.searchQuery || '')
  const [budgetPreset, setBudgetPreset] = useState<BudgetPreset>(initialFilter?.budgetPreset || 'all')
  const [starterOnly, setStarterOnly] = useState<boolean>(Boolean(initialFilter?.starterOnly))
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  useEffect(() => {
    if (!initialFilter) return
    setSelectedCollection(initialFilter.collection || 'All Collections')
    setSelectedItemType(initialFilter.itemType || 'All Items')
    setSearchQuery(initialFilter.searchQuery || '')
    setBudgetPreset(initialFilter.budgetPreset || 'all')
    setStarterOnly(Boolean(initialFilter.starterOnly))
  }, [initialFilter])

  const handleResetFilters = () => {
    setSelectedCollection('All Collections')
    setSelectedItemType('All Items')
    setSearchQuery('')
    setBudgetPreset('all')
    setStarterOnly(false)
    setSortBy('featured')
  }

  const applyQuickTab = (preset: CatalogueFilterPreset) => {
    setSelectedCollection(preset.collection || 'All Collections')
    setSelectedItemType(preset.itemType || 'All Items')
    setSearchQuery(preset.searchQuery || '')
    setBudgetPreset(preset.budgetPreset || 'all')
    setStarterOnly(Boolean(preset.starterOnly))
  }

  const activeQuickTabId = useMemo(() => {
    if (searchQuery.trim()) return ''
    if (starterOnly && selectedCollection === 'All Collections' && selectedItemType === 'All Items' && budgetPreset === 'all') {
      return 'top12'
    }
    if (selectedItemType === 'Occasion Gift Packages' && selectedCollection === 'All Collections' && !starterOnly) {
      return 'packages'
    }
    if (budgetPreset === 'under-10k' && selectedCollection === 'All Collections' && selectedItemType === 'All Items' && !starterOnly) {
      return 'under10k'
    }
    if (selectedCollection === 'Wedding & Anniversary Sets' && selectedItemType === 'All Items' && budgetPreset === 'all' && !starterOnly) {
      return 'weddings'
    }
    if (selectedCollection === 'Birthday Celebrations' && selectedItemType === 'All Items' && budgetPreset === 'all' && !starterOnly) {
      return 'birthdays'
    }
    if (selectedCollection === 'Corporate & Office Collections' && selectedItemType === 'All Items' && budgetPreset === 'all' && !starterOnly) {
      return 'corporate'
    }
    if (selectedCollection === 'Baby, Naming & Family' && selectedItemType === 'All Items' && budgetPreset === 'all' && !starterOnly) {
      return 'baby'
    }
    if (selectedCollection === 'All Collections' && selectedItemType === 'All Items' && budgetPreset === 'all' && !starterOnly) {
      return 'all'
    }
    return ''
  }, [selectedCollection, selectedItemType, budgetPreset, starterOnly, searchQuery])

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesCollection =
        selectedCollection === 'All Collections' ||
        product.collection === selectedCollection ||
        product.collections.includes(selectedCollection)

      const matchesItemType =
        selectedItemType === 'All Items' || product.itemType === selectedItemType

      if (starterOnly && !product.isStarterBestSeller) return false

      let matchesPrice = true
      if (product.isCustomQuote) {
        matchesPrice =
          selectedItemType === 'Occasion Gift Packages' ||
          budgetPreset === 'all' ||
          budgetPreset === '50k-plus'
      } else {
        if (budgetPreset === 'under-10k') matchesPrice = product.price <= 10000
        else if (budgetPreset === '10k-25k') matchesPrice = product.price >= 10000 && product.price <= 25000
        else if (budgetPreset === '25k-50k') matchesPrice = product.price >= 25000 && product.price <= 50000
        else if (budgetPreset === '50k-plus') matchesPrice = product.price >= 50000
      }

      const rawQuery = searchQuery.trim().toLowerCase()
      if (!rawQuery) {
        return matchesCollection && matchesItemType && matchesPrice
      }

      const tokens = rawQuery.split(/\s+/).filter(Boolean)
      const searchable = [
        product.title,
        product.subtitle,
        product.itemType,
        product.collection,
        ...product.collections,
        ...product.itemsIncluded,
        ...product.tags
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch = tokens.every((token) => searchable.includes(token))
      return matchesCollection && matchesItemType && matchesPrice && matchesSearch
    })
      .map((product, index) => ({ product, index }))
      .sort((a, b) => {
        if (sortBy === 'newest') {
          const aNew = a.product.isNew ? 1 : 0
          const bNew = b.product.isNew ? 1 : 0
          if (bNew !== aNew) return bNew - aNew
          return b.index - a.index
        }
        if (sortBy === 'price-asc') {
          if (a.product.isCustomQuote && !b.product.isCustomQuote) return 1
          if (!a.product.isCustomQuote && b.product.isCustomQuote) return -1
          return a.product.price - b.product.price
        }
        if (sortBy === 'price-desc') {
          if (a.product.isCustomQuote && !b.product.isCustomQuote) return 1
          if (!a.product.isCustomQuote && b.product.isCustomQuote) return -1
          return b.product.price - a.product.price
        }
        if (a.product.bestSeller && !b.product.bestSeller) return -1
        if (!a.product.bestSeller && b.product.bestSeller) return 1
        return a.index - b.index
      })
      .map((entry) => entry.product)
  }, [selectedCollection, selectedItemType, starterOnly, budgetPreset, searchQuery, sortBy])

  const hasActiveFilters =
    selectedCollection !== 'All Collections' ||
    selectedItemType !== 'All Items' ||
    starterOnly ||
    budgetPreset !== 'all' ||
    sortBy !== 'featured' ||
    searchQuery.trim() !== ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Compact Header + Sort Control */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#191817]">
            Shop All Gifts
          </h1>
          <p className="text-sm text-[#57534D] tabular-nums">
            {filteredProducts.length} items · Tap any product to personalize or request a quote.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-[#DDD8CE] px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#57534D] shrink-0" />
            <label htmlFor="catalogue-sort" className="text-xs font-medium text-[#57534D] whitespace-nowrap">
              Sort by
            </label>
            <select
              id="catalogue-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs sm:text-sm font-semibold text-[#191817] bg-transparent focus:outline-none cursor-pointer pr-1"
              aria-label="Sort products"
            >
              <option value="featured">Popular</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3326] hover:underline whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Clean Compact Filter Bar */}
      <div className="bg-white border border-[#E5E2DC] p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-[#6B665F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keychains, plaques, clocks, hampers..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B665F] hover:text-[#191817]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Occasion Select */}
          <div className="lg:col-span-3">
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
              aria-label="Filter by occasion"
            >
              {COLLECTIONS.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="lg:col-span-3">
            <select
              value={selectedItemType}
              onChange={(e) => {
                const val = e.target.value
                setSelectedItemType(val)
                if (val === 'Occasion Gift Packages') setBudgetPreset('all')
              }}
              className="w-full py-2 px-3 text-sm bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
              aria-label="Filter by item type"
            >
              {ITEM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Select */}
          <div className="lg:col-span-2">
            <select
              value={budgetPreset}
              onChange={(e) => setBudgetPreset(e.target.value as BudgetPreset)}
              className="w-full py-2 px-3 text-sm bg-[#FAFAF8] border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
              aria-label="Filter by budget"
            >
              <option value="all">All Budgets</option>
              <option value="under-10k">Under ₦10,000</option>
              <option value="10k-25k">₦10,000 – ₦25,000</option>
              <option value="25k-50k">₦25,000 – ₦50,000</option>
              <option value="50k-plus">₦50,000+ &amp; Quotes</option>
            </select>
          </div>
        </div>

        {/* Single-Row Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
          {QUICK_TABS.map((tab) => {
            const isActive = activeQuickTabId === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => applyQuickTab(tab.apply())}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#1B3326] text-white border-[#1B3326]'
                    : 'bg-[#FAFAF8] text-[#38342F] border-[#E5E2DC] hover:border-[#1B3326]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-14 bg-white border border-[#E5E2DC] space-y-3">
          <p className="font-serif text-lg font-semibold text-[#191817]">
            No products matched your filter
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#1B3326] text-white text-xs font-semibold hover:bg-[#122319]"
            >
              Show All Items
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('builder')}
              className="px-4 py-2 bg-white border border-[#191817] text-[#191817] text-xs font-semibold hover:bg-[#F5F4F0]"
            >
              Build Custom Box
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
                  <div className="flex items-center justify-between gap-2 text-xs text-[#6B665F]">
                    <span className="truncate">{product.itemType}</span>
                    {product.isFoodSafe && <span className="shrink-0 text-[#1B3326] font-medium">Food-Safe</span>}
                  </div>

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
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectProduct(product)
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-[#38342F] hover:text-[#191817] border border-[#DDD8CE] bg-[#FAFAF8]"
                      >
                        Details
                      </button>
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
                        className="px-3 py-1.5 bg-[#1B3326] hover:bg-[#122319] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        Request a Quote
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="font-serif text-lg font-bold text-[#1B3326] tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs font-semibold text-[#1B3326] group-hover:underline whitespace-nowrap">
                      Select &amp; Personalize →
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

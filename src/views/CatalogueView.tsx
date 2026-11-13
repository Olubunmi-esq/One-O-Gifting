import React, { useState, useMemo } from 'react'
import {
  Search,
  Box,
  Check,
  ArrowRight,
  Sparkles,
  Heart,
  SlidersHorizontal,
  Tag,
  Gift,
  X,
  RotateCcw,
  Coins
} from 'lucide-react'
import { SAMPLE_PRODUCTS, COLLECTIONS, ITEM_TYPES, Product } from '../data/products'
import { ProductImage } from '../components/ProductImage'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'

import { QuoteInquiryTarget } from '../components/QuoteInquiryModal'

interface CatalogueViewProps {
  onSelectProduct: (product: Product) => void
  setCurrentView: (view: string) => void
  onRequestQuote?: (target: QuoteInquiryTarget) => void
}

type BudgetPreset = 'all' | 'under-10k' | '5k-20k' | '20k-50k' | '50k-plus' | 'custom'

const QUICK_SEARCH_CHIPS = [
  'Occasion Gift Packages',
  'LED Night Lamp',
  'Desk Clock',
  'Nameplate',
  'Wedding Favors',
  'Guitar Strap',
  'Charcuterie',
  'Keychains',
  'Bookmarks',
  'Under 10k',
  'December Hampers'
]

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onSelectProduct,
  setCurrentView,
  onRequestQuote
}) => {
  const { formatPrice, currency } = useCurrency()
  const { isWishlisted, toggleWishlist } = useWishlist()

  // Filter States
  const [selectedCollection, setSelectedCollection] = useState<string>('All Collections')
  const [selectedItemType, setSelectedItemType] = useState<string>('All Items')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')
  const [starterOnly, setStarterOnly] = useState(false)

  // Price & Budget States (in NGN)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(220000)
  const [budgetPreset, setBudgetPreset] = useState<BudgetPreset>('all')

  // Handle Preset Budget Buttons
  const handleApplyPreset = (preset: BudgetPreset) => {
    setBudgetPreset(preset)
    switch (preset) {
      case 'all':
        setMinPrice(0)
        setMaxPrice(220000)
        break
      case 'under-10k':
        setMinPrice(0)
        setMaxPrice(10000)
        break
      case '5k-20k':
        setMinPrice(5000)
        setMaxPrice(20000)
        break
      case '20k-50k':
        setMinPrice(20000)
        setMaxPrice(50000)
        break
      case '50k-plus':
        setMinPrice(50000)
        setMaxPrice(220000)
        break
      case 'custom':
        break
    }
  }

  // Handle Max Price Slider change
  const handleMaxPriceSlider = (val: number) => {
    setMaxPrice(val)
    if (val < minPrice) {
      setMinPrice(0)
    }
    setBudgetPreset('custom')
  }

  // Handle Min Price Slider change
  const handleMinPriceSlider = (val: number) => {
    setMinPrice(val)
    if (val > maxPrice) {
      setMaxPrice(val)
    }
    setBudgetPreset('custom')
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCollection('All Collections')
    setSelectedItemType('All Items')
    setSearchQuery('')
    setStarterOnly(false)
    setMinPrice(0)
    setMaxPrice(220000)
    setBudgetPreset('all')
    setSortBy('featured')
  }

  // Filter & Search Engine
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // 1. Occasion / Collection Match
      const matchesCollection =
        selectedCollection === 'All Collections' ||
        product.collection === selectedCollection ||
        product.collections.includes(selectedCollection)

      // 2. Category / Item Type Match
      const matchesItemType =
        selectedItemType === 'All Items' || product.itemType === selectedItemType

      // 3. Budget / Price Range Match (inclusive)
      const matchesPrice = product.isCustomQuote
        ? selectedItemType === 'Occasion Gift Packages' ||
          budgetPreset === 'all' ||
          (minPrice === 0 && maxPrice >= 220000) ||
          budgetPreset === '50k-plus'
        : product.price >= minPrice &&
          (maxPrice >= 220000 ? true : product.price <= maxPrice)

      // 3b. Starter Best Sellers Filter
      if (starterOnly && !product.isStarterBestSeller) {
        return false
      }

      // 4. Keyword / Category / Occasion Search Match
      const rawQuery = searchQuery.trim().toLowerCase()
      if (!rawQuery) {
        return matchesCollection && matchesItemType && matchesPrice
      }

      const queryTokens = rawQuery.split(/\s+/).filter(Boolean)
      const searchableText = [
        product.title,
        product.subtitle,
        product.description,
        product.longDescription,
        product.itemType,
        product.collection,
        ...product.collections,
        ...product.itemsIncluded,
        product.resinPalette,
        ...product.tags
      ]
        .join(' ')
        .toLowerCase()

      // Every word token in the query must match something in the searchable text
      const matchesSearch = queryTokens.every((token) => searchableText.includes(token))

      return matchesCollection && matchesItemType && matchesPrice && matchesSearch
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        if (a.isCustomQuote && !b.isCustomQuote) return 1
        if (!a.isCustomQuote && b.isCustomQuote) return -1
        return a.price - b.price
      }
      if (sortBy === 'price-desc') {
        if (a.isCustomQuote && !b.isCustomQuote) return -1
        if (!a.isCustomQuote && b.isCustomQuote) return 1
        return b.price - a.price
      }
      if (a.bestSeller && !b.bestSeller) return -1
      if (!a.bestSeller && b.bestSeller) return 1
      return 0
    })
  }, [
    selectedCollection,
    selectedItemType,
    starterOnly,
    budgetPreset,
    minPrice,
    maxPrice,
    searchQuery,
    sortBy
  ])

  const hasActiveFilters =
    selectedCollection !== 'All Collections' ||
    selectedItemType !== 'All Items' ||
    starterOnly ||
    budgetPreset !== 'all' ||
    minPrice > 0 ||
    maxPrice < 220000 ||
    searchQuery.trim() !== ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-semibold bg-white/80 px-3 py-1 border border-[#E8E6E1]">
          Handmade Personalized Gifts
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#191817] tracking-tight">
          Gifts That Hold Their Favorite Memories
        </h1>
        <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
          You are not just buying an item—you are giving a moment of pure joy they can hold in their hands every day. Pick any gift or box below; you choose the exact colors, design style, and wording directly when speaking with our representative on WhatsApp.
        </p>
      </div>

      {/* Main Filter & Search Control Center */}
      <div className="bg-white border border-[#D8D4CC] shadow-sm divide-y divide-[#F0ECE4]">
        {/* Section 1: Search Input & Quick Controls */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* Search Input Field */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#4A4640] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name (e.g. clock, night light, keychain, hamper)..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAFAF8] border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326] text-[#191817] transition-colors"
                aria-label="Search gifts by keyword, category, or occasion"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4640] hover:text-[#191817] p-0.5"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Collection Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-[#FAFAF8] border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                aria-label="Select occasion collection"
              >
                {COLLECTIONS.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 text-sm bg-[#FAFAF8] border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                aria-label="Sort gift catalog"
              >
                <option value="featured">Best Sellers &amp; Recommended</option>
                <option value="price-asc">Price: Low to High (from ₦3,000)</option>
                <option value="price-desc">Price: High to Low (Bulk Packs)</option>
              </select>
            </div>
          </div>

          {/* Quick Search Chips & 12 Starter Best Sellers Toggle */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStarterOnly((prev) => !prev)}
              className={`text-xs px-3 py-1 transition-all font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                starterOnly
                  ? 'bg-[#C2A264] text-[#191817] border-[#C2A264] shadow-xs'
                  : 'bg-[#FAF8F2] text-[#1B3326] border-[#C2A264] hover:bg-[#F5EFE0]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>12 Starter Best Sellers</span>
            </button>

            <span className="text-xs text-[#4A4640] uppercase tracking-wider font-bold mr-1 ml-1">
              Popular:
            </span>
            {QUICK_SEARCH_CHIPS.map((chip) => {
              const isOccasionPkgChip = chip === 'Occasion Gift Packages'
              const isUnder10kChip = chip === 'Under 10k'
              const isActive = isOccasionPkgChip
                ? selectedItemType === 'Occasion Gift Packages'
                : isUnder10kChip
                ? budgetPreset === 'under-10k'
                : searchQuery.toLowerCase() === chip.toLowerCase()

              const handleChipClick = () => {
                if (isOccasionPkgChip) {
                  if (isActive) {
                    setSelectedItemType('All Items')
                  } else {
                    setSelectedItemType('Occasion Gift Packages')
                    handleApplyPreset('all')
                    setSearchQuery('')
                  }
                  return
                }
                if (isUnder10kChip) {
                  handleApplyPreset(isActive ? 'all' : 'under-10k')
                  return
                }
                setSearchQuery(isActive ? '' : chip)
              }

              return (
                <button
                  key={chip}
                  type="button"
                  onClick={handleChipClick}
                  className={`text-xs px-3 py-1 transition-all font-medium ${
                    isActive
                      ? 'bg-[#1B3326] text-white font-semibold'
                      : 'bg-[#FAFAF8] text-[#38342F] hover:bg-[#EAE8E3] border border-[#D8D4CC]'
                  }`}
                >
                  {chip}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section 2: Budget Filters (Preset Buttons & Price Range Slider) */}
        <div className="p-5 sm:p-6 space-y-4 bg-[#FCFBF9]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#C2A264]" />
              <h2 className="text-xs uppercase tracking-widest font-bold text-[#191817]">
                Filter by Gift Budget
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-[#38342F] flex items-center gap-1.5 font-medium">
              <span>Active Range:</span>
              <span className="font-serif font-bold text-[#1B3326]">
                {formatPrice(minPrice)} – {maxPrice >= 220000 ? '₦220,000+' : formatPrice(maxPrice)}
              </span>
              {currency !== 'NGN' && (
                <span className="text-xs text-[#4A4640]">
                  (approx. in {currency})
                </span>
              )}
            </div>
          </div>

          {/* Preset Category Buttons */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#4A4640] font-bold">
              Preset Budget Tiers:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('all')}
                className={`py-2.5 px-3 text-xs transition-all text-center border ${
                  budgetPreset === 'all'
                    ? 'bg-[#1B3326] text-white font-semibold border-[#1B3326] shadow-sm'
                    : 'bg-white text-[#38342F] hover:bg-[#F5F4F0] border-[#D8D4CC]'
                }`}
              >
                <div className="font-bold">All Budgets</div>
                <div className={`text-xs ${budgetPreset === 'all' ? 'text-white/90' : 'text-[#4A4640]'}`}>
                  Full catalog
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('under-10k')}
                className={`py-2.5 px-3 text-xs transition-all text-center border ${
                  budgetPreset === 'under-10k'
                    ? 'bg-[#1B3326] text-white font-semibold border-[#1B3326] shadow-sm'
                    : 'bg-white text-[#38342F] hover:bg-[#F5F4F0] border-[#D8D4CC]'
                }`}
              >
                <div className="font-bold">Under ₦10k</div>
                <div className={`text-xs ${budgetPreset === 'under-10k' ? 'text-white/90' : 'text-[#4A4640]'}`}>
                  Keychains &amp; Stands
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('5k-20k')}
                className={`py-2.5 px-3 text-xs transition-all text-center border ${
                  budgetPreset === '5k-20k'
                    ? 'bg-[#C2A264] text-[#191817] font-bold border-[#C2A264] shadow-sm'
                    : 'bg-white text-[#38342F] hover:bg-[#F5F4F0] border-[#D8D4CC]'
                }`}
              >
                <div className="font-bold">₦5k – ₦20k</div>
                <div className={`text-xs ${budgetPreset === '5k-20k' ? 'text-[#191817]' : 'text-[#4A4640]'}`}>
                  Everyday Gifts &amp; Favors
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('20k-50k')}
                className={`py-2.5 px-3 text-xs transition-all text-center border ${
                  budgetPreset === '20k-50k'
                    ? 'bg-[#C2A264] text-[#191817] font-bold border-[#C2A264] shadow-sm'
                    : 'bg-white text-[#38342F] hover:bg-[#F5F4F0] border-[#D8D4CC]'
                }`}
              >
                <div className="font-bold">₦20k – ₦50k</div>
                <div className={`text-xs ${budgetPreset === '20k-50k' ? 'text-[#191817]' : 'text-[#4A4640]'}`}>
                  Nameplates &amp; Clocks
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('50k-plus')}
                className={`py-2.5 px-3 text-xs transition-all text-center border col-span-2 sm:col-span-1 ${
                  budgetPreset === '50k-plus'
                    ? 'bg-[#191817] text-white font-semibold border-[#191817] shadow-sm'
                    : 'bg-white text-[#38342F] hover:bg-[#F5F4F0] border-[#D8D4CC]'
                }`}
              >
                <div className="font-bold">₦50k+</div>
                <div className={`text-xs ${budgetPreset === '50k-plus' ? 'text-white/90' : 'text-[#4A4640]'}`}>
                  Hampers &amp; Bulk Packs
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Price Range Sliders */}
          <div className="pt-3 border-t border-[#EAE6DF] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider text-[#4A4640] font-bold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1B3326]" />
                Interactive Price Range Slider
              </span>
              <span className="text-xs text-[#4A4640]">
                Drag slider up to ₦220,000+
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Min Price Slider */}
              <div className="space-y-1.5 bg-white p-3.5 border border-[#D8D4CC]">
                <div className="flex justify-between text-xs">
                  <label htmlFor="min-price-slider" className="text-[#38342F] font-semibold">Minimum Budget:</label>
                  <span className="font-serif font-bold text-[#1B3326] text-sm">{formatPrice(minPrice)}</span>
                </div>
                <input
                  id="min-price-slider"
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={minPrice}
                  onChange={(e) => handleMinPriceSlider(Number(e.target.value))}
                  className="w-full accent-[#1B3326] cursor-pointer h-2 bg-[#E0DDD7] rounded-none"
                  aria-label="Minimum budget slider"
                />
                <div className="flex justify-between text-xs text-[#4A4640] font-medium">
                  <span>₦0</span>
                  <span>₦50k</span>
                  <span>₦100k</span>
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="space-y-1.5 bg-white p-3.5 border border-[#D8D4CC]">
                <div className="flex justify-between text-xs">
                  <label htmlFor="max-price-slider" className="text-[#38342F] font-semibold">Maximum Budget:</label>
                  <span className="font-serif font-bold text-[#1B3326] text-sm">
                    {maxPrice >= 220000 ? '₦220,000+ (No Limit)' : formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  id="max-price-slider"
                  type="range"
                  min="10000"
                  max="220000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => handleMaxPriceSlider(Number(e.target.value))}
                  className="w-full accent-[#1B3326] cursor-pointer h-2 bg-[#E0DDD7] rounded-none"
                  aria-label="Maximum budget slider"
                />
                <div className="flex justify-between text-xs text-[#4A4640] font-medium">
                  <span>₦10k</span>
                  <span>₦50k</span>
                  <span>₦100k</span>
                  <span>₦220k+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Occasion & Item Type Exploration */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Occasion / Collection Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#191817] font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-[#1B3326]" />
              <span>Filter by Occasion Collection:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLLECTIONS.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setSelectedCollection(col)}
                  className={`px-3 py-1.5 text-xs transition-all font-medium ${
                    selectedCollection === col
                      ? 'bg-[#1B3326] text-white font-semibold shadow-sm'
                      : 'bg-[#FAFAF8] text-[#38342F] hover:bg-[#F0ECE4] border border-[#D8D4CC]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Item Type Badges */}
          <div className="pt-3 border-t border-[#F0ECE4] space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#191817] font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Filter by Gift Item Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ITEM_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedItemType(type)
                    if (type === 'Occasion Gift Packages') {
                      handleApplyPreset('all')
                    }
                  }}
                  className={`px-3 py-1.5 text-xs transition-all font-medium ${
                    selectedItemType === type
                      ? 'bg-[#191817] text-white font-semibold shadow-sm'
                      : 'bg-[#F5F4F0] text-[#38342F] hover:bg-[#EAE8E3] border border-[#D8D4CC]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#38342F] px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            Showing <strong className="text-[#191817]">{filteredProducts.length}</strong> handcrafted gifts
          </span>

          {selectedCollection !== 'All Collections' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1B3326]/10 text-[#1B3326] font-semibold border border-[#1B3326]/20">
              Occasion: {selectedCollection}
              <button
                type="button"
                onClick={() => setSelectedCollection('All Collections')}
                className="hover:text-black ml-0.5"
                title="Remove occasion filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {selectedItemType !== 'All Items' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#191817]/10 text-[#191817] font-semibold border border-[#191817]/20">
              Category: {selectedItemType}
              <button
                type="button"
                onClick={() => setSelectedItemType('All Items')}
                className="hover:text-black ml-0.5"
                title="Remove category filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {(minPrice > 0 || maxPrice < 220000) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#C2A264]/20 text-[#191817] font-semibold border border-[#C2A264]/40">
              Budget: {formatPrice(minPrice)} – {maxPrice >= 220000 ? '₦220,000+' : formatPrice(maxPrice)}
              <button
                type="button"
                onClick={() => handleApplyPreset('all')}
                className="hover:text-black ml-0.5"
                title="Reset budget"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {searchQuery.trim() !== '' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-[#191817] font-semibold border border-stone-300">
              Keyword: "{searchQuery}"
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:text-black ml-0.5"
                title="Clear keyword search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[#8A4A3E] hover:underline font-semibold hover:text-[#6E352B]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all filters</span>
          </button>
        )}
      </div>

      {/* Product Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#D8D4CC] space-y-4">
          <Box className="w-10 h-10 text-[#4A4640] mx-auto opacity-75" />
          <h3 className="font-serif text-xl font-semibold text-[#191817]">
            No personalized gifts matched your criteria
          </h3>
          <p className="text-sm text-[#4A4640] max-w-sm mx-auto">
            Try adjusting your price slider or search query, or check out our custom gift box builder to put together your own gift box.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-colors"
            >
              Reset All Filters
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('builder')}
              className="px-5 py-2.5 bg-white border border-[#191817] text-[#191817] text-xs uppercase tracking-wider font-semibold hover:bg-[#F5F4F0] transition-colors"
            >
              Build Custom Gift Box
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white border border-[#D8D4CC] hover:border-[#1B3326] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Picture Representation */}
                <div className="aspect-[4/3] bg-[#F5F4F0] relative overflow-hidden border-b border-[#E8E6E1]">
                  <ProductImage
                    src={product.imageUrl}
                    alt={product.title}
                    aspectRatio="auto"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isStarterBestSeller && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#1B3326] text-[#E5C07B] shadow-sm">
                        Starter Best Seller
                      </span>
                    )}
                    {!product.isStarterBestSeller && product.bestSeller && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#1B3326] text-white shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#C2A264] text-[#191817] shadow-sm">
                        New In
                      </span>
                    )}
                    {!product.isCustomQuote && product.price <= 10000 && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-emerald-800 text-white shadow-sm">
                        Everyday Gift
                      </span>
                    )}
                    {product.isCustomQuote && (
                      <span className="px-2.5 py-1 text-xs uppercase tracking-wider font-bold bg-[#191817] text-[#E5C07B] shadow-sm">
                        {product.minOrderQty ? `Min. ${product.minOrderQty} Pcs · Quote` : 'Request Quote'}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-10 shadow-sm ${
                      isWishlisted(product.id)
                        ? 'bg-white text-[#D47563] shadow-md scale-105'
                        : 'bg-white/90 hover:bg-white text-[#4A4640] hover:text-[#D47563]'
                    }`}
                    title={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    aria-label={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isWishlisted(product.id) ? 'fill-[#D47563] text-[#D47563] scale-110' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#4A4640] gap-2">
                    <span className="uppercase tracking-wider truncate max-w-[165px] font-bold">
                      {product.itemType}
                    </span>
                    {product.isCustomQuote ? (
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
                        className="px-2.5 py-1 bg-[#1B3326] text-[#E5C07B] hover:bg-[#122319] text-xs uppercase tracking-wider font-bold transition-colors shrink-0"
                      >
                        Request a Quote
                      </button>
                    ) : (
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#1B3326] shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#191817] group-hover:text-[#1B3326] transition-colors leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-sm text-[#4A4640] line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[#1B3326] bg-[#FAF9F5] px-2.5 py-1 border border-[#E8E6E1] truncate max-w-[205px]">
                      Design: <span className="text-[#191817]">{product.resinPalette}</span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className="text-xs px-2 py-1 bg-[#E8F3EB] border border-[#C4DEC9] text-[#1B3326] font-bold"
                        title="Customizable with name, photo, date, logo, or colors"
                      >
                        C · Custom
                      </span>
                      {product.isFoodSafe && (
                        <span className="text-xs px-2 py-1 bg-[#FAF8F2] border border-[#C2A264] text-[#191817] font-bold">
                          Food-Safe
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#F0ECE4]">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#191817] mb-1.5">
                      What You Get Inside:
                    </p>
                    <ul className="text-xs sm:text-sm text-[#38342F] space-y-1">
                      {product.itemsIncluded.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1B3326] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                      {product.itemsIncluded.length > 3 && (
                        <li className="text-xs font-semibold text-[#1B3326] pt-0.5">
                          +{product.itemsIncluded.length - 3} more handmade details inside
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 mt-2">
                {product.isCustomQuote ? (
                  <div className="grid grid-cols-2 gap-2">
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
                      className="py-3 px-3 bg-[#1B3326] hover:bg-[#122319] text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                      <span>Request a Quote</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectProduct(product)
                      }}
                      className="py-3 px-3 bg-[#FAFAF8] hover:bg-[#EAE8E3] text-[#191817] text-xs uppercase tracking-wider font-bold transition-all border border-[#D8D4CC] flex items-center justify-center gap-1"
                    >
                      <span>Details &amp; Reviews</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full py-3 px-4 bg-[#FAFAF8] group-hover:bg-[#1B3326] group-hover:text-white text-[#191817] text-xs uppercase tracking-[0.14em] font-bold transition-all border border-[#D8D4CC] group-hover:border-transparent flex items-center justify-center gap-1.5"
                  >
                    <span>Select &amp; Personalise</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Gift Box Builder Banner */}
      <div className="bg-[#F5F4F0] p-6 sm:p-8 border border-[#D8D4CC] flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#1B3326] font-bold">
            Put Together Your Own Gift Box
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
            Create a Box Full of Thoughtful Memories
          </h3>
          <p className="text-sm text-[#38342F] max-w-lg leading-relaxed">
            Pick one main centerpiece (desk clock, nameplate, photo plaque, night lamp, notebook, or jewelry dish), add matching small surprises (keychain, bookmark, pen, cufflinks, coasters), and finish with their name and your handwritten card.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('builder')}
          className="px-6 py-3.5 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] transition-colors flex-shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#C2A264]" />
          <span>Launch Gift Builder</span>
        </button>
      </div>
    </div>
  )
}


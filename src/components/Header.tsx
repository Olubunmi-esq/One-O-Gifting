import React, { useState, useMemo, useRef, useEffect } from 'react'
import { ShoppingBag, Menu, X, Heart, Search, ArrowRight } from 'lucide-react'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { STUDIO_INFO } from '../data/studioInfo'
import { SAMPLE_PRODUCTS, ITEM_TYPES, COLLECTIONS, Product } from '../data/products'
import { ProductImage } from './ProductImage'
import { CatalogueFilterPreset } from '../views/CatalogueView'

interface HeaderProps {
  currentView: string
  setCurrentView: (view: string) => void
  cartCount: number
  onOpenCart: () => void
  onSelectProduct: (product: Product) => void
  onSearchCatalogue: (preset: CatalogueFilterPreset) => void
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  onOpenCart,
  onSelectProduct,
  onSearchCatalogue
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { currency, setCurrency, formatPrice } = useCurrency()
  const { wishlistCount } = useWishlist()
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

  const navLinks = [
    { id: 'catalogue', label: 'Shop All' },
    { id: 'occasions', label: 'Occasions' },
    { id: 'corporate', label: 'Events & Bulk' },
    { id: 'builder', label: 'Build a Box' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (mobileSearchOpen) {
      mobileSearchInputRef.current?.focus()
    }
  }, [mobileSearchOpen])

  const searchResults = useMemo(() => {
    const raw = searchQuery.trim().toLowerCase()
    if (!raw) {
      return { products: [] as Product[], totalCount: 0, categories: [] as { label: string; preset: CatalogueFilterPreset }[] }
    }
    const tokens = raw.split(/\s+/).filter(Boolean)

    const matchedCategories: { label: string; preset: CatalogueFilterPreset }[] = []
    for (const type of ITEM_TYPES) {
      if (type === 'All Items') continue
      if (tokens.every((t) => type.toLowerCase().includes(t))) {
        matchedCategories.push({ label: type, preset: { itemType: type } })
      }
    }
    for (const col of COLLECTIONS) {
      if (col === 'All Collections') continue
      if (
        tokens.every((t) => col.toLowerCase().includes(t)) &&
        !matchedCategories.some((c) => c.label.toLowerCase() === col.toLowerCase())
      ) {
        matchedCategories.push({ label: col, preset: { collection: col } })
      }
    }

    const matchedProducts = SAMPLE_PRODUCTS.filter((product) => {
      const searchable = [
        product.title,
        product.subtitle,
        product.itemType,
        product.collection,
        ...product.collections,
        ...product.tags
      ]
        .join(' ')
        .toLowerCase()
      return tokens.every((token) => searchable.includes(token))
    })

    return {
      products: matchedProducts.slice(0, 5),
      totalCount: matchedProducts.length,
      categories: matchedCategories.slice(0, 3)
    }
  }, [searchQuery])

  const handleNav = (id: string) => {
    setCurrentView(id)
    setMobileMenuOpen(false)
    setMobileSearchOpen(false)
    setIsDropdownOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    onSearchCatalogue({ searchQuery: trimmed })
    setIsDropdownOpen(false)
    setMobileSearchOpen(false)
  }

  const handlePickProduct = (product: Product) => {
    onSelectProduct(product)
    setIsDropdownOpen(false)
    setMobileSearchOpen(false)
    setSearchQuery('')
  }

  const handlePickCategory = (preset: CatalogueFilterPreset) => {
    onSearchCatalogue(preset)
    setIsDropdownOpen(false)
    setMobileSearchOpen(false)
    setSearchQuery('')
  }

  const renderResultsDropdown = () => {
    if (!isDropdownOpen || !searchQuery.trim()) return null

    const hasAny = searchResults.products.length > 0 || searchResults.categories.length > 0

    return (
      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#DDD8CE] shadow-xl z-50 overflow-hidden">
        {!hasAny ? (
          <div className="p-4 text-center space-y-1.5">
            <p className="text-sm font-medium text-[#191817]">
              No matches for &ldquo;{searchQuery.trim()}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => handlePickCategory({})}
              className="text-xs font-semibold text-[#1B3326] hover:underline"
            >
              Browse all {SAMPLE_PRODUCTS.length} products →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#F0ECE4]">
            {searchResults.categories.length > 0 && (
              <div className="p-2.5 bg-[#FAF9F5] space-y-1">
                <p className="px-2 text-[11px] font-semibold text-[#6B665F]">
                  Categories
                </p>
                <div className="flex flex-wrap gap-1.5 px-1">
                  {searchResults.categories.map((cat) => (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => handlePickCategory(cat.preset)}
                      className="px-2.5 py-1 text-xs font-medium bg-white border border-[#DDD8CE] hover:border-[#1B3326] text-[#191817] transition-colors"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.products.length > 0 && (
              <div className="max-h-80 overflow-y-auto divide-y divide-[#F5F2EC]">
                {searchResults.products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handlePickProduct(product)}
                    className="w-full p-2.5 hover:bg-[#FAF9F5] transition-colors flex items-center gap-3 text-left"
                  >
                    <div className="w-11 h-11 bg-[#F5F4F0] border border-[#EAE8E3] overflow-hidden shrink-0">
                      <ProductImage
                        src={product.imageUrl}
                        alt={product.title}
                        aspectRatio="auto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#191817] truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-[#6B665F] truncate">
                        {product.itemType}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {product.isCustomQuote ? (
                        <span className="text-xs font-semibold text-[#1B3326]">
                          Quote
                        </span>
                      ) : (
                        <span className="font-serif text-sm font-bold text-[#1B3326] tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmitSearch}
              className="w-full px-4 py-2.5 bg-[#FAF9F5] hover:bg-[#F2EFE9] text-xs font-semibold text-[#1B3326] flex items-center justify-between transition-colors"
            >
              <span>
                View all {searchResults.totalCount} results for &ldquo;{searchQuery.trim()}&rdquo;
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <header
      ref={searchContainerRef}
      className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#EAE8E3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-6">
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                setMobileSearchOpen(false)
              }}
              className="p-2 -ml-2 text-[#191817] hover:text-[#1B3326] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3326]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.2em] text-[#191817] hover:text-[#1B3326] transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            ONE O
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className={`text-sm transition-colors relative py-1 whitespace-nowrap shrink-0 ${
                  currentView === link.id
                    ? 'text-[#1B3326] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#1B3326]'
                    : 'text-[#4A4640] hover:text-[#191817] font-medium'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Global Search + Utilities + Bag */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Desktop Global Product Search Bar */}
            <div className="hidden md:block relative w-52 xl:w-64">
              <form onSubmit={handleSubmitSearch} className="relative">
                <Search className="w-4 h-4 text-[#6B665F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsDropdownOpen(true)
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search gifts or category..."
                  className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-white border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817] transition-colors"
                  aria-label="Search products by name or category"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setIsDropdownOpen(false)
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B665F] hover:text-[#191817]"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
              {renderResultsDropdown()}
            </div>

            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev)
                setMobileMenuOpen(false)
                setIsDropdownOpen(true)
              }}
              className="md:hidden p-2 text-[#191817] hover:text-[#1B3326] hover:bg-[#F2EFE9] transition-colors"
              aria-label="Search products"
            >
              {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Currency Switcher */}
            <button
              type="button"
              onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
              className="hidden sm:inline-flex items-center px-2.5 py-1.5 text-xs font-semibold text-[#4A4640] hover:text-[#191817] border border-[#DDD8CE] bg-white transition-colors whitespace-nowrap shrink-0 tabular-nums"
              title="Switch currency between NGN and USD"
            >
              {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => handleNav('wishlist')}
              className={`relative p-2 transition-colors hover:bg-[#F2EFE9] ${
                currentView === 'wishlist' ? 'text-[#D47563]' : 'text-[#191817] hover:text-[#D47563]'
              }`}
              aria-label="Saved items"
              title="Saved items"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#D47563] text-[#D47563]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 bg-[#D47563] text-white text-[10px] font-semibold rounded-full tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Primary Bag CTA */}
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1B3326] text-white hover:bg-[#122319] transition-colors text-xs font-semibold whitespace-nowrap shrink-0"
              aria-label="Open bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums">({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-[#EAE8E3] bg-[#FAFAF8] px-4 py-3">
          <div className="relative">
            <form onSubmit={handleSubmitSearch} className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#6B665F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsDropdownOpen(true)
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search gifts or category..."
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326] text-[#191817]"
                  aria-label="Search products by name or category"
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
              <button
                type="submit"
                className="px-4 py-2 bg-[#1B3326] text-white text-xs font-semibold whitespace-nowrap shrink-0"
              >
                Go
              </button>
            </form>
            {renderResultsDropdown()}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE8E3] bg-[#FAFAF8] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left py-2.5 px-3 text-sm font-medium transition-colors ${
                currentView === link.id
                  ? 'bg-[#F2EFE9] text-[#1B3326] font-semibold'
                  : 'text-[#38342F] hover:bg-[#F5F2EC]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 mt-2 border-t border-[#EAE8E3] flex items-center justify-between px-3">
            <button
              type="button"
              onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
              className="text-xs font-semibold text-[#191817] border border-[#DDD8CE] bg-white px-3 py-1.5"
            >
              Currency: {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#1B3326] hover:underline"
            >
              WhatsApp {STUDIO_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

import React, { useState } from 'react'
import { ShoppingBag, Menu, X, Sparkles, Heart } from 'lucide-react'
import { useCurrency } from '../context/CurrencyContext'
import { useWishlist } from '../context/WishlistContext'
import { STUDIO_INFO } from '../data/studioInfo'

interface HeaderProps {
  currentView: string
  setCurrentView: (view: string) => void
  cartCount: number
  onOpenCart: () => void
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { currency, setCurrency } = useCurrency()
  const { wishlistCount } = useWishlist()

  const navLinks = [
    { id: 'guide', label: 'Gifting Guide' },
    { id: 'catalogue', label: 'All Gifts' },
    { id: 'occasions', label: 'By Occasion' },
    { id: 'builder', label: 'Build a Box' },
    { id: 'corporate', label: 'Party Souvenirs' },
    { id: 'story', label: 'About ONE O' },
    { id: 'contact', label: 'Contact Us' },
  ]

  const handleNav = (id: string) => {
    setCurrentView(id)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#EAE8E3] transition-all">
      {/* Top Nationwide Announcement Bar */}
      <div className="bg-[#191817] text-[#F5F2EB] text-xs py-2 px-4 text-center tracking-[0.12em] uppercase font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-[#C2A264]" />
            <span>Handcrafted Resin Gifts · Safe Delivery Across All 36 States</span>
          </span>
          <span className="hidden sm:inline text-[#524E48]">·</span>
          <span className="text-[#E5C07B] font-bold">
            ✨ Custom Names, Photos &amp; Special Dates · Made With Love
          </span>
          <span className="hidden sm:inline text-[#524E48]">·</span>
          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#C2A264] hover:underline font-bold flex items-center gap-1"
            title="Chat directly on WhatsApp"
          >
            <span>WhatsApp / Orders: {STUDIO_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A453F] hover:text-[#191817] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => handleNav('home')}
              className="group inline-flex items-center text-left focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.22em] text-[#191817] group-hover:text-[#1B3326] transition-colors whitespace-nowrap shrink-0">
                ONE O
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-xs tracking-[0.12em] uppercase transition-colors relative py-1 whitespace-nowrap shrink-0 ${
                  currentView === link.id
                    ? 'text-[#191817] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1B3326]'
                    : 'text-[#38342F] hover:text-[#191817] font-semibold'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Currency Switcher + Wishlist + Cart + Build Box */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Currency Selector */}
            <div className="flex items-center border border-[#D5D2CB] bg-white text-xs font-medium p-0.5">
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`px-2 py-1 transition-colors ${
                  currency === 'NGN'
                    ? 'bg-[#1B3326] text-white font-semibold'
                    : 'text-[#38342F] hover:text-[#191817]'
                }`}
                title="Nigerian Naira"
              >
                ₦ NGN
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 transition-colors ${
                  currency === 'USD'
                    ? 'bg-[#1B3326] text-white font-semibold'
                    : 'text-[#38342F] hover:text-[#191817]'
                }`}
                title="US Dollars (Diaspora)"
              >
                $ USD
              </button>
            </div>

            <button
              onClick={() => handleNav('builder')}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1B3326] text-white hover:bg-[#122319] transition-all text-xs tracking-[0.12em] uppercase font-semibold whitespace-nowrap shrink-0 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Build a Box</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNav('wishlist')}
              className={`relative p-2 transition-colors hover:bg-[#F2EFE9] ${
                currentView === 'wishlist' ? 'text-[#D47563]' : 'text-[#191817] hover:text-[#D47563]'
              }`}
              aria-label="View Saved Wishlist"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#D47563] text-[#D47563]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 bg-[#D47563] text-white text-[10px] font-semibold rounded-full animate-in zoom-in duration-200">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#191817] hover:text-[#1B3326] transition-colors hover:bg-[#F2EFE9]"
              aria-label="View Gifting Bag"
              title="Gifting Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 bg-[#1B3326] text-white text-[10px] font-semibold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE8E3] bg-[#FAFAF8] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left py-2.5 px-3 text-sm tracking-wider uppercase font-medium transition-colors ${
                currentView === link.id
                  ? 'bg-[#F2EFE9] text-[#191817] font-semibold'
                  : 'text-[#5C564E] hover:bg-[#F5F2EC]'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Wishlist Mobile Link */}
          <button
            onClick={() => handleNav('wishlist')}
            className={`w-full flex items-center justify-between py-2.5 px-3 text-sm tracking-wider uppercase font-medium transition-colors ${
              currentView === 'wishlist'
                ? 'bg-[#F2EFE9] text-[#D47563] font-semibold'
                : 'text-[#5C564E] hover:bg-[#F5F2EC]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#D47563] text-[#D47563]' : ''}`} />
              <span>Saved Wishlist</span>
            </span>
            {wishlistCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#D47563] text-white font-semibold rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          <div className="pt-3 border-t border-[#EAE8E3] flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#38342F]">Currency</span>
            <div className="flex items-center border border-[#D5D2CB] bg-white text-xs font-medium p-0.5">
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`px-3 py-1 ${currency === 'NGN' ? 'bg-[#1B3326] text-white' : 'text-[#5C564E]'}`}
              >
                ₦ NGN
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 ${currency === 'USD' ? 'bg-[#1B3326] text-white' : 'text-[#5C564E]'}`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => handleNav('builder')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Build a Custom Gift Box</span>
            </button>

            {/* Direct Studio WhatsApp / Call Button */}
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366]/10 text-[#1B3326] border border-[#25D366]/30 text-xs uppercase tracking-wider font-semibold"
            >
              <span>WhatsApp / Order: {STUDIO_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

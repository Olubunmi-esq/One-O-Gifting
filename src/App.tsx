import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartDrawer, CartItem } from './components/CartDrawer'
import { ProductModal } from './components/ProductModal'
import { QuoteInquiryModal, QuoteInquiryTarget } from './components/QuoteInquiryModal'
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton'
import { HomeView } from './views/HomeView'
import { CatalogueView, CatalogueFilterPreset } from './views/CatalogueView'
import { OccasionsView } from './views/OccasionsView'
import { BuilderView } from './views/BuilderView'
import { CorporateView } from './views/CorporateView'
import { StoryView } from './views/StoryView'
import { ContactView } from './views/ContactView'
import { LegalView } from './views/LegalView'
import { WishlistView } from './views/WishlistView'
import { GiftingGuideView } from './views/GiftingGuideView'
import { Product } from './data/products'
import { CurrencyProvider } from './context/CurrencyContext'
import { WishlistProvider } from './context/WishlistContext'

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home')
  const [cataloguePreset, setCataloguePreset] = useState<CatalogueFilterPreset | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('one_o_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quoteTarget, setQuoteTarget] = useState<QuoteInquiryTarget | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem('one_o_cart', JSON.stringify(cartItems))
    } catch (err) {
      console.warn('LocalStorage save failed:', err)
    }
  }, [cartItems])

  const handleNavigate = (view: string) => {
    if (view !== 'catalogue') {
      setCataloguePreset(null)
    }
    setCurrentView(view)
  }

  const handleOpenCatalogueWithFilter = (preset: CatalogueFilterPreset) => {
    setCataloguePreset({ ...preset, _ts: Date.now() })
    setCurrentView('catalogue')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item])
  }

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleUpdateItemGiftNote = (id: string, note: string) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, giftNote: note } : item))
    )
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleRequestQuote = (target: QuoteInquiryTarget) => {
    setSelectedProduct(null)
    setQuoteTarget(target)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#191817]">
      <Header
        currentView={currentView}
        setCurrentView={handleNavigate}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={handleSelectProduct}
        onSearchCatalogue={handleOpenCatalogueWithFilter}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onRequestQuote={handleRequestQuote}
            onOpenCatalogueWithFilter={handleOpenCatalogueWithFilter}
          />
        )}
        {currentView === 'guide' && (
          <GiftingGuideView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            setCurrentView={handleNavigate}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'catalogue' && (
          <CatalogueView
            onSelectProduct={handleSelectProduct}
            setCurrentView={handleNavigate}
            onRequestQuote={handleRequestQuote}
            initialFilter={cataloguePreset}
          />
        )}
        {currentView === 'wishlist' && (
          <WishlistView
            onSelectProduct={handleSelectProduct}
            setCurrentView={handleNavigate}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'occasions' && (
          <OccasionsView
            onSelectProduct={handleSelectProduct}
            setCurrentView={handleNavigate}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'builder' && (
          <BuilderView
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
        {currentView === 'corporate' && (
          <CorporateView onRequestQuote={handleRequestQuote} />
        )}
        {currentView === 'story' && <StoryView setCurrentView={handleNavigate} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'privacy' && (
          <LegalView initialTab="privacy" setCurrentView={handleNavigate} />
        )}
        {currentView === 'terms' && (
          <LegalView initialTab="terms" setCurrentView={handleNavigate} />
        )}
      </main>

      <Footer setCurrentView={handleNavigate} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRequestQuote={handleRequestQuote}
      />

      <QuoteInquiryModal
        target={quoteTarget}
        onClose={() => setQuoteTarget(null)}
        onAddQuoteToBag={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUpdateItemGiftNote={handleUpdateItemGiftNote}
      />

      <WhatsAppFloatingButton
        currentView={currentView}
        hidden={isCartOpen || Boolean(selectedProduct) || Boolean(quoteTarget)}
      />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CurrencyProvider>
  )
}

export default App

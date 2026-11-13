import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartDrawer, CartItem } from './components/CartDrawer'
import { ProductModal } from './components/ProductModal'
import { QuoteInquiryModal, QuoteInquiryTarget } from './components/QuoteInquiryModal'
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton'
import { HomeView } from './views/HomeView'
import { CatalogueView } from './views/CatalogueView'
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
        setCurrentView={setCurrentView}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'guide' && (
          <GiftingGuideView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            setCurrentView={setCurrentView}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'catalogue' && (
          <CatalogueView
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'wishlist' && (
          <WishlistView
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
            onRequestQuote={handleRequestQuote}
          />
        )}
        {currentView === 'occasions' && (
          <OccasionsView
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
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
        {currentView === 'story' && <StoryView setCurrentView={setCurrentView} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'privacy' && (
          <LegalView initialTab="privacy" setCurrentView={setCurrentView} />
        )}
        {currentView === 'terms' && (
          <LegalView initialTab="terms" setCurrentView={setCurrentView} />
        )}
      </main>

      <Footer setCurrentView={setCurrentView} />

      {/* Product Detail & Personalisation Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRequestQuote={handleRequestQuote}
      />

      {/* Custom Order Quote Inquiry Modal */}
      <QuoteInquiryModal
        target={quoteTarget}
        onClose={() => setQuoteTarget(null)}
        onAddQuoteToBag={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart & Inquiry Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUpdateItemGiftNote={handleUpdateItemGiftNote}
      />

      {/* Floating WhatsApp Direct Inquiry Action Button */}
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

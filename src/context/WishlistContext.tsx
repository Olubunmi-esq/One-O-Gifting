import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, SAMPLE_PRODUCTS } from '../data/products'

interface WishlistContextType {
  wishlistIds: string[]
  wishlistItems: Product[]
  wishlistCount: number
  isWishlisted: (id: string) => boolean
  toggleWishlist: (id: string) => void
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const STORAGE_KEY = 'one_o_wishlist'

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds))
    } catch (err) {
      console.warn('Failed to save wishlist to localStorage:', err)
    }
  }, [wishlistIds])

  const isWishlisted = (id: string) => {
    return wishlistIds.includes(id)
  }

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const addToWishlist = (id: string) => {
    setWishlistIds(prev => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeFromWishlist = (id: string) => {
    setWishlistIds(prev => prev.filter(item => item !== id))
  }

  const clearWishlist = () => {
    setWishlistIds([])
  }

  const wishlistItems = SAMPLE_PRODUCTS.filter(product =>
    wishlistIds.includes(product.id)
  )

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount: wishlistIds.length,
        isWishlisted,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

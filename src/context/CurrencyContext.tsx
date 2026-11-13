import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = 'NGN' | 'USD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (amountInNaira: number) => string
  convertPrice: (amountInNaira: number) => number
  currencySymbol: string
  rate: number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const NGN_PER_USD = 1500

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('NGN')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('one_o_currency') as Currency
      if (saved === 'NGN' || saved === 'USD') {
        setCurrencyState(saved)
      }
    } catch {
      // ignore localStorage errors in hermetic environments
    }
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    try {
      localStorage.setItem('one_o_currency', c)
    } catch {
      // ignore
    }
  }

  const convertPrice = (amountInNaira: number): number => {
    if (currency === 'USD') {
      return Math.round(amountInNaira / NGN_PER_USD)
    }
    return amountInNaira
  }

  const formatPrice = (amountInNaira: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(amountInNaira / NGN_PER_USD)
      return `$${usd.toLocaleString()}`
    }
    return `₦${amountInNaira.toLocaleString()}`
  }

  const currencySymbol = currency === 'NGN' ? '₦' : '$'

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencySymbol,
        rate: NGN_PER_USD
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext)
  if (!context) {
    // Fallback if rendered outside provider
    return {
      currency: 'NGN',
      setCurrency: () => {},
      formatPrice: (amt) => `₦${amt.toLocaleString()}`,
      convertPrice: (amt) => amt,
      currencySymbol: '₦',
      rate: NGN_PER_USD
    }
  }
  return context
}

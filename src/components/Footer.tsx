import React from 'react'
import { STUDIO_INFO } from '../data/studioInfo'

interface FooterProps {
  setCurrentView: (view: string) => void
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const navigateTo = (view: string) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#181716] text-[#D8D4CC] py-12 border-t border-[#292724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-[#292724]">
          {/* Brand & Direct Contact */}
          <div className="space-y-3">
            <span className="font-serif text-xl tracking-[0.2em] text-[#FAFAF8] block">
              ONE O
            </span>
            <p className="text-sm text-[#B8B2A8] leading-relaxed">
              Custom resin gifts &amp; event souvenirs. Delivered across Nigeria.
            </p>
            <div className="space-y-1 text-xs text-[#DEDAD1]">
              <div>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  WhatsApp: {STUDIO_INFO.phoneDisplay}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  {STUDIO_INFO.email}
                </a>
              </div>
              <div>
                <a
                  href={STUDIO_INFO.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  TikTok: {STUDIO_INFO.tiktokHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-semibold">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-[#B8B2A8]">
              <li>
                <button type="button" onClick={() => navigateTo('catalogue')} className="hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('occasions')} className="hover:text-white transition-colors">
                  Occasion Packages
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('builder')} className="hover:text-white transition-colors">
                  Build a Custom Box
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('corporate')} className="hover:text-white transition-colors">
                  Events &amp; Bulk Souvenirs
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#B8B2A8]">
              <li>
                <button type="button" onClick={() => navigateTo('guide')} className="hover:text-white transition-colors">
                  Gifting Guide
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                  Saved Items
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('story')} className="hover:text-white transition-colors">
                  About ONE O
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-semibold">
              Policies
            </h4>
            <ul className="space-y-2 text-sm text-[#B8B2A8]">
              <li>
                <button type="button" onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Delivery &amp; Returns
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-xs text-[#9A948B] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ONE O Personalized Gifts.</p>
          <p>{STUDIO_INFO.hours}</p>
        </div>
      </div>
    </footer>
  )
}

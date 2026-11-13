import React from 'react'
import { Mail, Phone, ArrowUpRight, Heart } from 'lucide-react'
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
    <footer className="bg-[#181716] text-[#D8D4CC] pt-14 pb-10 border-t border-[#292724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#292724]">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.2em] text-[#FAFAF8] block">
                ONE O
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C2A264]">
                Handcrafted Personalized Resin Gifting
              </p>
            </div>
            <p className="text-sm text-[#DEDAD1] max-w-sm leading-relaxed">
              Nigeria's home for handmade personalized resin gifts and party souvenirs. From letter keychains starting at ₦4,000 and customized bookmarks at ₦3,000, to photo night lamps, desk clocks, and serving boards—choose your exact colors, style, and wording on WhatsApp, delivered safely across all 36 Nigerian states.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3.5 text-xs tracking-wider uppercase text-[#F5F2EB]">
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-[#C2A264] transition-colors"
                title="Send Email to ONE O"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="lowercase">{STUDIO_INFO.email}</span>
              </a>
              <span className="text-[#5C5750]">·</span>
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#C2A264] transition-colors"
                title="Chat on WhatsApp / Call 09064248263"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {STUDIO_INFO.phoneDisplay}</span>
              </a>
              <span className="text-[#5C5750]">·</span>
              <a
                href={STUDIO_INFO.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#C2A264] transition-colors"
                title="Follow ONE O on TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.34 6.34 0 0 0-.85-.06A6.33 6.33 0 0 0 3.15 15.7a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.94-4.5V8.82a8.28 8.28 0 0 0 4.84 1.56V6.93a4.85 4.85 0 0 1-1.16-.24z" />
                </svg>
                <span>TikTok: {STUDIO_INFO.tiktokHandle}</span>
              </a>
            </div>
          </div>

          {/* Personalized Gifts Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-bold">
              Personalized Gifts
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DEDAD1]">
              <li>
                <button onClick={() => navigateTo('guide')} className="hover:text-[#FAFAF8] text-[#E5C07B] font-semibold transition-colors">
                  Gifting Guide (Choose by Feeling)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalogue')} className="hover:text-[#FAFAF8] transition-colors">
                  Photo &amp; Song Plaques
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalogue')} className="hover:text-[#FAFAF8] transition-colors">
                  Letter Initial Keychains
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalogue')} className="hover:text-[#FAFAF8] transition-colors">
                  Ready-Made Gift Boxes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('builder')} className="hover:text-[#FAFAF8] transition-colors">
                  Custom Gift Box Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-[#FAFAF8] text-[#E5C07B] transition-colors">
                  My Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Celebrations & Occasions */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-bold">
              Celebrations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DEDAD1]">
              <li>
                <button onClick={() => navigateTo('occasions')} className="hover:text-[#FAFAF8] transition-colors">
                  Birthdays &amp; Milestones
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('occasions')} className="hover:text-[#FAFAF8] transition-colors">
                  Love &amp; Anniversaries
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('corporate')} className="hover:text-[#FAFAF8] transition-colors">
                  Wedding &amp; Owambe Favors
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('occasions')} className="hover:text-[#FAFAF8] transition-colors">
                  Appreciation &amp; Thank You
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-bold">
              Nationwide Delivery
            </h4>
            <p className="text-sm text-[#DEDAD1] leading-relaxed">
              Carefully wrapped and delivered via express tracked courier to doorsteps across Lagos, Abuja, Port Harcourt, Ibadan, and all 36 Nigerian states.
            </p>
            <ul className="space-y-2.5 text-sm text-[#DEDAD1]">
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-[#FAFAF8] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Privacy Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DEDAD1]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-[#FAFAF8] transition-colors flex items-center gap-1 text-left"
                >
                  <span>Delivery &amp; Returns Terms</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DEDAD1]" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DEDAD1] gap-3">
          <p>© {new Date().getFullYear()} ONE O. Handcrafted personalized resin gifts made with you in mind. Nationwide delivery across Nigeria.</p>
          <div className="flex items-center gap-2 text-xs text-[#E5C07B]">
            <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
            <span>100% Handcrafted in Nigeria · Clear Shiny Resin · Custom Names &amp; Dates</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

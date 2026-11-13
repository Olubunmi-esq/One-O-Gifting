import React from 'react'
import { MessageCircle } from 'lucide-react'
import { STUDIO_INFO, getWhatsAppOrderUrl } from '../data/studioInfo'

interface WhatsAppFloatingButtonProps {
  currentView?: string
  hidden?: boolean
}

function getPreFilledInquiryMessage(currentView?: string): string {
  switch (currentView) {
    case 'corporate':
      return 'Hello ONE O Personalized Gifts! I would like to inquire about a custom resin commission or corporate/event souvenir order (branded packs, plaques, pens, or bulk sets). Please share options, timeline, and a tailored quote.'
    case 'occasions':
      return 'Hello ONE O Personalized Gifts! I would like to inquire about custom resin commissions and event souvenirs (weddings, Owambe packs, birthdays, or milestone boxes). Please share options, timeline, and quote details.'
    case 'builder':
      return 'Hello ONE O Personalized Gifts! I am putting together a custom resin gift box commission and would like guidance on colors, personalization, or event souvenirs.'
    default:
      return 'Hello ONE O Personalized Gifts! I would like to inquire about a custom resin commission or event souvenirs (custom names, photos, colors, or bulk guest packs). Please share design options, timeline, and pricing/quote details.'
  }
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  currentView,
  hidden = false
}) => {
  if (hidden) return null

  const message = getPreFilledInquiryMessage(currentView)
  const href = getWhatsAppOrderUrl(message)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp (${STUDIO_INFO.phoneDisplay}) for custom resin commissions or event souvenirs`}
      title={`WhatsApp Inquiry (${STUDIO_INFO.phoneDisplay})`}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 bg-[#1B3326] hover:bg-[#122319] text-white pl-2.5 pr-4 py-2.5 rounded-full border border-[#C2A264]/70 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C2A264] focus:ring-offset-2"
    >
      <span className="w-9 h-9 rounded-full bg-[#25D366] group-hover:bg-[#1EBE5D] text-white flex items-center justify-center shrink-0 shadow-sm transition-colors">
        <MessageCircle className="w-5 h-5 fill-white text-transparent" />
      </span>

      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#E5C07B] font-bold">
          Custom &amp; Souvenirs
        </span>
        <span className="text-xs sm:text-sm font-semibold text-white">
          WhatsApp Studio
        </span>
      </span>
    </a>
  )
}

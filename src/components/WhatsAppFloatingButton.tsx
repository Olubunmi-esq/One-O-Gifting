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
      return 'Hello ONE O Personalized Gifts! I would like to inquire about custom resin commissions or event/corporate souvenirs. Please share options, timeline, and a quote.'
    case 'occasions':
      return 'Hello ONE O Personalized Gifts! I would like to inquire about custom resin gifts or event souvenirs (weddings, birthdays, or bulk packs). Please share options and a quote.'
    case 'builder':
      return 'Hello ONE O Personalized Gifts! I am putting together a custom resin gift box and would like help with personalization and pricing.'
    default:
      return 'Hello ONE O Personalized Gifts! I would like to inquire about a custom resin commission or event souvenirs. Please share options, timeline, and pricing.'
  }
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  currentView,
  hidden = false
}) => {
  if (hidden) return null

  const href = getWhatsAppOrderUrl(getPreFilledInquiryMessage(currentView))

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp (${STUDIO_INFO.phoneDisplay})`}
      title={`WhatsApp (${STUDIO_INFO.phoneDisplay})`}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 bg-[#1B3326] hover:bg-[#122319] text-white pl-2.5 pr-4 py-2 rounded-full border border-[#C2A264]/60 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A264] focus-visible:ring-offset-2"
    >
      <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
        <MessageCircle className="w-4 h-4 fill-white text-transparent" />
      </span>
      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  )
}

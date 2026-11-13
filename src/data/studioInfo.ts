// Direct studio contact URLs & details (No environment variables required)
export const STUDIO_INFO = {
  name: 'ONE O',
  fullName: 'ONE O Personalized Gifts',
  tagline: 'Handcrafted Personalized Resin Gifting',
  email: 'oneopersonalisedgift@gmail.com',
  whatsapp: '09064248263',
  whatsappContact: '09064248263',
  whatsappRaw: '2349064248263',
  phoneDisplay: '09064248263',
  phoneInternational: '+234 906 424 8263',
  phoneTel: 'tel:09064248263',
  whatsappUrl: 'https://wa.me/2349064248263',
  tiktokHandle: '@oneo_personalised_gifts',
  tiktokUrl: 'https://www.tiktok.com/@oneo_personalised_gifts',
  hours: 'Monday – Saturday: 9:00am – 6:00pm (WAT)',
  coverage: 'Express Delivery to Lagos, Abuja, Port Harcourt & All 36 Nigerian States',
  packaging: 'Shockproof bubble wrap, branded gift box & wax-sealed note card'
}

export const getWhatsAppOrderUrl = (messageText: string) => {
  const encoded = encodeURIComponent(messageText)
  return `https://wa.me/2349064248263?text=${encoded}`
}

export const getEmailOrderUrl = (subject: string, bodyText: string) => {
  const encodedSub = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(bodyText)
  return `mailto:oneopersonalisedgift@gmail.com?subject=${encodedSub}&body=${encodedBody}`
}

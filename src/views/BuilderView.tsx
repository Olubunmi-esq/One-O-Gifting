import React, { useState } from 'react'
import { Check, Sparkles, Trash2, Feather, Gift, ArrowRight, Heart } from 'lucide-react'
import { BUILDER_RESIN_BASES, BUILDER_RESIN_ADDONS, RESIN_COLOR_PALETTES, BuilderResinBase, BuilderResinAddon } from '../data/products'
import { CartItem } from '../components/CartDrawer'
import { ProductImage } from '../components/ProductImage'
import { CuteMessagePicker } from '../components/CuteMessagePicker'
import { DesignAndColorPicker, SelectedDesignConfig } from '../components/DesignAndColorPicker'
import { useCurrency } from '../context/CurrencyContext'

interface BuilderViewProps {
  onAddToCart: (item: CartItem) => void
  onOpenCart: () => void
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  onAddToCart,
  onOpenCart
}) => {
  const { formatPrice } = useCurrency()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [selectedBase, setSelectedBase] = useState<BuilderResinBase>(BUILDER_RESIN_BASES[0])
  const [selectedAddons, setSelectedAddons] = useState<BuilderResinAddon[]>([BUILDER_RESIN_ADDONS[0]])
  const [chooseColorsOnWhatsApp, setChooseColorsOnWhatsApp] = useState(true)
  const [selectedPalette, setSelectedPalette] = useState('Royal Emerald & 24k Gold')
  const [selectedPattern, setSelectedPattern] = useState('Geode Crystal Agate Edge')
  const [selectedMetallic, setSelectedMetallic] = useState('24k Gold Leaf Flakes')
  const [recipientName, setRecipientName] = useState('')
  const [customSong, setCustomSong] = useState('')
  const [giftNote, setGiftNote] = useState('')
  const [addedNotice, setAddedNotice] = useState(false)
  const [limitWarning, setLimitWarning] = useState(false)

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0)
  const totalCommissionPrice = selectedBase.price + addonsTotal

  const toggleAddon = (item: BuilderResinAddon) => {
    setLimitWarning(false)
    if (selectedAddons.some(i => i.id === item.id)) {
      setSelectedAddons(selectedAddons.filter(i => i.id !== item.id))
    } else {
      if (selectedAddons.length >= 5) {
        setLimitWarning(true)
        return
      }
      setSelectedAddons([...selectedAddons, item])
    }
  }

  const handleFinishCustomSet = () => {
    const colorSummary = chooseColorsOnWhatsApp
      ? 'Customer will choose exact colors, design & style directly on WhatsApp'
      : `Idea saved: ${selectedPalette} · ${selectedPattern} (${selectedMetallic}) — finalized on WhatsApp`

    const bespokeCartItem: CartItem = {
      id: `resin-box-${Date.now()}`,
      type: 'bespoke',
      title: `Custom Gift Box (${selectedBase.name.split('(')[0].trim()})`,
      price: totalCommissionPrice,
      ribbon: colorSummary,
      giftNote: giftNote.trim() || undefined,
      recipientName: recipientName.trim() ? `${recipientName.trim()}${customSong.trim() ? ` · Song: ${customSong.trim()}` : ''}` : undefined,
      boxType: 'Personalized Handcrafted Gift Box',
      includedItems: [selectedBase.name, ...selectedAddons.map(i => i.name)],
      imageUrl: selectedBase.imageUrl
    }

    onAddToCart(bespokeCartItem)
    setAddedNotice(true)
    setTimeout(() => {
      setAddedNotice(false)
      onOpenCart()
    }, 600)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#1B3326] font-semibold flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
          <span>Made with Love · Handcrafted in Nigeria</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#191817] tracking-tight">
          Pack a Box That Makes Them Smile in 3 Easy Steps
        </h1>
        <p className="text-sm sm:text-base text-[#38342F] leading-relaxed">
          Step 1: Pick the main gift that fits their heart. Step 2: Add little matching surprises. Step 3: Tell us their name and what you want to say inside the card. We pack it neatly with a ribbon and deliver the joy right to their door.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-3 max-w-2xl mx-auto border-b border-[#E8E6E1] pb-3 text-center">
        <button
          onClick={() => setCurrentStep(1)}
          className={`pb-2 text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 ${
            currentStep === 1
              ? 'text-[#1B3326] border-b-2 border-[#1B3326]'
              : 'text-[#4A4640] hover:text-[#191817]'
          }`}
        >
          <span className="w-5 h-5 bg-[#F0ECE4] text-[#191817] flex items-center justify-center text-xs font-bold">1</span>
          <span>1. Pick Main Gift</span>
        </button>

        <button
          onClick={() => setCurrentStep(2)}
          className={`pb-2 text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 ${
            currentStep === 2
              ? 'text-[#1B3326] border-b-2 border-[#1B3326]'
              : 'text-[#4A4640] hover:text-[#191817]'
          }`}
        >
          <span className="w-5 h-5 bg-[#F0ECE4] text-[#191817] flex items-center justify-center text-xs font-bold">2</span>
          <span>2. Add Small Items ({selectedAddons.length})</span>
        </button>

        <button
          onClick={() => setCurrentStep(3)}
          className={`pb-2 text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 ${
            currentStep === 3
              ? 'text-[#1B3326] border-b-2 border-[#1B3326]'
              : 'text-[#4A4640] hover:text-[#191817]'
          }`}
        >
          <span className="w-5 h-5 bg-[#F0ECE4] text-[#191817] flex items-center justify-center text-xs font-bold">3</span>
          <span>3. Name, Ribbon &amp; Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Content Area */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-7 border border-[#D8D4CC] shadow-sm">
          {/* STEP 1: CHOOSE MAIN PIECE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
                  Step 1: Choose Your Main Gift Item
                </h3>
                <p className="text-sm text-[#4A4640] mt-1">
                  Each gift is handmade with clear shiny resin and your personalized name or photo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {BUILDER_RESIN_BASES.map((base) => (
                  <div
                    key={base.id}
                    onClick={() => setSelectedBase(base)}
                    className={`border transition-all cursor-pointer flex flex-col justify-between overflow-hidden bg-white ${
                      selectedBase.id === base.id
                        ? 'border-[#1B3326] ring-2 ring-[#1B3326]/20 shadow-md'
                        : 'border-[#D8D4CC] hover:border-[#1B3326]'
                    }`}
                  >
                    <div>
                      <div className="aspect-[4/3] overflow-hidden bg-[#F5F4F0] border-b border-[#E8E6E1]">
                        <ProductImage
                          src={base.imageUrl}
                          alt={base.name}
                          aspectRatio="auto"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h4 className="text-base font-bold text-[#191817]">
                          {base.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4A4640] leading-relaxed">
                          {base.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-3 flex items-center justify-between border-t border-[#F0ECE4]">
                      <span className="font-serif text-lg font-bold text-[#1B3326]">
                        {formatPrice(base.price)}
                      </span>
                      {selectedBase.id === base.id && (
                        <span className="w-6 h-6 bg-[#1B3326] text-white flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3.5 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] flex items-center gap-2"
                >
                  <span>Next: Add Small Matching Items</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE SMALL MATCHING GIFTS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
                    Step 2: Add Matching Small Gifts
                  </h3>
                  <p className="text-sm text-[#4A4640] mt-1">
                    Pick initial keychains, flower bookmarks, drink coasters, resin pens, or fridge magnets to add inside.
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#F5F4F0] text-[#191817] text-xs font-bold border border-[#D8D4CC] self-start sm:self-auto">
                  Selected: {selectedAddons.length}/5
                </span>
              </div>

              {limitWarning && (
                <div className="p-3.5 bg-[#FFF8E6] border border-[#E2B75B] text-xs sm:text-sm text-[#6B4E12] font-medium">
                  You can add up to 5 small extra items in one gift box. Remove one item first if you want to swap it.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BUILDER_RESIN_ADDONS.map((item) => {
                  const isSelected = selectedAddons.some(i => i.id === item.id)
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleAddon(item)}
                      className={`p-3.5 border cursor-pointer transition-all flex items-start gap-3 bg-white ${
                        isSelected
                          ? 'border-[#1B3326] ring-1 ring-[#1B3326] bg-[#F7FAF8]'
                          : 'border-[#D8D4CC] hover:border-[#1B3326]'
                      }`}
                    >
                      {item.imageUrl && (
                        <div className="w-16 h-16 bg-[#F5F4F0] overflow-hidden flex-shrink-0 border border-[#E8E6E1]">
                          <ProductImage
                            src={item.imageUrl}
                            alt={item.name}
                            aspectRatio="auto"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="text-xs uppercase tracking-wider text-[#1B3326] font-bold">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-[#191817] leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#4A4640] line-clamp-2">
                          {item.description}
                        </p>
                        <p className="font-serif text-sm font-bold text-[#1B3326] pt-0.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-[#1B3326] text-white' : 'border border-[#B5B0A6] text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E8E6E1]">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#4A4640] hover:text-[#191817]"
                >
                  &larr; Back to Main Gift
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3.5 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] flex items-center gap-2"
                >
                  <span>Next: Name, Colors &amp; Card Note</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONALIZATION & GREETING */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817]">
                  Step 3: Personalization Details &amp; Card Note
                </h3>
                <p className="text-sm text-[#4A4640] mt-1">
                  Tell us what name, initial, or song to customize on your resin pieces, plus your gift note.
                </p>
              </div>

              {/* Client Color & Design Choice Toggle */}
              <div className="space-y-3 pt-2">
                <div className="p-4 bg-[#F7FAF8] border border-[#C2D8C7] space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1B3326]">
                    How Would You Like to Choose Your Colors &amp; Design?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => setChooseColorsOnWhatsApp(true)}
                      className={`flex-1 py-2.5 px-3 text-xs font-semibold border text-left transition-all ${
                        chooseColorsOnWhatsApp
                          ? 'bg-[#1B3326] text-white border-[#1B3326]'
                          : 'bg-white text-[#191817] border-[#D8D4CC]'
                      }`}
                    >
                      Decide directly with our representative on WhatsApp (Recommended)
                    </button>
                    <button
                      type="button"
                      onClick={() => setChooseColorsOnWhatsApp(false)}
                      className={`flex-1 py-2.5 px-3 text-xs font-semibold border text-left transition-all ${
                        !chooseColorsOnWhatsApp
                          ? 'bg-[#1B3326] text-white border-[#1B3326]'
                          : 'bg-white text-[#191817] border-[#D8D4CC]'
                      }`}
                    >
                      Pick optional color ideas here first
                    </button>
                  </div>
                </div>

                {!chooseColorsOnWhatsApp && (
                  <DesignAndColorPicker
                    previewTitle={recipientName.trim() || selectedBase.name.split('(')[0].trim()}
                    currentConfig={{
                      paletteName: selectedPalette,
                      patternName: selectedPattern,
                      metallicLeaf: selectedMetallic
                    }}
                    onApplyConfig={(cfg: SelectedDesignConfig) => {
                      setChooseColorsOnWhatsApp(false)
                      setSelectedPalette(cfg.paletteName)
                      setSelectedPattern(cfg.patternName)
                      setSelectedMetallic(cfg.metallicLeaf)
                    }}
                  />
                )}
              </div>

              {/* Recipient Name & Letter Initial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E8E6E1]">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#191817]">
                    Recipient Name / Letter Initial
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Dr. Chidi Okonkwo / Tunde & Chinwendu / Letter 'A'"
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#191817]">
                    Favorite Song &amp; Artist / Date (For Plaque)
                  </label>
                  <input
                    type="text"
                    value={customSong}
                    onChange={(e) => setCustomSong(e.target.value)}
                    placeholder="e.g. Chike - Running to You / 18th Nov 2024"
                    className="w-full text-sm px-3 py-2.5 bg-[#FAFAF8] border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326]"
                  />
                </div>
              </div>

              {/* Gift Card Note */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#191817] flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-[#1B3326]" />
                    <span>Free Handwritten Card Note (Included in Gift Box)</span>
                  </label>
                  <span className="text-xs text-[#4A4640] font-medium">{giftNote.length}/250</span>
                </div>
                <CuteMessagePicker
                  onSelectMessage={(msg) => setGiftNote(msg.slice(0, 250))}
                  currentMessage={giftNote}
                />
                <textarea
                  rows={3}
                  maxLength={250}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write what you want us to say, or tap a sweet message above. We will write it neatly on a clean card and place it inside the gift box..."
                  className="w-full text-sm p-3 bg-[#FAFAF8] border border-[#D8D4CC] focus:outline-none focus:border-[#1B3326]"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#E8E6E1]">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#4A4640] hover:text-[#191817]"
                >
                  &larr; Back to Small Items
                </button>
                <button
                  onClick={handleFinishCustomSet}
                  className="px-7 py-3.5 bg-[#1B3326] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#122319] flex items-center gap-2 shadow-sm"
                >
                  <Gift className="w-4 h-4 text-[#C2A264]" />
                  <span>Add Gift Box to Bag • {formatPrice(totalCommissionPrice)}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Running Summary Box */}
        <div className="lg:col-span-4 bg-[#F5F4F0] p-5 sm:p-6 border border-[#D8D4CC] space-y-4 sticky top-28">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#1B3326] font-bold">
              <Gift className="w-3.5 h-3.5 text-[#1B3326]" />
              <span>Your Custom Gift Box</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#191817] mt-0.5">
              Box Summary
            </h4>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#38342F]">
            {/* Base Item */}
            <div className="flex items-start justify-between pb-2.5 border-b border-[#E0DDD7] gap-2">
              <div>
                <span className="font-bold text-[#191817] block">Main Gift</span>
                <span className="text-xs text-[#4A4640]">{selectedBase.name.split('(')[0]}</span>
              </div>
              <span className="font-serif text-base font-bold text-[#191817] shrink-0">{formatPrice(selectedBase.price)}</span>
            </div>

            {/* Selected Addons */}
            <div className="space-y-1.5 pb-2.5 border-b border-[#E0DDD7]">
              <div className="flex justify-between font-bold text-[#191817]">
                <span>Small Extra Items ({selectedAddons.length})</span>
                <span className="font-serif text-base">{formatPrice(addonsTotal)}</span>
              </div>
              {selectedAddons.length === 0 ? (
                <p className="text-xs text-[#4A4640]">No add-ons selected yet</p>
              ) : (
                <ul className="space-y-1.5 pt-1">
                  {selectedAddons.map((item) => (
                    <li key={item.id} className="flex justify-between items-center text-xs">
                      <span className="truncate pr-2 text-[#191817]">{item.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-serif font-semibold text-[#1B3326]">{formatPrice(item.price)}</span>
                        <button
                          onClick={() => toggleAddon(item)}
                          className="text-[#8A4A3E] hover:text-[#5E2B21]"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Theme */}
            <div className="flex justify-between text-xs pb-2.5 border-b border-[#E0DDD7] gap-2">
              <span className="text-[#4A4640] font-semibold">Design &amp; Colors:</span>
              <span className="font-bold text-[#191817] text-right truncate max-w-[180px]">
                {chooseColorsOnWhatsApp ? 'Chosen by you on WhatsApp' : selectedPalette}
              </span>
            </div>

            {/* Total */}
            <div className="pt-1 flex items-center justify-between">
              <span className="font-serif text-base font-bold text-[#191817]">Gift Box Total</span>
              <span className="font-serif text-2xl font-bold text-[#1B3326]">
                {formatPrice(totalCommissionPrice)}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleFinishCustomSet}
              className="w-full py-3.5 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all bg-[#1B3326] text-white hover:bg-[#122319] shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C2A264]" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

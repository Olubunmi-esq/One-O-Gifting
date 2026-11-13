import React, { useState } from 'react'
import { Sparkles, Check, Palette, Layers, Box, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react'

export interface CustomizationSelection {
  palette: {
    id: string
    name: string
    gradientCss: string
    primaryColor: string
    accentColor: string
    vibe: string
    description: string
  }
  resinEffect: {
    id: string
    name: string
    icon: string
    tagline: string
    description: string
  }
  baseMaterial: {
    id: string
    name: string
    icon: string
    tagline: string
    description: string
  }
  customNote?: string
}

export const COLOR_PALETTES = [
  {
    id: 'emerald-gold',
    name: 'Royal Emerald & 24k Gold',
    primaryColor: '#1B3326',
    accentColor: '#D4AF37',
    gradientCss: 'linear-gradient(135deg, #0D1F15 0%, #1B3326 45%, #2A5A3D 75%, #D4AF37 100%)',
    vibe: 'Rich · Bold · #1 Bestseller',
    description: 'Deep forest green swirls with suspended 24k gold leaf veins. Our signature finish for executive gifts, clocks & hampers.'
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Noir & 24k Gold',
    primaryColor: '#161514',
    accentColor: '#D4AF37',
    gradientCss: 'linear-gradient(135deg, #0A0A09 0%, #1A1817 50%, #302B27 75%, #D4AF37 100%)',
    vibe: 'Modern Luxury · Boardroom Ready',
    description: 'Smoky volcanic black onyx resin with brilliant gilded gold borders and liquid gold flakes.'
  },
  {
    id: 'pearl-rose',
    name: 'Pearl White & Rose Gold',
    primaryColor: '#F7F6F2',
    accentColor: '#B76E79',
    gradientCss: 'linear-gradient(135deg, #FFFFFF 0%, #F5F1EB 40%, #EAD8D4 70%, #B76E79 100%)',
    vibe: 'Romantic · Delicate · Weddings',
    description: 'Silky iridescent pearl white with tender blush swirls and soft rose-gold metallic leaf.'
  },
  {
    id: 'lagos-ocean',
    name: 'Lagos Ocean Surf & Turquoise',
    primaryColor: '#0F3846',
    accentColor: '#20B2AA',
    gradientCss: 'linear-gradient(135deg, #092028 0%, #0F3846 40%, #20B2AA 70%, #E0F2F1 100%)',
    vibe: 'Coastal Fresh · Artistic Flow',
    description: 'Tropical marine blue and turquoise waters meeting crisp seafoam lacing.'
  },
  {
    id: 'festive-crimson',
    name: 'Festive Crimson & Champagne',
    primaryColor: '#6B1D1D',
    accentColor: '#E5C07B',
    gradientCss: 'linear-gradient(135deg, #420E0E 0%, #6B1D1D 40%, #9E2A2B 70%, #E5C07B 100%)',
    vibe: 'December Festive · Celebratory',
    description: 'Warm holiday wine-red with sparkling champagne shimmer and floating micro-gold flakes.'
  },
  {
    id: 'sahel-sunset',
    name: 'Sahel Sunset Amber & Bronze',
    primaryColor: '#8A3B14',
    accentColor: '#F59E0B',
    gradientCss: 'linear-gradient(135deg, #572007 0%, #8A3B14 40%, #D97706 70%, #F59E0B 100%)',
    vibe: 'Warm Glow · African Golden Hour',
    description: 'Radiant terracotta amber fading into golden bronze soundwaves.'
  },
  {
    id: 'royal-sapphire',
    name: 'Royal Sapphire & Sterling Silver',
    primaryColor: '#112244',
    accentColor: '#E2E8F0',
    gradientCss: 'linear-gradient(135deg, #081224 0%, #112244 45%, #1E40AF 75%, #E2E8F0 100%)',
    vibe: 'Regal · Crisp · Classic',
    description: 'Midnight navy blue with cobalt ribbons and starlight silver leaf flakes.'
  },
  {
    id: 'custom-asoebi',
    name: 'Custom Aso-Ebi / Brand Colors',
    primaryColor: '#4B3F72',
    accentColor: '#C2A264',
    gradientCss: 'linear-gradient(135deg, #282142 0%, #4B3F72 50%, #C2A264 100%)',
    vibe: '100% Custom Event Matching',
    description: 'We blend pigments to match your exact wedding fabric or company corporate identity.'
  }
]

export const RESIN_EFFECTS = [
  {
    id: 'gold-flakes',
    name: '24k Floating Gold Flakes',
    icon: '✨',
    tagline: 'Hand-scattered pure metallic gold luster',
    description: 'Real metallic gold leaf flakes floating in crystal-clear layers that catch the room lighting and shine like jewelry.'
  },
  {
    id: 'pressed-flowers',
    name: 'Real Pressed Bougainvillea & Rose Flowers',
    icon: '🌸',
    tagline: 'Real dried petals sealed forever',
    description: 'Hand-picked Nigerian petals and delicate blooms kept bright and fresh forever inside crystal-clear resin so the memory never fades.'
  },
  {
    id: 'rose-gold-foil',
    name: 'Soft Rose Gold & Copper Shimmer',
    icon: '💖',
    tagline: 'Warm blush sparkle made for love gifts',
    description: 'Gentle rose-toned flakes that give a tender, affectionate glow in any light—perfect for anniversaries, birthdays, and romance.'
  },
  {
    id: 'ocean-foam',
    name: 'Ocean Waves & White Seafoam',
    icon: '🌊',
    tagline: 'Peaceful layered ocean ripples',
    description: 'Rich blue water tones topped with soft white waves that bring a calm, joyful coastal feel to any table.'
  },
  {
    id: 'smoky-marble',
    name: 'Soft Marble & Gold Swirls',
    icon: '🌪️',
    tagline: 'Dreamy swirls with warm gold veins',
    description: 'Smooth clouds of pearl and deep color gently swirled by hand with gold leaf to make any leader or mentor feel proud.'
  },
  {
    id: 'pure-clear',
    name: 'Glass-Clear Crystal Finish',
    icon: '💎',
    tagline: 'Smooth mirror-clear shine with no bubbles',
    description: 'Pure clear crystal finish that looks like real glass and lets their name or special message float cleanly inside.'
  }
]

export const BASE_MATERIALS = [
  {
    id: 'solid-epoxy',
    name: 'Solid Crystal-Clear Cast',
    icon: '🏛️',
    tagline: 'Substantial, smooth-edged solid feel',
    description: 'Hand-poured solid resin with smooth beveled edges. Feels weighty, cool, and reassuringly special the moment they hold it.'
  },
  {
    id: 'live-edge-acacia',
    name: 'Warm Natural Wood & Clear River',
    icon: '🪵',
    tagline: 'Real wood grain joined with glossy color',
    description: 'Warm natural hardwood showing organic edge grain, finished smooth and food-safe alongside a glowing stream of color.'
  },
  {
    id: 'reclaimed-teak',
    name: 'Golden Nigerian Teak Wood',
    icon: '🪵',
    tagline: 'Rich, long-lasting golden wood',
    description: 'Warm golden-brown teak loved for its natural glow and strength against everyday kitchen splashes, ideal for family serving boards.'
  },
  {
    id: 'warm-led-wood',
    name: 'Smooth Beechwood Stand with Warm Light',
    icon: '💡',
    tagline: 'Cozy soft evening glow stand',
    description: 'Smooth natural wood base with a gentle warm night light, simple USB cable, and easy switch for comforting bedtime smiles.'
  },
  {
    id: 'brass-hardware',
    name: 'Brushed Brass & Gold-Tone Fittings',
    icon: '🪙',
    tagline: 'Bright, lasting gold-tone details',
    description: 'Smooth gold-tone clock hands, sturdy tray handles, and strong keyrings chosen so every gift keeps its shine for years.'
  }
]

interface CustomizationPanelProps {
  onApply: (selection: CustomizationSelection) => void
  initialPaletteId?: string
  initialEffectId?: string
  initialBaseMaterialId?: string
  recipientName?: string
  productTitle?: string
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  onApply,
  initialPaletteId,
  initialEffectId,
  initialBaseMaterialId,
  recipientName = '',
  productTitle = 'Personalized Resin Gift'
}) => {
  const [selectedPalette, setSelectedPalette] = useState(
    COLOR_PALETTES.find((p) => p.id === initialPaletteId) || COLOR_PALETTES[0]
  )
  const [selectedEffect, setSelectedEffect] = useState(
    RESIN_EFFECTS.find((e) => e.id === initialEffectId) || RESIN_EFFECTS[0]
  )
  const [selectedBaseMaterial, setSelectedBaseMaterial] = useState(
    BASE_MATERIALS.find((m) => m.id === initialBaseMaterialId) || BASE_MATERIALS[0]
  )
  const [customNote, setCustomNote] = useState('')
  const [applied, setApplied] = useState(false)

  const handleApply = () => {
    onApply({
      palette: selectedPalette,
      resinEffect: selectedEffect,
      baseMaterial: selectedBaseMaterial,
      customNote: customNote.trim() ? customNote.trim() : undefined
    })
    setApplied(true)
    setTimeout(() => setApplied(false), 2000)
  }

  return (
    <div className="space-y-6 bg-white border border-[#E8E6E1] p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0ECE4] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1B3326] font-bold">
            <Palette className="w-3.5 h-3.5 text-[#C2A264]" />
            <span>Custom Color &amp; Finish Picker</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191817] mt-0.5">
            Optional Style Ideas (Final Colors Confirmed on WhatsApp)
          </h3>
          <p className="text-xs text-[#38342F] mt-1">
            Look through sample color and finish ideas below if you want inspiration—or leave everything open and decide your exact colors and design with our representative on WhatsApp.
          </p>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="px-5 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
        >
          {applied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-200">Applied to Item!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#C2A264]" />
              <span>Apply This Customization</span>
            </>
          )}
        </button>
      </div>

      {/* SECTION 1: COLOR PALETTE SELECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider font-bold text-[#191817] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#1B3326] text-white flex items-center justify-center text-xs font-bold">1</span>
            <span>Pick Resin Color</span>
          </label>
          <span className="text-xs font-semibold text-[#1B3326]">
            Chosen: {selectedPalette.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = selectedPalette.id === palette.id
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => setSelectedPalette(palette)}
                className={`p-3 text-left border transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                    : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                }`}
              >
                {/* Visual Swatch Strip */}
                <div
                  className="w-full h-9 border border-black/10 shadow-inner flex items-center justify-end pr-1.5 mb-2 relative overflow-hidden"
                  style={{ background: palette.gradientCss }}
                >
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-white text-[#1B3326] flex items-center justify-center shadow">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#191817] leading-tight">
                    {palette.name}
                  </p>
                  <p className="text-xs text-[#4A4640] mt-0.5 line-clamp-1">
                    {palette.vibe}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {selectedPalette.id === 'custom-asoebi' && (
          <div className="p-3 bg-[#FAF9F5] border border-[#C2A264]/60 space-y-1.5 text-xs animate-in fade-in">
            <span className="font-semibold text-[#1B3326] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Describe Your Wedding or Company Color Match:</span>
            </span>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Sage Green and Champagne Gold, matching our family fabric"
              className="w-full px-3 py-2 bg-white border border-[#D5D2CB] text-sm text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>
        )}
      </div>

      {/* SECTION 2: RESIN EFFECT SELECTION */}
      <div className="space-y-3 pt-3 border-t border-[#F0ECE4]">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider font-bold text-[#191817] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#1B3326] text-white flex items-center justify-center text-xs font-bold">2</span>
            <span>Pick Sparkle &amp; Shine Style</span>
          </label>
          <span className="text-xs font-semibold text-[#1B3326]">
            Chosen: {selectedEffect.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {RESIN_EFFECTS.map((effect) => {
            const isSelected = selectedEffect.id === effect.id
            return (
              <button
                key={effect.id}
                type="button"
                onClick={() => setSelectedEffect(effect)}
                className={`p-3 text-left border transition-all relative ${
                  isSelected
                    ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                    : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{effect.icon}</span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#191817]">{effect.name}</h5>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-[#1B3326] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#1B3326] font-medium mt-1">{effect.tagline}</p>
                <p className="text-xs text-[#38342F] mt-1 leading-relaxed">{effect.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* SECTION 3: BASE MATERIAL SELECTION */}
      <div className="space-y-3 pt-3 border-t border-[#F0ECE4]">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider font-bold text-[#191817] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#1B3326] text-white flex items-center justify-center text-xs font-bold">3</span>
            <span>Pick Base Material &amp; Stand</span>
          </label>
          <span className="text-xs font-semibold text-[#1B3326]">
            Chosen: {selectedBaseMaterial.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {BASE_MATERIALS.map((material) => {
            const isSelected = selectedBaseMaterial.id === material.id
            return (
              <button
                key={material.id}
                type="button"
                onClick={() => setSelectedBaseMaterial(material)}
                className={`p-3 text-left border transition-all relative ${
                  isSelected
                    ? 'border-[#1B3326] bg-[#F7FAF8] ring-1 ring-[#1B3326]'
                    : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{material.icon}</span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#191817]">{material.name}</h5>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-[#1B3326] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#1B3326] font-medium mt-1">{material.tagline}</p>
                <p className="text-xs text-[#38342F] mt-1 leading-relaxed">{material.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* LIVE INTERACTIVE SIMULATOR CARD */}
      <div className="p-4 bg-[#FAF9F5] border border-[#DDD8CE] space-y-3 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1B3326] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
            <span>Live Color Preview</span>
          </span>
          <span className="text-xs text-[#4A4640]">Updates as you pick</span>
        </div>

        {/* Mockup Card */}
        <div
          className="relative h-36 sm:h-40 w-full rounded border border-black/15 shadow-md overflow-hidden flex flex-col justify-between p-4 text-white"
          style={{ background: selectedPalette.gradientCss }}
        >
          {/* Subtle Radial Glare */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/25 via-transparent to-black/35 pointer-events-none" />

          {/* Top Bar Badges */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 bg-black/50 backdrop-blur-sm text-xs uppercase tracking-wider font-semibold border border-white/20">
              {selectedEffect.name}
            </span>
            <span className="text-xs text-amber-200 font-medium drop-shadow flex items-center gap-1">
              <span>{selectedBaseMaterial.icon}</span>
              <span className="truncate max-w-[150px]">{selectedBaseMaterial.name.split(' ')[0]}</span>
            </span>
          </div>

          {/* Center Personalized Text */}
          <div className="relative z-10 text-center space-y-0.5">
            <p className="font-serif text-lg sm:text-2xl font-bold tracking-tight drop-shadow-lg text-white truncate">
              {recipientName.trim() || productTitle}
            </p>
            <p className="text-xs text-white/95 drop-shadow">
              Handmade in Nigeria · 100% Poured by Hand
            </p>
          </div>

          {/* Bottom Bar Info */}
          <div className="relative z-10 flex items-center justify-between text-xs text-white/90 border-t border-white/15 pt-1.5">
            <span className="truncate">Color: {selectedPalette.name}</span>
            <span className="truncate">Base: {selectedBaseMaterial.name.split(' ')[0]}</span>
          </div>
        </div>

        {/* Footer Summary & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-[#38342F] text-center sm:text-left">
            <span className="font-bold text-[#191817]">Your Choices: </span>
            {selectedPalette.name} + {selectedEffect.name} + {selectedBaseMaterial.name}
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            {applied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-200">Applied to Item!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                <span>Apply This Customization</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomizationPanel

import React, { useState } from 'react'
import { Sparkles, Check, Palette, Eye, Sliders, Layers, RefreshCw } from 'lucide-react'

export interface SelectedDesignConfig {
  paletteName: string
  primaryColor: string
  secondaryColor: string
  metallicLeaf: string
  patternName: string
  patternStyle: string
  customNotes?: string
  previewGradientCss: string
}

export const CURATED_COLOR_COMBINATIONS = [
  {
    id: 'emerald-gold',
    name: 'Royal Emerald & 24k Gold',
    primary: '#1B3326',
    secondary: '#2E6647',
    metallic: '24k Gold Leaf Flakes',
    gradient: 'linear-gradient(135deg, #0F2318 0%, #1B3326 40%, #2E6647 70%, #D4AF37 100%)',
    description: 'Lush Nigerian emerald green swirls with brilliant 24k gold leaf veins. Our #1 bestseller for executive gifts, clocks & festive hampers.',
    vibe: 'Rich · Classic · Timeless'
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Noir & Liquid Gold',
    primary: '#161514',
    secondary: '#332E2A',
    metallic: '24k Gold Leaf Flakes',
    gradient: 'linear-gradient(135deg, #11100F 0%, #221F1C 45%, #3D3732 75%, #D4AF37 100%)',
    description: 'Deep smoky midnight black onyx resin paired with radiant hand-gilded gold borders.',
    vibe: 'Modern Luxury · Dignified · Boardroom'
  },
  {
    id: 'pearl-rose',
    name: 'Pearl White & Rose Gold',
    primary: '#F7F6F2',
    secondary: '#E8D3CE',
    metallic: 'Gilded Rose Gold Foil',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F1EB 35%, #E8D3CE 70%, #B76E79 100%)',
    description: 'Silky iridescent white pearl with gentle blush swirls and rose gold flecks. Perfect for bridal showers & wedding memories.',
    vibe: 'Romantic · Delicate · Pure'
  },
  {
    id: 'ocean-turquoise',
    name: 'Lagos Ocean Blue & Seafoam',
    primary: '#0F3846',
    secondary: '#20B2AA',
    metallic: 'Pearlescent Silver Dust',
    gradient: 'linear-gradient(135deg, #0A2630 0%, #0F3846 40%, #20B2AA 70%, #E0F2F1 100%)',
    description: 'Vibrant turquoise waters meeting crisp white seafoam lacing. Stunning on kitchen charcuterie boards & serving trays.',
    vibe: 'Fresh · Coastal · Artistic'
  },
  {
    id: 'festive-crimson',
    name: 'Festive Crimson & Champagne',
    primary: '#6B1D1D',
    secondary: '#9E2A2B',
    metallic: 'Champagne Shimmer Flecks',
    gradient: 'linear-gradient(135deg, #4A1212 0%, #6B1D1D 40%, #9E2A2B 70%, #E5C07B 100%)',
    description: 'Warm holiday wine-red with champagne gold sparkle. Our favorite December color mix.',
    vibe: 'Festive · Warm · Celebratory'
  },
  {
    id: 'sunset-amber',
    name: 'Sahel Sunset Amber & Bronze',
    primary: '#8A3B14',
    secondary: '#D97706',
    metallic: '24k Gold Leaf Flakes',
    gradient: 'linear-gradient(135deg, #5C2209 0%, #8A3B14 40%, #D97706 70%, #F59E0B 100%)',
    description: 'Warm African golden hour colors fading from burnt terracotta amber into radiant sunset yellow.',
    vibe: 'Earthy · Energetic · Golden Hour'
  },
  {
    id: 'royal-sapphire',
    name: 'Royal Sapphire & Sterling Silver',
    primary: '#112244',
    secondary: '#1D4ED8',
    metallic: 'Sterling Silver Leaf',
    gradient: 'linear-gradient(135deg, #0A1428 0%, #112244 45%, #1D4ED8 75%, #E2E8F0 100%)',
    description: 'Midnight navy blue with electric cobalt veins and sparkling silver leaf flakes.',
    vibe: 'Regal · Bold · Modern'
  },
  {
    id: 'custom-asoebi',
    name: 'Custom Aso-Ebi / Event Palette',
    primary: '#4B3F72',
    secondary: '#1F2041',
    metallic: 'Your Choice of Metallic Leaf',
    gradient: 'linear-gradient(135deg, #242038 0%, #4B3F72 50%, #8D86C9 100%)',
    description: 'We match your exact wedding fabric or company brand colors! Tell us your two colors or send a photo.',
    vibe: '100% Custom · Match Your Outfit'
  }
]

export const DESIGN_PATTERNS = [
  {
    id: 'geode-crystal',
    name: 'Crystal Edge with Gold Rim',
    icon: '💎',
    subtitle: 'Natural crystal edges painted in warm 24k gold',
    description: 'Hand-shaped edges kissed with shimmering 24k gold leaf that catch the light and make everyday tables feel special.',
    bestFor: 'Coasters, vanity trays, clocks, ring dishes'
  },
  {
    id: 'botanical-flowers',
    name: 'Real Pressed Flowers',
    icon: '🌸',
    subtitle: 'Real dried blooms frozen forever in clear crystal',
    description: 'Real Nigerian pink petals, baby’s breath, and soft greens preserved inside clear glass-like resin so their beauty never fades.',
    bestFor: 'Bookmarks, pens, phone stands, flower pyramids'
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves & Seafoam',
    icon: '🌊',
    subtitle: 'Layered white seafoam over deep blue water',
    description: 'Swirling ocean-blue waves and soft white foam that bring peaceful beach calm right to their dining or kitchen table.',
    bestFor: 'Charcuterie boards, kitchen paddles, island platters'
  },
  {
    id: 'smoky-marble',
    name: 'Soft Cloud & Marble Swirls',
    icon: '🌪️',
    subtitle: 'Gentle floating color clouds with gold veins',
    description: 'Dreamy swirls of rich color and shimmering gold leaf floating together for a timeless, calm, and thoughtful look.',
    bestFor: 'Desk nameplates, clocks, VIP gift boxes'
  },
  {
    id: 'river-wood',
    name: 'Natural Wood & River Flow',
    icon: '🪵',
    subtitle: 'Warm natural hardwood joined by a glowing color stream',
    description: 'Real natural wood brought together with a smooth, glossy stream of color flowing down the middle for cozy home gatherings.',
    bestFor: 'River boards, lazy susans, desk gifts'
  },
  {
    id: 'minimalist-clear',
    name: 'Crystal Clear with Floating Gold',
    icon: '✨',
    subtitle: 'Glass-clear finish that lets names and photos shine',
    description: 'Super clear, smooth-as-glass finish with floating gold flakes so their name, message, or treasured photo stands out beautifully.',
    bestFor: 'Photo plaques, LED night lamps, desk blocks'
  }
]

export const METALLIC_LEAF_CHOICES = [
  { id: 'gold', name: '24k Gold Leaf Flakes', color: '#D4AF37' },
  { id: 'rose-gold', name: 'Rose Gold Foil', color: '#B76E79' },
  { id: 'silver', name: 'Sterling Silver Dust', color: '#C0C0C0' },
  { id: 'none', name: 'Pure Gloss (No Metallics)', color: '#FFFFFF' }
]

interface DesignAndColorPickerProps {
  onApplyConfig?: (config: SelectedDesignConfig) => void
  currentConfig?: Partial<SelectedDesignConfig>
  compact?: boolean
  className?: string
  previewTitle?: string
}

export const DesignAndColorPicker: React.FC<DesignAndColorPickerProps> = ({
  onApplyConfig,
  currentConfig,
  compact = false,
  className = '',
  previewTitle = 'Dr. Chidi Okonkwo · Managing Director'
}) => {
  const [selectedPalette, setSelectedPalette] = useState(
    CURATED_COLOR_COMBINATIONS.find(c => c.name === currentConfig?.paletteName) || CURATED_COLOR_COMBINATIONS[0]
  )
  const [selectedPattern, setSelectedPattern] = useState(
    DESIGN_PATTERNS.find(p => p.name === currentConfig?.patternName) || DESIGN_PATTERNS[0]
  )
  const [selectedMetallic, setSelectedMetallic] = useState(
    currentConfig?.metallicLeaf || '24k Gold Leaf Flakes'
  )
  const [customColorNotes, setCustomColorNotes] = useState(currentConfig?.customNotes || '')
  const [appliedNotice, setAppliedNotice] = useState(false)

  const handleApply = () => {
    const config: SelectedDesignConfig = {
      paletteName: selectedPalette.name,
      primaryColor: selectedPalette.primary,
      secondaryColor: selectedPalette.secondary,
      metallicLeaf: selectedMetallic,
      patternName: selectedPattern.name,
      patternStyle: selectedPattern.subtitle,
      customNotes: customColorNotes.trim() ? customColorNotes.trim() : undefined,
      previewGradientCss: selectedPalette.gradient
    }
    if (onApplyConfig) {
      onApplyConfig(config)
      setAppliedNotice(true)
      setTimeout(() => setAppliedNotice(false), 2500)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Step 1: Color Combination Chooser */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#C2A264]" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
              1. Optional Color Ideas (Or Tell Us Your Own on WhatsApp)
            </h4>
          </div>
          <span className="text-xs text-[#4A4640]">Optional Sample Colors</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CURATED_COLOR_COMBINATIONS.map((c) => {
            const isSelected = selectedPalette.id === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedPalette(c)}
                className={`p-2.5 text-left border rounded-none transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-[#1B3326] bg-[#FAF9F5] ring-1 ring-[#1B3326]'
                    : 'border-[#DDD8CE] bg-white hover:border-[#1B3326]/50'
                }`}
              >
                {/* Visual Color Pill */}
                <div
                  className="w-full h-8 border border-black/10 shadow-inner flex items-center justify-end pr-1.5 mb-2 relative overflow-hidden"
                  style={{ background: c.gradient }}
                >
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-white text-[#1B3326] flex items-center justify-center shadow">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#191817] leading-tight">{c.name}</p>
                  <p className="text-xs text-[#4A4640] mt-0.5 line-clamp-1">{c.vibe}</p>
                </div>
              </button>
            )
          })}
        </div>

        {selectedPalette.id === 'custom-asoebi' && (
          <div className="p-3 bg-[#FAF9F5] border border-[#C2A264]/60 space-y-2 text-xs">
            <p className="font-semibold text-[#1B3326] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Describe Your Custom Wedding / Brand Colors:</span>
            </p>
            <input
              type="text"
              value={customColorNotes}
              onChange={(e) => setCustomColorNotes(e.target.value)}
              placeholder="e.g. Sage Green and Champagne Gold, matching our Lagos party fabric"
              className="w-full px-3 py-2 bg-white border border-[#D5D2CB] text-sm text-[#191817] focus:outline-none focus:border-[#1B3326]"
            />
          </div>
        )}
      </div>

      {/* Step 2: Design Pattern / Aesthetic Style */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C2A264]" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#191817]">
              2. Optional Design Style Ideas (Confirmed on WhatsApp)
            </h4>
          </div>
          <span className="text-xs text-[#4A4640]">6 Optional Styles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {DESIGN_PATTERNS.map((p) => {
            const isSelected = selectedPattern.id === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPattern(p)}
                className={`p-3 text-left border transition-all relative ${
                  isSelected
                    ? 'border-[#1B3326] bg-[#FAF9F5] ring-1 ring-[#1B3326]'
                    : 'border-[#DDD8CE] bg-white hover:border-[#1B3326]/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{p.icon}</span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#191817]">{p.name}</h5>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-[#1B3326] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#38342F] mt-1.5 leading-relaxed">{p.description}</p>
                <p className="text-xs text-[#4A4640] mt-2 font-medium">
                  <span className="text-[#1B3326]">Great for: </span>
                  {p.bestFor}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 3: Gold, Silver & Rose Flakes */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider font-bold text-[#191817]">
          3. Shiny Flakes Inside (Gold, Silver or Rose)
        </label>
        <div className="flex flex-wrap gap-2">
          {METALLIC_LEAF_CHOICES.map((m) => {
            const isSelected = selectedMetallic === m.name
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMetallic(m.name)}
                className={`px-3 py-1.5 text-xs border flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'border-[#1B3326] bg-[#1B3326] text-white font-semibold'
                    : 'border-[#D5D2CB] bg-white text-[#38342F] hover:border-[#1B3326]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: m.color }}
                />
                <span>{m.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 4: Live Simulated Resin Piece Visualizer */}
      <div className="p-4 bg-[#FAF9F5] border border-[#DDD8CE] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1B3326] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#C2A264]" />
            <span>Live Color Preview</span>
          </span>
          <span className="text-xs text-[#4A4640]">Simulated handmade pour</span>
        </div>

        {/* Live Simulation Card */}
        <div
          className="relative h-32 sm:h-36 w-full rounded border border-black/15 shadow-md overflow-hidden flex flex-col justify-between p-4 text-white"
          style={{ background: selectedPalette.gradient }}
        >
          {/* Metallic Leaf Sparkle Overlay Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-xs uppercase tracking-wider font-semibold border border-white/20">
              {selectedPattern.name}
            </span>
            <span className="text-xs text-amber-200 font-medium drop-shadow">
              ✨ {selectedMetallic}
            </span>
          </div>

          <div className="relative z-10 text-center">
            <p className="font-serif text-lg sm:text-xl font-bold tracking-tight drop-shadow-lg text-white">
              {previewTitle}
            </p>
            <p className="text-xs text-white/95 drop-shadow">
              Handmade in Nigeria · Custom Color Pour
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
            <span>Color: {selectedPalette.name}</span>
            <span>Style: {selectedPattern.subtitle.split('&')[0]}</span>
          </div>
        </div>

        {/* Summary Pill & Apply Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-[#38342F] text-center sm:text-left">
            <span className="font-semibold text-[#191817]">Your Choice: </span>
            {selectedPalette.name} · {selectedPattern.name} · {selectedMetallic}
            {customColorNotes && ` (${customColorNotes})`}
          </div>

          {onApplyConfig && (
            <button
              type="button"
              onClick={handleApply}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#1B3326] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#122319] transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              {appliedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-200">Applied to Order!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
                  <span>Apply This Design To Item</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default DesignAndColorPicker

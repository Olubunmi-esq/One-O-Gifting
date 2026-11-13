import React, { useState } from 'react'
import { Sparkles, Heart, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { CUTE_GIFT_MESSAGES, CuteMessage } from '../data/cuteMessages'

interface CuteMessagePickerProps {
  onSelectMessage: (messageText: string) => void
  currentMessage?: string
}

export const CuteMessagePicker: React.FC<CuteMessagePickerProps> = ({
  onSelectMessage,
  currentMessage = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const categories = [
    'All',
    'Christmas & December',
    'Birthday',
    'Love & Romance',
    'Appreciation & Thanks',
    'Big Wins & Success',
    'Sweet & Everyday'
  ]

  const filteredMessages =
    activeCategory === 'All'
      ? CUTE_GIFT_MESSAGES
      : CUTE_GIFT_MESSAGES.filter((m) => m.category === activeCategory)

  const handlePick = (msg: CuteMessage) => {
    setSelectedId(msg.id)
    onSelectMessage(msg.text)
    setFeedback(`Selected: "${msg.title}"!`)
    setTimeout(() => {
      setFeedback(null)
      setIsOpen(false)
    }, 1100)
  }

  return (
    <div className="space-y-2 my-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3326] bg-[#F4F8F5] hover:bg-[#E8F2EB] border border-[#C2D8C7] px-3 py-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C2A264]" />
          <span>✨ Don&apos;t know what to write? Pick a sweet ready-made message!</span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#1B3326]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#1B3326]" />
          )}
        </button>

        {feedback && (
          <span className="text-xs text-emerald-800 font-bold bg-[#D4E8DA] px-2.5 py-0.5 animate-in fade-in">
            ✓ Card Note Filled!
          </span>
        )}
      </div>

      {isOpen && (
        <div className="p-3.5 bg-[#FAF9F6] border border-[#DDD8CE] space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-2">
            <span className="text-xs font-bold text-[#191817] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#C2A264]" />
              <span>Tap any sweet message to put it on the gift card:</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#4A4640] hover:text-[#191817] text-xs p-1"
              aria-label="Close message picker"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-2.5 py-1 transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1B3326] text-white shadow-xs'
                    : 'bg-white border border-[#DDD8CE] text-[#38342F] hover:border-[#191817]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cute Messages Cards */}
          <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
            {filteredMessages.map((msg) => {
              const isSelected = selectedId === msg.id || currentMessage === msg.text
              return (
                <div
                  key={msg.id}
                  onClick={() => handlePick(msg)}
                  className={`p-3 text-left border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1B3326] bg-[#F5F8F6] ring-1 ring-[#1B3326]'
                      : 'border-[#DDD8CE] bg-white hover:border-[#8C8881]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-[#191817]">
                      {msg.title}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#1B3326] bg-[#E8F3EB] px-2 py-0.5">
                      {msg.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                    "{msg.text}"
                  </p>
                  <div className="pt-2 mt-1.5 flex justify-end border-t border-[#F5F3EF]">
                    <span
                      className={`text-xs font-bold inline-flex items-center gap-1 ${
                        isSelected ? 'text-[#1B3326]' : 'text-[#4A4640]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1B3326]" />
                          <span>Selected for Card</span>
                        </>
                      ) : (
                        <span>Tap to use this &rarr;</span>
                      )}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

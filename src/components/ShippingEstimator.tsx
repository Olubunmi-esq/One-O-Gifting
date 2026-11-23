import React, { useState } from 'react'
import { Truck } from 'lucide-react'

export interface NigeriaShippingRegion {
  id: string
  label: string
  shortLabel: string
  minTransitDays: number
  maxTransitDays: number
  method: string
}

export const NIGERIA_SHIPPING_REGIONS: NigeriaShippingRegion[] = [
  {
    id: 'lagos',
    label: 'Lagos (Island & Mainland)',
    shortLabel: 'Lagos',
    minTransitDays: 1,
    maxTransitDays: 2,
    method: 'Express doorstep courier'
  },
  {
    id: 'south-west',
    label: 'South West (Oyo, Ogun, Osun, Ondo, Ekiti)',
    shortLabel: 'South West',
    minTransitDays: 1,
    maxTransitDays: 3,
    method: 'Regional courier delivery'
  },
  {
    id: 'abuja-nc',
    label: 'Abuja FCT & North Central',
    shortLabel: 'Abuja / North Central',
    minTransitDays: 2,
    maxTransitDays: 3,
    method: 'Express interstate courier'
  },
  {
    id: 'south-south',
    label: 'South South (Rivers, Delta, Edo, Akwa Ibom)',
    shortLabel: 'South South',
    minTransitDays: 2,
    maxTransitDays: 4,
    method: 'Insured interstate courier'
  },
  {
    id: 'south-east',
    label: 'South East (Enugu, Anambra, Imo, Abia, Ebonyi)',
    shortLabel: 'South East',
    minTransitDays: 2,
    maxTransitDays: 4,
    method: 'Insured interstate courier'
  },
  {
    id: 'north-west',
    label: 'North West (Kano, Kaduna, Katsina, Sokoto)',
    shortLabel: 'North West',
    minTransitDays: 3,
    maxTransitDays: 5,
    method: 'Insured interstate logistics'
  },
  {
    id: 'north-east',
    label: 'North East (Bauchi, Gombe, Adamawa, Borno)',
    shortLabel: 'North East',
    minTransitDays: 3,
    maxTransitDays: 5,
    method: 'Insured interstate logistics'
  }
]

const STORAGE_KEY = 'oneo_nigeria_shipping_region'

function addBusinessDays(start: Date, businessDays: number): Date {
  const result = new Date(start)
  let added = 0
  while (added < businessDays) {
    result.setDate(result.getDate() + 1)
    const day = result.getDay()
    if (day !== 0 && day !== 6) {
      added += 1
    }
  }
  return result
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric'
  })
}

interface ShippingEstimatorProps {
  isBulkOrQuote?: boolean
  minOrderQty?: number
}

export const ShippingEstimator: React.FC<ShippingEstimatorProps> = ({
  isBulkOrQuote = false,
  minOrderQty
}) => {
  const [regionId, setRegionId] = useState<string>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved && NIGERIA_SHIPPING_REGIONS.some((r) => r.id === saved)) {
        return saved
      }
    } catch {
      // Ignore storage access errors
    }
    return 'lagos'
  })

  const activeRegion =
    NIGERIA_SHIPPING_REGIONS.find((r) => r.id === regionId) ||
    NIGERIA_SHIPPING_REGIONS[0]

  const handleRegionChange = (nextId: string) => {
    setRegionId(nextId)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextId)
    } catch {
      // Ignore storage access errors
    }
  }

  // Handcrafted curing & personalization lead time
  const isLargeBatch = Boolean(minOrderQty && minOrderQty >= 20)
  const craftMinDays = isLargeBatch ? 5 : isBulkOrQuote ? 3 : 2
  const craftMaxDays = isLargeBatch ? 7 : isBulkOrQuote ? 5 : 3

  const totalMinDays = craftMinDays + activeRegion.minTransitDays
  const totalMaxDays = craftMaxDays + activeRegion.maxTransitDays

  const today = new Date()
  const earliestDate = addBusinessDays(today, totalMinDays)
  const latestDate = addBusinessDays(today, totalMaxDays)

  return (
    <div
      aria-label="Nigeria delivery estimator"
      className="mt-4 p-3 bg-white border border-[#E5E2DC] space-y-2"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191817]">
          <Truck className="w-3.5 h-3.5 text-[#1B3326] shrink-0" />
          <span>Delivery Estimate</span>
        </div>
        <span className="text-xs font-bold text-[#1B3326] tabular-nums whitespace-nowrap">
          {totalMinDays}–{totalMaxDays} business days
        </span>
      </div>

      <select
        value={regionId}
        onChange={(e) => handleRegionChange(e.target.value)}
        aria-label="Select your region in Nigeria"
        className="w-full py-1.5 px-2.5 text-xs bg-[#FAF9F5] border border-[#DDD8CE] text-[#191817] focus:outline-none focus:border-[#1B3326] cursor-pointer"
      >
        {NIGERIA_SHIPPING_REGIONS.map((region) => (
          <option key={region.id} value={region.id}>
            {region.label}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-between gap-2 text-[11px] text-[#57534D] leading-snug">
        <span>
          Est. arrival:{' '}
          <strong className="text-[#191817] font-semibold">
            {formatShortDate(earliestDate)} – {formatShortDate(latestDate)}
          </strong>
        </span>
        <span className="text-right truncate">
          {craftMinDays}–{craftMaxDays}d crafting · {activeRegion.minTransitDays}–
          {activeRegion.maxTransitDays}d transit
        </span>
      </div>
    </div>
  )
}

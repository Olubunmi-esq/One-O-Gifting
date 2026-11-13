import React, { useEffect, useRef, useState } from 'react'

// Eagerly bundle all local resin-art assets through Vite so every image
// resolves in both local development (`vite`) and production (`vite build`).
const LOCAL_RESIN_ASSETS = import.meta.glob(
  '/src/assets/images/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
) as Record<string, string>

export const DEFAULT_RESIN_IMAGE =
  '/src/assets/images/hero_resin_art_gifting_1793922100724.jpg'

export function resolveProductImageUrl(src?: string): string {
  if (!src) {
    return LOCAL_RESIN_ASSETS[DEFAULT_RESIN_IMAGE] || DEFAULT_RESIN_IMAGE
  }

  const normalized = src.startsWith('/') ? src : `/${src}`
  if (LOCAL_RESIN_ASSETS[normalized]) {
    return LOCAL_RESIN_ASSETS[normalized]
  }

  // Fallback for filename-only matches just in case a path omits leading directories
  const filename = normalized.split('/').pop()
  if (filename) {
    const matchedEntry = Object.entries(LOCAL_RESIN_ASSETS).find(([key]) =>
      key.endsWith(`/${filename}`)
    )
    if (matchedEntry) {
      return matchedEntry[1]
    }
  }

  return src
}

const ASPECT_RATIO_CLASS_MAP: Record<
  '4/3' | '16/9' | '1/1' | 'auto',
  string
> = {
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
  auto: ''
}

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  aspectRatio?: '4/3' | '16/9' | '1/1' | 'auto'
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  aspectRatio = '4/3'
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setHasError(false)
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    } else {
      setIsLoaded(false)
    }
  }, [src])

  const resolvedSrc = resolveProductImageUrl(src)
  const resolvedFallback = resolveProductImageUrl(DEFAULT_RESIN_IMAGE)
  const imageToLoad = !src || hasError ? resolvedFallback : resolvedSrc

  return (
    <div
      className={`relative overflow-hidden bg-[#F2EFE9] ${ASPECT_RATIO_CLASS_MAP[aspectRatio]}`}
    >
      {/* Subtle skeleton shimmer before load */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0ECE4] via-[#F7F5F0] to-[#F0ECE4] animate-pulse" />
      )}

      <img
        ref={imgRef}
        src={imageToLoad}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
        className={`${className} transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Gentle vignette / editorial contrast scrim */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60" />
    </div>
  )
}

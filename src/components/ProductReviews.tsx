import React, { useState } from 'react'
import { Star, Check, ThumbsUp, MessageSquarePlus } from 'lucide-react'
import { Review, ReviewStats } from '../data/reviews'

interface StarRatingProps {
  rating: number
  size?: 'xs' | 'sm' | 'md'
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'sm' }) => {
  const dim =
    size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5'

  return (
    <div
      className="inline-flex items-center gap-0.5 text-[#C2A264]"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${dim} ${
            star <= Math.round(rating)
              ? 'fill-[#C2A264] text-[#C2A264]'
              : 'text-[#D6D1C8]'
          }`}
        />
      ))}
    </div>
  )
}

interface ProductReviewsCompactProps {
  reviews: Review[]
  stats: ReviewStats
  onViewAll: () => void
}

/**
 * Fast-scan customer rating & short feedback block displayed directly inside
 * the ProductModal sidebar so shoppers see real buyer proof immediately.
 */
export const ProductReviewsCompact: React.FC<ProductReviewsCompactProps> = ({
  reviews,
  stats,
  onViewAll
}) => {
  const topReviews = reviews.slice(0, 2)

  return (
    <div className="mt-5 pt-4 border-t border-[#DDD8CE] space-y-3">
      {/* Header Row: Average Score + Quick Switcher */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <StarRating rating={stats.average} size="sm" />
          <span className="text-sm font-bold text-[#191817] tabular-nums">
            {stats.average.toFixed(1)}
          </span>
          <span className="text-xs text-[#57534D]">
            ({stats.totalCount}) · {stats.recommendedPercent}% recommend
          </span>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#1B3326] hover:underline whitespace-nowrap"
        >
          All reviews →
        </button>
      </div>

      {/* 2 Concise Buyer Feedback Snippets */}
      <div className="space-y-2">
        {topReviews.map((review) => (
          <div
            key={review.id}
            className="p-3 bg-white border border-[#E5E2DC] space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <StarRating rating={review.rating} size="xs" />
              <span className="text-[11px] text-[#6B665F] truncate">
                {review.occasion}
              </span>
            </div>
            <p className="text-xs text-[#2B2825] leading-relaxed line-clamp-2">
              “{review.comment}”
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#57534D]">
              <span className="font-semibold text-[#191817]">{review.author}</span>
              <span>·</span>
              <span>{review.location}</span>
              {review.verifiedBuyer && (
                <Check className="w-3 h-3 text-[#1B3326] shrink-0" aria-label="Verified buyer" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ProductReviewsProps {
  productId: string
  productTitle: string
  reviews: Review[]
  stats: ReviewStats
  onAddReview: (review: Review) => void
}

/**
 * Full Product Reviews panel inside the ProductModal Reviews tab:
 * star breakdown, 1-click rating filter, compact buyer feedback cards,
 * helpful votes, and a quick inline review submission form.
 */
export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productTitle,
  reviews,
  stats,
  onAddReview
}) => {
  const [starFilter, setStarFilter] = useState<'all' | 5 | 4 | 3>('all')
  const [helpfulExtra, setHelpfulExtra] = useState<Record<string, boolean>>({})
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Streamlined review form fields
  const [rating, setRating] = useState(5)
  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [occasion, setOccasion] = useState('')
  const [comment, setComment] = useState('')

  const filteredReviews =
    starFilter === 'all'
      ? reviews
      : reviews.filter((r) => Math.round(r.rating) === starFilter)

  const handleHelpful = (reviewId: string) => {
    if (helpfulExtra[reviewId]) return
    setHelpfulExtra((prev) => ({ ...prev, [reviewId]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !comment.trim()) return

    const created: Review = {
      id: `rev-${Date.now()}`,
      productId,
      giftSetName: productTitle,
      author: author.trim(),
      location: location.trim() || 'Lagos, Nigeria',
      occasion: occasion.trim() || 'Gift Order',
      rating,
      title:
        rating >= 5
          ? 'Loved the handmade finish'
          : rating === 4
          ? 'Neat quality & delivery'
          : 'Customer feedback',
      comment: comment.trim(),
      date: 'Just now',
      verifiedBuyer: true,
      helpfulCount: 0
    }

    onAddReview(created)
    setStarFilter('all')
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
      setAuthor('')
      setLocation('')
      setOccasion('')
      setComment('')
      setRating(5)
    }, 1100)
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Compact Score & 5-to-1 Breakdown */}
      <div className="p-4 bg-[#FAF9F5] border border-[#E5E2DC] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-5 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3326] tabular-nums">
              {stats.average.toFixed(1)}
            </span>
            <span className="text-xs text-[#57534D]">/ 5.0</span>
          </div>
          <StarRating rating={stats.average} size="md" />
          <p className="text-xs text-[#4A4640] pt-0.5">
            {stats.totalCount} verified reviews · {stats.recommendedPercent}% recommend
          </p>
        </div>

        <div className="sm:col-span-7 sm:border-l sm:border-[#E5E2DC] sm:pl-4 space-y-1.5">
          {[5, 4, 3, 2, 1].map((level) => {
            const count = stats.starCounts[level] || 0
            const pct =
              stats.totalCount > 0 ? Math.round((count / stats.totalCount) * 100) : 0
            const isFilterable = level === 5 || level === 4 || level === 3
            return (
              <button
                key={level}
                type="button"
                disabled={!isFilterable || count === 0}
                onClick={() => {
                  if (isFilterable && count > 0) {
                    setStarFilter(starFilter === level ? 'all' : (level as 5 | 4 | 3))
                  }
                }}
                className={`w-full flex items-center gap-2 text-xs text-left ${
                  isFilterable && count > 0 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                }`}
              >
                <span className="w-8 font-medium text-[#191817] shrink-0 tabular-nums">
                  {level} ★
                </span>
                <div className="flex-1 h-1.5 bg-[#E8E4DC] overflow-hidden">
                  <div
                    className="h-full bg-[#C2A264] transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[#57534D] tabular-nums shrink-0">
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter Tabs + Write Review Button */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {(
            [
              { id: 'all', label: `All (${reviews.length})` },
              { id: 5, label: `5★ (${stats.starCounts[5] || 0})` },
              { id: 4, label: `4★ (${stats.starCounts[4] || 0})` }
            ] as const
          ).map((f) => (
            <button
              key={String(f.id)}
              type="button"
              onClick={() => setStarFilter(f.id)}
              className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                starFilter === f.id
                  ? 'bg-[#1B3326] text-white border-[#1B3326]'
                  : 'bg-white text-[#38342F] border-[#DDD8CE] hover:border-[#1B3326]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3326] hover:underline"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>{showForm ? 'Cancel' : 'Write a review'}</span>
        </button>
      </div>

      {/* Streamlined Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-[#FAF9F5] border border-[#DDD8CE] space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#191817]">
              Rate this item
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} out of 5`}
                  className="p-0.5 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= rating
                        ? 'fill-[#C2A264] text-[#C2A264]'
                        : 'text-[#D6D1C8]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              required
              placeholder="Your name *"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="text-sm px-3 py-2 bg-white border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326]"
            />
            <input
              type="text"
              placeholder="City (e.g. Lagos)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-sm px-3 py-2 bg-white border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326]"
            />
            <input
              type="text"
              placeholder="Occasion (optional)"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="text-sm px-3 py-2 bg-white border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326]"
            />
          </div>

          <textarea
            rows={2}
            required
            placeholder="Share short feedback on quality, finish, or delivery..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-sm px-3 py-2 bg-white border border-[#DDD8CE] focus:outline-none focus:border-[#1B3326]"
          />

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-2.5 bg-[#1B3326] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#122319] transition-colors flex items-center justify-center gap-1.5"
          >
            {submitted ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Review posted</span>
              </>
            ) : (
              <span>Post Review</span>
            )}
          </button>
        </form>
      )}

      {/* Clean, Fast-Scanning Review List */}
      <div className="space-y-2.5">
        {filteredReviews.length === 0 ? (
          <div className="p-5 bg-[#FAF9F5] border border-[#E5E2DC] text-center space-y-1.5">
            <p className="text-sm text-[#38342F]">
              No {starFilter}-star reviews yet.
            </p>
            <button
              type="button"
              onClick={() => setStarFilter('all')}
              className="text-xs font-semibold text-[#1B3326] underline"
            >
              Show all {reviews.length} reviews
            </button>
          </div>
        ) : (
          filteredReviews.map((review) => {
            const voted = Boolean(helpfulExtra[review.id])
            const count = review.helpfulCount + (voted ? 1 : 0)

            return (
              <div
                key={review.id}
                className="p-3.5 bg-white border border-[#E5E2DC] space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <StarRating rating={review.rating} size="xs" />
                    <h5 className="text-sm font-semibold text-[#191817] truncate">
                      {review.title}
                    </h5>
                  </div>
                  <span className="text-xs text-[#6B665F] shrink-0">
                    {review.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#38342F] leading-relaxed">
                  {review.comment}
                </p>

                <div className="pt-1.5 flex items-center justify-between gap-2 border-t border-[#F2EFEA] text-xs text-[#57534D]">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <span className="font-semibold text-[#191817]">
                      {review.author}
                    </span>
                    {review.verifiedBuyer && (
                      <span className="inline-flex items-center gap-0.5 text-[#1B3326] font-medium">
                        <Check className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                    <span>·</span>
                    <span>{review.location}</span>
                    <span>·</span>
                    <span>{review.occasion}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleHelpful(review.id)}
                    disabled={voted}
                    className={`inline-flex items-center gap-1 text-xs shrink-0 transition-colors ${
                      voted
                        ? 'text-[#1B3326] font-semibold'
                        : 'text-[#57534D] hover:text-[#191817]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="tabular-nums">{count}</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

import type { Platform } from '../types'

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'airbnb', label: 'Airbnb' },
  { value: 'booking_com', label: 'Booking.com' },
  { value: 'expedia', label: 'Expedia' },
  { value: 'tripadvisor', label: 'TripAdvisor' },
]

interface FiltersProps {
  platform?: Platform
  onPlatformChange: (platform: Platform | undefined) => void
}

export default function Filters({ platform, onPlatformChange }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onPlatformChange(undefined)}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          !platform
            ? 'bg-ha-orange text-white'
            : 'bg-ha-peach text-ha-brown hover:bg-ha-orange/10'
        }`}
      >
        All
      </button>
      {PLATFORMS.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => onPlatformChange(p.value === platform ? undefined : p.value)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            platform === p.value
              ? 'bg-ha-orange text-white'
              : 'bg-ha-peach text-ha-brown hover:bg-ha-orange/10'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

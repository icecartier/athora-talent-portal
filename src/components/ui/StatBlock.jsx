import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatBlock({ label, value, change, changeLabel, trend = 'up' }) {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-red-500' : 'text-muted'
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div className="bg-surface border border-cream-deep rounded-xl p-4">
      <p className="text-[10px] font-semibold text-muted uppercase tracking-[0.08em] mb-2">{label}</p>
      <p className="text-[28px] font-extrabold text-text-main leading-none tracking-tight">{value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
          <TrendIcon size={11} strokeWidth={2.5} />
          <span className="text-[11px] font-semibold">{change}</span>
          {changeLabel && <span className="text-[10px] text-text-hint ml-0.5">{changeLabel}</span>}
        </div>
      )}
    </div>
  )
}

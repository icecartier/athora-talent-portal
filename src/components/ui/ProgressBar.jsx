export default function ProgressBar({ value, max, color = '#7C3AED', height = 6, showLabel = false }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: '#EDE9DB' }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1.5">
          <span className="text-[11px] font-medium text-text-sub">{value.toLocaleString()}</span>
          <span className="text-[11px] text-text-hint">{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}

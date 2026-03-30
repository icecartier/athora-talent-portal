import { Check } from 'lucide-react'

const priorityColor = { high: '#7C3AED', medium: '#059669', low: '#F59E0B', default: '#555555' }

export default function TaskItem({ task, done, priority }) {
  const color = priorityColor[priority] || priorityColor.default
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b last:border-0" style={{ borderColor: '#222' }}>
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          border: done ? 'none' : '1.5px solid #333',
          background: done ? '#7C3AED' : 'transparent',
        }}
      >
        {done && <Check size={9} color="white" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[10.5px] font-semibold leading-tight ${done ? 'line-through opacity-40' : 'text-white'}`}>{task}</p>
      </div>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
    </div>
  )
}

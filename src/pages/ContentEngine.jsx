import { useState } from 'react'
import { Clipboard, Zap } from 'lucide-react'
import { contentSuggestions, hookFormulas } from '../data/mockCreator'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const formatColors = { 'POV Video': 'primary', 'Educational': 'success', 'Transformation': 'amber', 'Behind the Scenes': 'muted', 'Talking Head': 'muted' }
const perfColors = { 'Very High': 'success', 'High': 'primary', 'Medium': 'amber', 'Low': 'muted' }
const diffColors = { 'Easy': 'success', 'Medium': 'amber', 'Hard': 'danger' }

export default function ContentEngine() {
  const [tab, setTab] = useState('ideas')
  return (
    <div>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: 14 }}>Content Engine</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-surface border border-cream-border rounded-full p-1 w-fit">
        {[{ id: 'ideas', label: 'Ideas' }, { id: 'hooks', label: 'Hook Library' }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
              tab === t.id ? 'bg-dark text-white' : 'text-muted hover:text-text-main hover:bg-black/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'ideas' && (
        <div>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 14 }}>Content built for your niche and current growth phase.</p>
          <div className="flex flex-col gap-3">
            {contentSuggestions.map(s => (
              <Card key={s.id} className="group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Badge variant={formatColors[s.format] || 'muted'}>{s.format}</Badge>
                      <span style={{ fontSize: 11, color: '#AAA' }}>{s.platform}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 10 }}>{s.why}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={diffColors[s.difficulty] || 'muted'}>{s.difficulty}</Badge>
                      <Badge variant={perfColors[s.estimatedPerformance] || 'muted'}>{s.estimatedPerformance} Performance</Badge>
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity border border-dark text-text-main rounded-full px-4 py-2 text-xs font-semibold hover:bg-dark hover:text-white transition-colors active:scale-[0.97]"
                  >
                    <span className="flex items-center gap-1.5"><Zap size={11} />Use Idea</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 'hooks' && (
        <div className="flex flex-col gap-3">
          {hookFormulas.map(h => (
            <Card key={h.id} className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="primary" className="mb-3">{h.tag}</Badge>
                  <p style={{ fontFamily: 'monospace', fontSize: 14, color: '#111', marginBottom: 6, lineHeight: 1.5 }}>{h.formula}</p>
                  <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic' }}>{h.example}</p>
                </div>
                <button className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity border border-cream-border text-text-sub rounded-full px-4 py-2 text-xs font-medium hover:bg-cream transition-colors active:scale-[0.97]">
                  <span className="flex items-center gap-1.5"><Clipboard size={11} />Copy</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

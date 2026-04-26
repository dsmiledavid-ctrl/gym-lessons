'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const TUMBLING_SEQUENCE = [
  'Forward Roll',
  'Backward Roll',
  'Cartwheel',
  'Handstand (against wall)',
  'Bridge',
  'Round-Off',
  'Headstand',
  'Back Walkover',
]

const SPORT_ROTATION = [
  'Soccer',
  'Basketball',
  'Volleyball',
  'Tennis',
  'Baseball / Softball',
  'Judo fundamentals',
  'Athletics (sprints, jumps)',
  'Frisbee / Disc',
]

const MUSCLE_CYCLE = ['Core', 'Upper body', 'Lower body', 'Full body']

const RELAY_OPTIONS = [
  'Shuttle Run',
  'Beanbag relay',
  'Hoop relay',
  'Weaving relay',
  'Memory relay',
  'Tunnel relay',
  'Partner relay',
  'Parachute game',
  'Dodge Ball',
  'Musical Hoops',
]

function PlanForm() {
  const searchParams = useSearchParams()
  const lessonParam = searchParams.get('lesson')

  const [lessonNumber, setLessonNumber] = useState(lessonParam || '')
  const [tumbling, setTumbling] = useState('')
  const [sport, setSport] = useState('')
  const [muscle, setMuscle] = useState('Core')
  const [relay, setRelay] = useState('Shuttle Run')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  // Pre-fill from curriculum map based on lesson number
  useEffect(() => {
    if (!lessonParam) return
    const n = parseInt(lessonParam, 10)
    if (isNaN(n)) return
    // Simple index-based pre-fill from the known sequences
    setTumbling(TUMBLING_SEQUENCE[Math.floor((n - 1) / 2)] ?? '')
    setSport(SPORT_ROTATION[Math.floor((n - 1) / 2) % SPORT_ROTATION.length] ?? '')
    setMuscle(MUSCLE_CYCLE[(n - 1) % 4] ?? 'Core')
  }, [lessonParam])

  async function handleGenerate() {
    if (!tumbling || !sport) {
      setError('Choose a tumbling skill and sport first.')
      return
    }
    setError('')
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonNumber, tumbling, sport, muscle, relay, notes }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.content)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed.')
    } finally {
      setLoading(false)
    }
  }

  function handleDownload() {
    const slug = `lesson_${String(lessonNumber).padStart(2, '0')}_${tumbling.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}`
    const blob = new Blob([result], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Plan a lesson</h1>

      <div className="bg-white border rounded-lg p-6 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Lesson #</label>
            <input
              type="number"
              value={lessonNumber}
              onChange={e => setLessonNumber(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              placeholder="e.g. 2"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Muscle focus</label>
            <select
              value={muscle}
              onChange={e => setMuscle(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
            >
              {MUSCLE_CYCLE.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Relay / Game</label>
            <select
              value={relay}
              onChange={e => setRelay(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
            >
              {RELAY_OPTIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Tumbling skill</label>
          <div className="flex flex-wrap gap-2">
            {TUMBLING_SEQUENCE.map(s => (
              <button
                key={s}
                onClick={() => setTumbling(s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${tumbling === s ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Sport of the week</label>
          <div className="flex flex-wrap gap-2">
            {SPORT_ROTATION.map(s => (
              <button
                key={s}
                onClick={() => setSport(s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${sport === s ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Notes for this lesson (optional)</label>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Group is already solid on forward rolls. Two kids who can do cartwheels. Keep soccer simple — first time."
            rows={3}
            className="text-sm"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button onClick={handleGenerate} disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Generating…' : 'Generate 2-page lesson plan'}
        </Button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Generated lesson</h2>
            <Button variant="outline" size="sm" onClick={handleDownload}>Download .md</Button>
          </div>
          <article className="bg-white border rounded-lg p-8 prose prose-zinc prose-sm max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:text-xl prose-h2:text-base prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-zinc-400
            prose-hr:border-zinc-200
            prose-strong:font-semibold
            prose-li:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          </article>
        </div>
      )}
    </div>
  )
}

export default function PlanPage() {
  return (
    <Suspense>
      <PlanForm />
    </Suspense>
  )
}

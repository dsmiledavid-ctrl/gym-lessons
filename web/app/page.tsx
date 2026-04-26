import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface CurriculumLesson {
  number: number
  tumbling: string
  sport: string
  muscle: string
  relay: string
  fms_focus: string
  lesson_file: string | null
}

interface CurriculumMap {
  meta: { title: string; ages: string; status: string }
  progression_principles: string[]
  tumbling_sequence: string[]
  sport_rotation: string[]
  muscle_cycle: string[]
  lessons: CurriculumLesson[]
}

function getCurriculumMap(): CurriculumMap {
  const filePath = path.join(process.cwd(), '..', 'data', 'curriculum_map.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default function CurriculumPage() {
  const map = getCurriculumMap()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{map.meta.title}</h1>
        <p className="text-zinc-500 text-sm mt-1">{map.meta.ages} · {map.meta.status}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Progression principles</h2>
        <ul className="space-y-1.5">
          {map.progression_principles.map((p, i) => (
            <li key={i} className="text-sm text-zinc-700 flex gap-2">
              <span className="text-zinc-300 select-none">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-white border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-xs uppercase tracking-widest text-zinc-400">Tumbling sequence</h3>
          <ol className="space-y-1">
            {map.tumbling_sequence.map((s, i) => (
              <li key={i} className="text-zinc-700"><span className="text-zinc-400 mr-1.5">{i + 1}.</span>{s}</li>
            ))}
          </ol>
        </div>
        <div className="bg-white border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-xs uppercase tracking-widest text-zinc-400">Sport rotation</h3>
          <ol className="space-y-1">
            {map.sport_rotation.map((s, i) => (
              <li key={i} className="text-zinc-700"><span className="text-zinc-400 mr-1.5">{i + 1}.</span>{s}</li>
            ))}
          </ol>
        </div>
        <div className="bg-white border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-xs uppercase tracking-widest text-zinc-400">Muscle cycle</h3>
          <ol className="space-y-1">
            {map.muscle_cycle.map((s, i) => (
              <li key={i} className="text-zinc-700"><span className="text-zinc-400 mr-1.5">{i + 1}.</span>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Lesson schedule</h2>
        <div className="bg-white border rounded-lg divide-y text-sm">
          {map.lessons.map((lesson) => (
            <div key={lesson.number} className="px-4 py-3 flex items-start gap-4">
              <span className="text-zinc-400 font-mono w-6 shrink-0 pt-0.5">{lesson.number}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-700">
                  <span><span className="text-zinc-400">Tumbling: </span>{lesson.tumbling}</span>
                  <span><span className="text-zinc-400">Sport: </span>{lesson.sport}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-500 mt-0.5">
                  <span>Muscle: {lesson.muscle}</span>
                  <span>Relay: {lesson.relay}</span>
                  <span>FMS: {lesson.fms_focus}</span>
                </div>
              </div>
              <div className="shrink-0">
                {lesson.lesson_file ? (
                  <Link href={`/lessons/${lesson.lesson_file}`}>
                    <Badge variant="secondary">View lesson</Badge>
                  </Link>
                ) : (
                  <Link href={`/plan?lesson=${lesson.number}`}>
                    <Badge variant="outline" className="text-zinc-400">Plan</Badge>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import { getAllLessons } from '@/lib/lessons'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function LessonsPage() {
  const lessons = getAllLessons()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lesson library</h1>
        <Link href="/plan">
          <Badge className="cursor-pointer">+ Plan new lesson</Badge>
        </Link>
      </div>

      {lessons.length === 0 ? (
        <p className="text-zinc-500 text-sm">No lessons written yet. <Link href="/plan" className="underline">Plan the first one.</Link></p>
      ) : (
        <div className="bg-white border rounded-lg divide-y text-sm">
          {lessons.map((lesson) => (
            <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="flex items-start gap-4 px-4 py-3 hover:bg-zinc-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-900">{lesson.title}</div>
                <div className="text-zinc-500 mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Tumbling: {lesson.tumbling}</span>
                  <span>Sport: {lesson.sport}</span>
                  <span>Muscle: {lesson.muscle}</span>
                </div>
              </div>
              <span className="text-zinc-400 text-xs pt-0.5 shrink-0">View →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

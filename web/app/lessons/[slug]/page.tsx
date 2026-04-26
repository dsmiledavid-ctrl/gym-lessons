import { getLessonBySlug, getAllLessons } from '@/lib/lessons'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.slug }))
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)
  if (!lesson) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-zinc-500">
        <Link href="/lessons" className="hover:text-zinc-900 transition-colors">← Lessons</Link>
      </div>

      <article className="bg-white border rounded-lg p-8 prose prose-zinc prose-sm max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-xl prose-h2:text-base prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-zinc-400 prose-h2:font-semibold
        prose-hr:border-zinc-200
        prose-strong:font-semibold
        prose-li:my-0.5
        prose-p:leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {lesson.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const LESSONS_DIR = path.join(process.cwd(), '..', 'lessons')

export interface Lesson {
  slug: string
  title: string
  tumbling: string
  sport: string
  muscle: string
  relay: string
  content: string
}

export function getAllLessons(): Lesson[] {
  if (!fs.existsSync(LESSONS_DIR)) return []
  const files = fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(LESSONS_DIR, filename), 'utf-8')
      const { content } = matter(raw)
      const title = extractH1(content) || slug
      return {
        slug,
        title,
        tumbling: extractField(content, 'Tumbling'),
        sport: extractField(content, 'Sport'),
        muscle: extractField(content, 'Muscle'),
        relay: extractField(content, 'Relay'),
        content,
      }
    })
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

export function getLessonBySlug(slug: string): Lesson | null {
  const filePath = path.join(LESSONS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return {
    slug,
    title: extractH1(content) || slug,
    tumbling: extractField(content, 'Tumbling'),
    sport: extractField(content, 'Sport'),
    muscle: extractField(content, 'Muscle'),
    relay: extractField(content, 'Relay'),
    content,
  }
}

function extractH1(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

function extractField(content: string, field: string): string {
  const regex = new RegExp(`\\*\\*${field}:\\*\\*\\s*([^|\\n]+)`)
  const match = content.match(regex)
  return match ? match[1].trim() : '—'
}

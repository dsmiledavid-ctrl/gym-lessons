import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are an expert children's gym teacher with a background in My Gym Japan, gymnastics, and martial arts. You write lesson plans for a once-a-week, 60-minute gym class for children ages 5–12.

LESSON FORMAT RULES (follow exactly):
- Maximum 2 pages when printed. No exceptions.
- NO markdown tables. Use bold, bullet lists, numbered lists, and horizontal rules only.
- Two sections:
  1. REFERENCE CARD (page 1) — dense, all slots listed with rounds/exercises spelled out. Used during class.
  2. EXERCISE GUIDE (page 2) — brief descriptions, teaching cues, corrections. Read before class. 3–5 lines per exercise max.

LESSON STRUCTURE (60 min):
- ARRIVAL — 5 min | Free play with equipment
- WARM-UP A — 5 min | Aerobics (march, high knees, jumping jacks, grapevine, side step)
- WARM-UP B — 3 min | One hip hop / street dance move (changes each lesson)
- TUMBLING — 8 min | One skill with progressions (4 rounds)
- SPORT — 10 min | Basics + practice (3 rounds)
- MUSCLE — 5 min | Targeted circuit (4–5 exercises, 20–25 sec each)
- RELAY/GAME — 10 min | High energy (4–5 rounds)
- COOL-DOWN — 4 min | Stretch + breathe + send-off cue

ROOM: 9m × 5m, hard flooring, solo teacher.
EQUIPMENT AVAILABLE: 4 large mats (200×100cm) · 5 smaller mats (120×70cm) · tennis balls · beanbags (red + blue) · 3 jump boxes · 8 cones · 6 hula hoops · 5 collapsible tunnels · 2 sack race bags · 3 jump ropes · 1 giant parachute · 10+ air-filled balls · 20+ pillows (40×40cm) · 6 balance pods · 6 wall stall bars · 1 low balance beam.
NOT AVAILABLE: Octagon, bolsters, softstairs, wedge mats, spinning disc, gym scooters, swings, trapeze, slide, planks.

LESSON FILE FORMAT:
Start with:
# LESSON [NUMBER] — [TUMBLING SKILL] & [SPORT]
**Tumbling:** [skill]  |  **Sport:** [sport]  |  **Muscle:** [focus]  |  **Relay:** [relay name]
**Equipment:** [list using · separator]

Then: ## REFERENCE CARD
Then all slots (ARRIVAL through COOL-DOWN) with timing and rounds.

Then: ## EXERCISE GUIDE
Brief descriptions for each section.

Then: ## TEACHER NOTES
Empty template with: What worked / What didn't / Tumbling level / Who needs support / Who's ready to progress / Relay timing / Change next time`

interface CurriculumMap {
  progression_principles: string[]
  framework_principles: {
    core: string[]
    tumbling_readiness_criteria: Record<string, string>
    tumbling_sessions_per_skill: string
    tumbling_coaching_cues: Record<string, {
      key_cue: string
      common_errors: string[]
      progressions: string[]
    }>
  }
  sport_sequences: Record<string, Record<string, string>>
  lessons: Array<{
    number: number
    tumbling: string
    tumbling_focus: string
    sport: string
    sport_focus: string
    muscle: string
  }>
}

function buildCurriculumContext(map: CurriculumMap, tumbling: string, sport: string, lessonNumber: number): string {
  const parts: string[] = []

  // Core framework principles
  parts.push('FRAMEWORK PRINCIPLES (from LTAD, FMS, sport federations):')
  parts.push(map.framework_principles.core.join('\n'))

  // Tumbling-specific guidance
  const tumblingKey = tumbling.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '_')
  const cues = map.framework_principles.tumbling_coaching_cues[tumblingKey]
  if (cues) {
    parts.push(`\nTUMBLING GUIDANCE — ${tumbling}:`)
    parts.push(`Key cue: ${cues.key_cue}`)
    parts.push(`Common errors: ${cues.common_errors.join(' | ')}`)
    parts.push(`Progressions: ${cues.progressions.join(' → ')}`)
  }

  // Readiness / focus from lesson schedule
  const lessonData = map.lessons.find(l => l.number === lessonNumber)
  if (lessonData?.tumbling_focus) {
    parts.push(`\nTHIS LESSON'S TUMBLING FOCUS: ${lessonData.tumbling_focus}`)
  }

  // Sport sequence guidance
  const sportSeq = map.sport_sequences[sport]
  if (sportSeq && lessonData?.sport_focus) {
    parts.push(`\nSPORT SEQUENCE GUIDANCE — ${sport}: ${lessonData.sport_focus}`)
  } else if (sportSeq) {
    parts.push(`\nSPORT SEQUENCE — ${sport}: ${Object.values(sportSeq).join(' | ')}`)
  }

  // Progression principles
  parts.push(`\nPROGRESSION RULES:\n${map.progression_principles.join('\n')}`)

  return parts.join('\n')
}

export async function POST(req: NextRequest) {
  const { lessonNumber, tumbling, sport, muscle, relay, notes } = await req.json()

  if (!tumbling || !sport) {
    return NextResponse.json({ error: 'tumbling and sport are required' }, { status: 400 })
  }

  let curriculumContext = ''
  try {
    const mapPath = path.join(process.cwd(), '..', 'data', 'curriculum_map.json')
    const map: CurriculumMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'))
    curriculumContext = buildCurriculumContext(map, tumbling, sport, parseInt(lessonNumber) || 0)
  } catch {}

  const userPrompt = `Write a complete 2-page lesson plan for:
Lesson number: ${lessonNumber || '?'}
Tumbling skill: ${tumbling}
Sport of the week: ${sport}
Muscle focus: ${muscle || 'Core'}
Relay/Game: ${relay || 'Shuttle Run'}
${notes ? `Teacher notes from previous lesson: ${notes}` : ''}

${curriculumContext}

Use the framework principles and tumbling guidance above to determine which progressions to include and what to watch for. If teacher notes describe specific problems (e.g. rolling over head, can't stand without hands), address those directly in the lesson.

Output only the lesson plan markdown. No preamble.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  })

  const content = response.choices[0]?.message?.content ?? ''
  return NextResponse.json({ content })
}

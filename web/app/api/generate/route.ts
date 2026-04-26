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

export async function POST(req: NextRequest) {
  const { lessonNumber, tumbling, sport, muscle, relay, notes } = await req.json()

  if (!tumbling || !sport) {
    return NextResponse.json({ error: 'tumbling and sport are required' }, { status: 400 })
  }

  // Load curriculum map for context
  let curriculumContext = ''
  try {
    const mapPath = path.join(process.cwd(), '..', 'data', 'curriculum_map.json')
    const map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'))
    curriculumContext = `\n\nCURRICULUM CONTEXT:\n${map.progression_principles.join('\n')}`
  } catch {}

  const userPrompt = `Write a complete 2-page lesson plan for:
Lesson number: ${lessonNumber || '?'}
Tumbling skill: ${tumbling}
Sport of the week: ${sport}
Muscle focus: ${muscle || 'Core'}
Relay/Game: ${relay || 'Shuttle Run'}
${notes ? `Additional notes: ${notes}` : ''}
${curriculumContext}

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

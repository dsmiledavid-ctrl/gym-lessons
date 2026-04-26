# Gym Lesson Planning — Situation Doc

**Last updated:** 2026-04-26 (Session 2)  
**NotebookLM notebook:** Kids Gym Lesson Planning (`a2e57998-9b01-4727-bea0-b0d677bb3b97`)  
**NotebookLM conversation ID:** (none yet)  
**Web app:** https://gym-lessons.vercel.app/  
**GitHub repo:** https://github.com/dsmiledavid-ctrl/gym-lessons

---

## What this project is

A system to help Imre plan a weekly gymnastics/fitness lesson for children.

**Lesson parameters:**
- Once a week, 60 minutes
- Held in Plum Pudding Kindergarten's gym room (hard flooring)
- Children ages 5–12 (mixed age group)
- Style: My Gym-inspired but adapted — fun, movement-based, no sponge pit or high bars
- English language

**Not the same as** the Plum Pudding Phys Ed class (that's a separate project). The Gym class is held in the same room but is a standalone session.

---

## Imre's background

10 years at My Gym Japan: player → trainer → manager of lesson quality at 3 locations. Also designed a My Gym-style curriculum for the American Club Tokyo — minimal props, hard floor, once a week. That experience is the closest model for what this project needs.

---

## Data sources

### In `/home/imre/projects/Gym/data/mygym_sheets/`
CSVs exported from Imre's My Gym Google Sheets database:

| File | Contents |
|---|---|
| `CleanData3Archive - EditableSortUnique.csv` | Main ingredient library: Group, Name, Equipment, Skills |
| `CleanData3Archive - Group movemen.csv` | Group movement activities (Aerobics, Dance, Kickboxing) |
| `CleanData3Archive - TempCleanUp.csv` | Coming In Toys list |
| `CleanData3Archive - Sheet11.csv` | Muscle group pairing data |
| `DBIngredientsV4.0 - Ingredients.csv` | Detailed ingredient list with equipment |
| `DBIngredientsV4.0 - IngredientGroups.csv` | Category list |
| `DBIngredientsV4.0 - Choosing ingredients.csv` | Lesson builder template (incomplete) |
| `MGE Program Master - Adventures.csv` | Full My Gym Adventure scripts + assembly |
| `MGE Program Master - Cardio_Ply.csv` | Full cardio/plyometric exercise library with cues |
| `MGE Program Master - Relays.csv` | Full relay scripts with rounds and teacher shticks |
| `MGE Program Master - ListOfIngredients.csv` | Master list of all ingredients by category |

### In NotebookLM
- Google Sheet link added directly
- CSVs added as sources

---

## Lesson ingredient structure (from My Gym)

A My Gym lesson is built from one item per category:

- **Adventure** — themed obstacle course setup
- **Cardio/Plyometrics** — scripted cardio exercises
- **Group Movement** — aerobics, dance, kickboxing moves
- **Relay** — scripted relay with rounds and teacher cues
- **Game** — structured game
- **Group Tumbling Skill** — gymnastics/tumbling
- **Practice Skill / Manipulative Skill** — ball handling, etc.
- **Coming In Toys** — free play on arrival
- **Sing Along / Dance / Ending** — structure bookends
- **Big Swing** — *(not applicable — no swing equipment)*

---

## Equipment — Plum Pudding gym room (9m x 5m, hard flooring)

- 4 mats 200x100cm (large floor mats — equivalent to My Gym R/B mats)
- 5 mats 120x70cm (smaller mats)
- Lots of tennis balls
- Lots of beanbags (red and blue)
- 3 jump boxes
- 8 cones
- 6 hula hoops
- 5 collapsible tunnels
- 2 jumping bags (sack race bags)
- 3 jump ropes
- 1 giant parachute
- 6 big size [unclear — likely large gym/exercise balls — to confirm]
- 10+ air filled balls of different sizes and types
- 20+ pillows 40x40cm
- 6 big balance pods
- 6 stall bars secured to the wall
- 1 low balance beam (doubles as bench when flipped)

**NOT available (My Gym-specific):** Octagon, Bolsters, Softstairs, Wedge mats, Spinning Disc, Gym Carts/Scooters, Swings/Trapeze, Rocking Boat, Slide, Planks, Clips/Carabiners, Puppets, Pom poms, Agility Ladder

**Puppets:** Available at Plum Pudding but NOT planned for use — puppet endings are for the under-3 My Gym format, not appropriate for ages 5-12.

**Cheap to buy — high unlock value:**
- Pom poms (a few activities)
- Clips/carabiners (hanging setups)

## Feasibility from My Gym database (against available equipment)

- **226 activities: fully feasible** as-is
- **162 activities: need My Gym-specific gear** (blocked)

Fully feasible highlights:
- All tumbling skills (forward roll, backward roll, cartwheel, handstand, bridge, etc.)
- Most relays (Across the Gym, Beanbag, Hoop, Weaving, Shuttle Run, etc.)
- Most games (Parachute games, Red Light/Green Light, Musical Hoops, Steal the Bacon, Dodge Ball, Limbo, etc.)
- Sports skills (basketball, soccer, volleyball, ring toss, frisbee, etc.)
- Group movement (all aerobics, dance, kickboxing moves)
- Adventures with tunnels and cones work

## Still missing / open questions

- [ ] **"6 big size" equipment** — what exactly are these? (gym balls? something else?)
- [ ] **My Gym lesson plan documents** — the actual weekly program PDFs from My Gym Japan. Not yet found on filesystem.
- [x] **Student/group details** — school-aged, mostly 5–10 years old. Filter out baby/toddler activities
- [x] **Lesson structure decision** — finalised
- [ ] **Favorite activity homepages** — URLs Imre likes for activity inspiration
- [ ] **Theme connection** — should lessons tie to Plum Pudding's weekly themes? Or be standalone?
- [ ] **Lesson 01 feedback** — still pending. Use Teacher Notes section in lesson file.
- [ ] **FMS new findings not yet in curriculum_map** — distributed practice, speed bursts (5–8 sec + 30 sec rest), maze games, small-sided games. Add next session.
- [ ] **Vercel DASHBOARD_PASSWORD** — needs to be set in Vercel env vars to activate password protection.

---

## Agreed lesson structure (60 min, solo teacher)

| Slot | Duration | Content |
|---|---|---|
| Arrival / free play | 5 min | Beanbags, tennis balls, hoops scattered — free movement |
| Warm-up A | 5 min | Group movement — aerobics (march, high knees, jumping jacks, grapevine, side step) |
| Warm-up B | 3 min | One street dance / hip hop move — Imre's background, changes each lesson |
| Tumbling skill | 8 min | One skill with progressions — changes across lessons |
| Sport of the week | 10 min | Basics + practice — replaces Adventure (too hard solo to set up) |
| Muscle focus | 5 min | Targeted exercises, fun framing |
| Relay or game | 10 min | High energy, gets them tired |
| Cool-down | 4 min | Stretch, breathe, key cue send-off |
| Buffer | ~10 min | Transitions, explanations, extra rounds |

**Design priorities:** Fun, get them tired, some muscle focus.  
**Why no Adventure:** Obstacle course setups require a second teacher to reset. Solo = no Adventures.  
**Puppets:** Available but not used — puppet endings are for under-3s.

---

## Lessons produced

- `lessons/lesson_01_forward_roll.md` — Forward Roll · Soccer · Core · Shuttle Run — reformatted session 2

---

## Web app

**URL:** https://gym-lessons.vercel.app/  
**Repo:** https://github.com/dsmiledavid-ctrl/gym-lessons  
**Stack:** Next.js 16 · Tailwind · shadcn · OpenAI GPT-4o · Vercel  
**Features:** Curriculum map · Lesson library · AI lesson generator (2-page output) · Password protection · Try Again button  
**Data flow:** Lessons are `.md` files in `lessons/` — commit to git → Vercel auto-redeploys → visible in app  
**Auth:** HTTP Basic Auth via middleware — set `DASHBOARD_PASSWORD` in Vercel env vars

---

## Current status

Session 2 complete. Framework research done, web app built and deployed, curriculum map created with sourced progression rules.  
**Next action:** Imre brings lesson_01 feedback → fill Teacher Notes → generate lesson_02 via the web app.

---

## Session notes

### 2026-04-26 — Session 2
- Reformatted lesson_01 — no markdown tables, 2-page max (reference card + exercise guide)
- Saved lesson format rules to memory (no tables, 2-page, dense reference card)
- Web research: 8 parallel searches across FMS, LTAD, gymnastics, soccer, basketball, volleyball, tennis, baseball, judo
- Added 18 sources to NotebookLM notebook `a2e57998` (all ready)
- Built and deployed web app: https://gym-lessons.vercel.app/ (Next.js + OpenAI GPT-4o + Vercel)
- App features: curriculum map, lesson library, AI 2-page lesson generator, password protection, try-again button
- GitHub repo initialized: https://github.com/dsmiledavid-ctrl/gym-lessons
- NotebookLM queries: FMS/LTAD principles, sport sequences (soccer/basketball/volleyball/tennis/baseball), judo curriculum — all successful
- Gymnastics query timed out — Imre ran it manually and shared results
- **Key correction from YMCA source**: tumbling sequence is forward roll → backward roll → mule kicks → handstand → cartwheel (NOT cartwheel before handstand — arm strength from handstand is prerequisite for safe cartwheel)
- curriculum_map.json built with: framework principles, sourced coaching cues + common errors, sport sequences per lesson, 12-lesson skeleton
- Generator (GPT-4o) now receives framework context, tumbling cues, and sport sequence for each lesson
- Imre's judo background confirmed: former Hungarian youth national champion — he can evaluate judo sources critically
- Partial FMS findings from second manual query not yet incorporated (speed bursts, maze games, distributed practice)

### 2026-04-25 — Session 1
- Explored full filesystem to understand existing materials
- Found My Gym Google Sheets database (multi-tab, ingredient system)
- Created NotebookLM notebook `a2e57998` ("Kids Gym Lesson Planning")
- Added Google Sheet URL and CSVs to NotebookLM (web UI + CSVs)
- Copied CSVs to `/home/imre/projects/Gym/data/mygym_sheets/`
- Cross-referenced all My Gym activities against Plum Pudding equipment: 226 feasible, 162 blocked
- Agreed lesson structure (see above)
- Key decisions: no Adventures (solo teacher problem), sport of the week replaces it, tumbling every lesson, hip hop move in warm-up
- Imre has dance background (hip hop, street dance, break dance) — warm-up B is his
- Age group confirmed: school-aged, mostly 5–10
- Wrote full detailed lesson plan: `lessons/lesson_01_forward_roll.md`
- Skills created: `/gym-orient`, `/gym-wrap`

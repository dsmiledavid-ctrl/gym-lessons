# Changelog

## 2026-04-26 — Session 2

- **Done:**
  - Reformatted lesson_01 — no markdown tables, 2-page structure (reference card + exercise guide)
  - Web research across 8 categories: FMS, LTAD, gymnastics, soccer, basketball, volleyball, tennis, baseball, judo
  - Added 18 sources to NotebookLM (all status: ready)
  - Built and deployed web app at https://gym-lessons.vercel.app/
  - GitHub repo created: https://github.com/dsmiledavid-ctrl/gym-lessons
  - App: curriculum map view, lesson library, AI lesson generator (GPT-4o, 2-page output), password protection, try-again button
  - Queried NotebookLM: FMS/LTAD principles, all sport sequences, judo curriculum
  - Built `data/curriculum_map.json` with 12-lesson skeleton, sourced coaching cues, sport sequences
  - Corrected tumbling sequence from YMCA source: mule kicks + handstand come BEFORE cartwheel
  - Wired framework knowledge into GPT-4o lesson generator via curriculum_map.json injection

- **Discovered:**
  - Tumbling order correction: forward roll → backward roll → mule kicks → handstand → cartwheel (arm strength prerequisite)
  - YMCA: minimum 8 sessions per skill to move from initiation to acquisition phase
  - Backward roll cue: "pizza hands" by ears — push the floor away
  - Cartwheel: head touching mat is a dangerous error caused by insufficient arm strength
  - FMS: variable practice (mixing skills) beats blocked practice for long-term retention
  - Judo: ne-waza (ground work) 60–70% of time before any standing throws — safety principle
  - Imre is a former Hungarian youth judo champion

- **Still outstanding:**
  - Lesson 01 feedback (Teacher Notes not yet filled)
  - Lesson 02 not written
  - FMS findings not yet in curriculum_map: distributed practice, speed bursts (5–8 sec + 30 sec rest), maze games
  - "6 big size" equipment still unclear
  - Vercel DASHBOARD_PASSWORD env var needs setting
  - Favourite activity homepages not shared
  - Theme connection decision pending

## 2026-04-25 — Session 1

- **Done:**
  - Explored full filesystem for existing gym-related materials
  - Located My Gym Google Sheets database (multi-tab ingredient system)
  - Created NotebookLM notebook `a2e57998` ("Kids Gym Lesson Planning")
  - Added Google Sheet URL + all CSVs to NotebookLM
  - Copied all CSVs to `/home/imre/projects/Gym/data/mygym_sheets/`
  - Cross-referenced My Gym activity database against Plum Pudding equipment (226 feasible, 162 blocked)
  - Confirmed equipment list for the 9m×5m hard-floor gym room
  - Confirmed student group: school-aged, mostly 5–10 years old
  - Agreed on lesson structure (6 slots, 60 min, solo teacher — see situation doc)
  - Created project skills: `/gym-orient`, `/gym-wrap`
  - Wrote first full lesson plan: `lessons/lesson_01_forward_roll.md`

- **Discovered:**
  - Adventures not viable solo (setup/teardown requires a second person) → replaced with Sport of the Week
  - Puppets available at Plum Pudding but not appropriate for this age group (under-3 format)
  - Imre has dance background (hip hop, break dance, street dance) → warm-up B is a hip hop move every lesson
  - The Shuttle Run relay has a built-in "forward roll delivery" variation — used it as Round 5 to connect relay back to tumbling

- **Still outstanding:**
  - Lesson 01 feedback (running today)
  - "6 big size" equipment clarification
  - My Gym Japan lesson plan PDFs — not found yet
  - Favourite activity homepages
  - Theme connection decision (weekly themes vs. standalone)

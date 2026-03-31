PART 1 / 2 — PRD / PRODUCT SCOPE

Project Name:
Medication Adherence & Reminder System

Goal:
Build a simple but visually impressive, judge-friendly prototype website that helps patients remember and track medicines.

The website should:
- Clearly show the problem and solution
- Have a smooth, modern UI
- Include a premium scroll-based animation section (scrollytelling)
- Stay simple in logic so AI agents can build it without confusion

Core Problem:
Patients forget or skip medicines, leading to serious health issues.

Core Solution:
A simple system with reminders, tracking, and clear UI to improve adherence.

---

MAIN FEATURES (KEEP SIMPLE):

1. Add Medicine
- Name
- Time
- Dosage
- Notes

2. Reminder System (UI-based for prototype)
- Show upcoming medicines
- Highlight current medicine time

3. Tracking
- Mark as Taken / Missed
- Show simple history

4. Optional (only if simple):
- Basic family/doctor notification concept (UI only)

---

SCROLL-BASED EXPERIENCE (IMPORTANT FOR JUDGES):

Add ONE premium scrollytelling section in the landing page.

Concept:
Instead of a product explosion, use a "Medicine System Visualization"

Example idea:
- Pills / medicine kit / health system visually breaks apart and rebuilds
- Represents "chaos without reminders → organized with system"

---

SCROLL ANIMATION REQUIREMENTS:

- Use smooth scroll-linked animation
- Use Canvas for performance
- Use image sequence (frames)
- Animation should:
  → Start simple
  → Break into parts (problem stage)
  → Show complexity/confusion
  → Reassemble into clean system (solution stage)

---

SCROLL STRUCTURE:

0% Scroll:
"Never Miss Your Medicine Again"
(centered)

30% Scroll:
"Missing doses leads to serious risks"
(left side)
→ Visual starts breaking

60% Scroll:
"Track, remind, and stay consistent"
(right side)
→ Full breakdown / system view

90% Scroll:
"Simple. Smart. Reliable."
(centered)
→ Visual reassembles cleanly

---

TECH GUIDELINES (KEEP SIMPLE):

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion (only where needed)
- Canvas: for scroll animation (basic implementation only)
- Do NOT over-engineer logic
- Focus on smooth performance, no lag

---

UI/UX RULES:

- Dark mode design (clean and modern)
- Smooth scrolling
- No lagging
- Minimal but attractive
- Use attached images if helpful
- Make it look premium but simple internally

Attached assets path:
C:\Users\Yash Kumar\.agents

---

CONTINUITY SYSTEM (VERY IMPORTANT):

You MUST maintain a progress file.


Update it after EVERY step with:

- What was completed
- What was changed
- What files were modified
- What is pending
- Any errors found
- Any fixes applied
- Next steps

---

FORMAT OF PROGRESS FILE (AI-FRIENDLY):

Use simple structured format like:

STATUS:
- current stage

DONE:
- task 1
- task 2

FILES UPDATED:
- file name

PENDING:
- task

ISSUES:
- issue (if any)

NEXT:
- next action

Keep language short, clear, and machine-readable.

Purpose:
So another AI agent can continue WITHOUT restarting.

---

PART 2 / 2 — EXECUTION RULES

BUILD STRATEGY:

Step 1:
Create basic working website (no animation)

Step 2:
Add core features (add medicine, tracking UI)

Step 3:
Ensure everything works perfectly (NO ERRORS)

Step 4:
Add scroll animation section (carefully, no breaking)

Step 5:
Polish UI

---

SCROLL ANIMATION RULES (SIMPLIFIED):

- Use image sequence frames
- Load all images first
- Show loading spinner until ready
- Then start animation

Scroll logic:
- Map scroll (0 → 1) to frame index
- Render frames on canvas
- Keep logic simple and stable

---

IMPORTANT RESTRICTIONS:

- DO NOT make complex architecture
- DO NOT break existing features
- DO NOT restart project when updating
- ALWAYS build on top of current work
- ALWAYS update progress file

---

FINAL OUTPUT EXPECTATION:

A working prototype that:
- Solves a real problem
- Looks premium (due to scroll animation)
- Works smoothly
- Has no major errors
- Is easy to present to judges
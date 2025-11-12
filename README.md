# Personalized Health Tracker
Very simple site I'm building to track my iron, vitamin d supplement intake/ hydration and overall protein habits.
Note: I developed this project iteratively. I wrote the code, ran tests locally, and fixed bugs in small commits. To debug specific problems I consulted documentation, community resources, and used AI assisted debugging for hints, but I implemented, verified and adapted all logic myself. Below are the key milestones and references.

# Day 1:
- Made basic HTML pages (home, habits, about)
- Set up simple nav links

# Day 2: Backend start (Express + EJS)
- Created a minimal Express server in **backend/server.js**
- Set up **EJS** templates with a shared layout (**backend/views/layout.ejs**)
- Added a simple home view (**backend/views/home.ejs**)
- Served static CSS from **backend/public/style.css**
- Verified server runs locally at `http://localhost:3000`

# Day 3
- Added SQLite database (`journal.db`)
- Created table `habits` with:  
  `day`, `water_ml`, `took_iron`, `ate_meat`, `vitamin_d`
- Added `/habits` placeholder page
- Everything runs locally fine now

# Final Day: Full CRUD Functionality
- Added a form to **Create** new habit entries.
- Added a "Delete" button to **Delete** entries.
- Added a full "Edit" page to **Update** entries.
- Linked all 3 pages (Home, Habits, About).
- Deployed the live site to Render.

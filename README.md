# Personalized Health Tracker
This is a small site I built to track my iron intake, vitamin D, hydration and general protein habits. I put it together step by step, writing the code myself, testing things locally as well as fix up issues in small commits. Since I’m still a beginner, I used AI a lot to explain concepts, errors and general “why does this work like that?” moments. I also checked documentation and forums whenever I needed more context. Even with the help, I pieced everything together on my own and made sure I actually understood what I was adding before committing it. Below are the main milestones and the resources I used throughout the project.

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

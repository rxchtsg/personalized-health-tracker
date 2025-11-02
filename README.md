# Personalized Health Tracker
Very simple site I'm building to track my iron, vitamin d supplement intake/ hydration and overall protein habits.

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

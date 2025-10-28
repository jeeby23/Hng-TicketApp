# Hng-TicketApp
Readme # TicketApp - Vue.js Implementation

## Overview
This is the Vue 3 implementation of the Multi-Framework Ticket Web App. It implements Landing, Auth (Login/Signup), Dashboard, and Ticket Management (CRUD) using localStorage for simulated backend.

## Tech stack
- Vue 3 (Composition API)
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- LocalStorage-based mock services

## Setup
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## Example test credentials
- Email: `mujeeb@gmail.com`
- Password: `mujeeb`  
(Or signup a new account)

## Folder structure
(see organization in README — same structure as spec)

## Session token
- Session saved under `ticketapp_session` in localStorage.

## Notes on UI & Layout
- Max width: 1440px centered
- Wave hero implemented as `public/assets/hero-wave.svg` used in `WaveHero.vue`
- Decorative circles in `components/decorative/`

## Accessibility
- Semantic HTML, visible focus states, alt text, color contrast checks

## Known issues
- This is a localStorage mock only (no server). For production replace `services/*` with API calls.


# Fieldwork — Task OS

**Fieldwork** is a personal project task manager built as a Progressive Web App (PWA). It runs entirely in the browser, stores all data locally, requires no account, and works offline. Designed for project managers juggling multiple concurrent projects.

---

## Features

### Task Management
- **Eisenhower Matrix prioritization** — classify every task by two flags (Urgent / Important) and the app places it in the correct quadrant automatically: Do First, Schedule, Admin Time, or Backlog
- **Project organization** — create color-coded projects; filter all views by project from the sidebar
- **Recurring weekly tasks** — mark tasks as recurring and choose which days of the week they appear
- **Due dates** — assign deadlines to one-off tasks; overdue tasks are flagged in red
- **Estimated durations** — set time estimates in 15-minute increments; today's total estimated load is shown in the stats bar
- **Subtasks** — add a checklist of subtasks to any task; progress shown as a badge on the task card
- **Markdown notes** — write rich notes using Markdown (bold, italic, headings, lists, links, code); rendered inline on task cards

### Views
| View | Description |
|------|-------------|
| **Today** | Prioritized daily list (Q1→Q2→Q3→Q4) with carry-forward alerts and a 30-day completion chart |
| **Week** | Mon–Sun grid showing meetings, tasks, and an 8-hour capacity bar per day |
| **Timeline** | Drag-and-drop daily time-block scheduler with meeting blocks and a task pool |
| **Matrix** | Live Eisenhower 2×2 grid; drag tasks between quadrants to re-prioritize |
| **All Tasks** | Complete list grouped by project, sorted by quadrant |
| **Projects** | Manage projects and their color assignments |

### Planning Tools
- **Daily timeline** — time-block your day by dragging tasks from the pool onto an hour grid; meetings appear as navy blocks
- **Meeting blocks** — add meetings to any day with a title, start time, and duration; they appear in Week and Timeline views
- **Carry-forward alerts** — incomplete tasks from previous days surface at the top of Today with one-click options to reschedule or dismiss

### Productivity
- **Quick Capture** — press `N` or tap the floating `+` button to log a task in under five seconds
- **Search** — real-time full-text search across task titles, notes, and project names
- **Undo delete** — deleting a task shows a 5-second toast with an Undo button
- **Completion trends** — a 30-day bar chart at the bottom of Today tracks your daily output

### Notifications
- **Daily Task Briefing** — opt-in browser push notification at a time you choose; fires once per day when urgent tasks are waiting
- Works in active and background browser tabs on desktop; requires app to be open on mobile

### App
- **Dark mode** — toggle from Settings; preference is saved
- **Keyboard shortcuts** — full keyboard navigation (see table below)
- **Backup & restore** — download your data as JSON; restore from any backup file
- **PWA** — installable on desktop and mobile; works offline after first load

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `N` | Quick capture a task |
| `/` | Focus the search bar |
| `1` | Today view |
| `2` | Week view |
| `3` | Timeline view |
| `4` | Matrix view |
| `5` | All Tasks view |
| `6` | Projects view |
| `?` | Show shortcut reference |
| `Esc` | Close modal / clear search |

---

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Go to [github.com/new](https://github.com/new). Name it anything (`fieldwork`, `task-os`, etc.). Set visibility to **Public** (required for free GitHub Pages). Do not initialize with a README.

### 2. Push the files

```bash
cd /path/to/fieldwork-pwa   # the extracted folder

git init
git add .
git commit -m "Fieldwork v1.0"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages

In your repo: **Settings → Pages → Source → Deploy from a branch → `main` / `/ (root)`** → Save.

Your app will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/` within ~60 seconds.

### 4. Install as a PWA

- **Desktop (Chrome/Edge):** Click the install icon in the address bar, or browser menu → *Install Fieldwork*
- **Android (Chrome):** Three-dot menu → *Add to Home Screen*
- **iOS (Safari):** Share icon → *Add to Home Screen*

### Updating

```bash
# Edit files, then:
git add .
git commit -m "describe your change"
git push
```

To force all clients to pick up the new version, increment `CACHE` in `sw.js` (e.g. `fieldwork-v2`).

---

## File Structure

```
fieldwork-pwa/
├── index.html        The complete app — all HTML, CSS, and JavaScript
├── manifest.json     PWA manifest — name, icons, display mode
├── sw.js             Service worker — caching and notification click handling
├── icons/
│   └── icon.svg      App icon (2×2 Eisenhower grid)
├── .nojekyll         Tells GitHub Pages to skip Jekyll processing
└── README.md         This file
```

---

## Data & Privacy

All data is stored in your browser's `localStorage` under the key `fieldwork_v3`. Nothing is sent to any server. There is no account, no telemetry, and no third-party data sharing.

**Back up regularly:** Settings → Download Backup saves a timestamped JSON file. Restore it on any device via Settings → Restore from Backup. Clearing your browser data or switching browsers will lose your tasks unless you restore from a backup.

---

## Tech Stack

- Vanilla HTML, CSS, and JavaScript — no framework, no build step, no dependencies
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts (cached offline by service worker)
- Web App Manifest + Service Worker for PWA installability and offline support
- Notifications API for daily briefing push notifications

---

## License

MIT — use, modify, and deploy freely.

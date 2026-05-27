# Changelog

All notable changes to Busywork are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-05-22

Initial public release.

### Task Management

- **Eisenhower Matrix prioritization** — tasks are classified by two boolean flags (Urgent / Important) instead of a quadrant picker; the quadrant (Q1–Q4) is derived automatically and shown as a live preview during task entry
- **Custom quadrant labels** — Q3 is "Admin Time" (handled in scheduled project admin blocks, not delegated); Q4 is "Backlog" (done when bandwidth allows, not eliminated)
- **Project organization** — unlimited color-coded projects; a "Weekly Admin" system project is pre-seeded; projects can be added, edited, and deleted; deleting a project reassigns its tasks to Weekly Admin
- **Sidebar project filter** — filter all views to a single project; active task counts shown per project
- **Recurring weekly tasks** — mark a task as recurring and select which days of the week (Mon–Sun) it appears; completion resets each day
- **Due dates** — optional deadline on one-off tasks; overdue tasks are flagged in red
- **Estimated durations** — 15-minute increment duration picker with quick-select chips (15m through 4h) and a stepper; default is 15 minutes; today's total estimated workload shown in the stats bar
- **Subtasks** — lightweight checklist within a task; add, check off, and remove subtasks in the edit modal; progress shown as a badge (e.g., ☑ 2/4) on the task card; subtask changes are staged in the modal and committed only on Save
- **Markdown notes** — notes field accepts Markdown syntax; rendered inline on task cards below the metadata row; supports bold, italic, strikethrough, inline code, headings, bullet lists, links, and horizontal rules; raw textarea retained for editing with a Markdown syntax hint
- **Subtask progress indicator** — task cards show a colored ☑ N/N chip that turns green when all subtasks are complete
- **Scheduled timeline placement** — tasks can be placed on a specific date and time via the Timeline view; scheduledDate and scheduledTime are separate from dueDate

### Views

- **Today view** — prioritized daily list sorted Q1→Q2→Q3→Q4; recurring tasks for today's day of week and non-recurring tasks due on or before today are included; stats bar shows remaining count, completed count, urgent count, and total estimated time; "show completed" toggle
- **Week view** — Mon–Sun grid for any week; navigation arrows and "This Week" shortcut; each column shows meetings (navy chips) and task cards with quadrant color coding; capacity bar fills green up to 8 hours and turns red if exceeded; uses scheduled dates, recurring schedules, and due dates to populate each day
- **Timeline view** — scrollable daily time grid from 6 AM to 9 PM in 15-minute increments; meetings appear as navy blocks on the left lane, scheduled tasks as quadrant-colored blocks on the right lane; current time marker (red line) on today; drag tasks from the Task Pool panel onto the grid to schedule them; tasks snap to the nearest 15-minute slot with a ghost preview; "×" button removes a task from the timeline back to the pool; auto-scrolls to 8 AM on open; refreshes the current-time indicator every 60 seconds
- **Matrix view** — live 2×2 Eisenhower grid showing all active tasks; drag and drop between quadrants to reprioritize (updates urgent/important flags); axis labels and a "drag to reprioritize" hint; compact task cards with project tags
- **All Tasks view** — full task list grouped by project, sorted by quadrant within each project; "show completed" toggle
- **Projects view** — list all projects with active task counts; add, edit (name + color), and delete projects

### Meeting Management

- Add meetings to any date via the Timeline or Week view; fields: title, start time, duration (15 min – 4 hours), and optional notes
- Meetings appear in both Timeline (navy block with time range) and Week (meeting chip with time and truncated title)
- Edit or delete meetings from either view; changes reflected immediately

### Carry-Forward

- On every app load, non-recurring incomplete tasks with a past due date are detected
- An amber banner at the top of Today shows the count with a "Review" toggle
- Each overdue task is listed with how many days ago it was due, and two actions: **Schedule Today** (moves due date to today) or **Dismiss** (hides for the session)
- "Dismiss all" clears the banner for the session; the banner reappears on next load if tasks remain overdue

### Quick Capture

- Floating `+` button fixed to the bottom-right corner of every view; keyboard shortcut `N`
- Opens a minimal modal: large title input, color-coded project chips, Urgent and Important toggles
- `Enter` saves; `Escape` cancels; saves immediately with default duration (15 min), no due date, no recurrence
- A brief confirmation toast confirms the task was added

### Search

- Search bar in the header (keyboard shortcut `/` to focus)
- Real-time full-text search across task titles, notes, and project names
- Results displayed grouped by project, sorted by quadrant within each group
- Clears on `Escape`; returns to previous view when cleared

### Undo Delete

- Deleting a task no longer shows a confirmation dialog
- A toast appears at the bottom of the screen: `"Task title" deleted` with an **Undo** button and a close ×
- Undo restores the task at its original list position
- Toast auto-dismisses after 5 seconds

### Completion Trends

- 30-day SVG bar chart shown at the bottom of the Today view
- Tracks recurring tasks via their per-day completedDates; one-off tasks via a completedAt timestamp set when checked off
- Bars colored in Hyland green; today's bar highlighted; current-day marker as a dashed line
- Summary stats: total completed and average per day over the 30-day window
- Chart only renders when at least one completion exists in the window

### Push Notifications

- Opt-in daily notification configured in Settings → Notifications
- Fields: enabled toggle, configurable reminder time (time picker)
- Uses the Web Notifications API; requests browser permission on first enable
- On desktop: delivered via the service worker, works in background tabs; on mobile: requires the app to be open
- Fires at most once per day; skips the day if no urgent tasks exist
- "Test" button sends an immediate test notification to confirm setup
- Permission status indicator (Allowed / Blocked / Not requested) with a "Grant Permission" button

### Keyboard Shortcuts

- `N` — Quick Capture
- `/` — Focus search bar
- `1–6` — Switch views (Today, Week, Timeline, Matrix, All Tasks, Projects)
- `?` — Open shortcut reference modal
- `Esc` — Close modals / clear search

### Settings

- **Dark mode** — toggles a comprehensive dark theme (deep navy backgrounds, same Hyland green accent); preference persisted in localStorage
- **Download Backup** — exports all projects, tasks, and meetings as a timestamped JSON file
- **Restore from Backup** — reads any Busywork JSON export; confirms before overwriting; auto-migrates old data formats

### Design

- Hyland-aligned visual identity: deep navy (`#0d1f40`) header and sidebar, emerald green (`#00b67a`) primary accent, white card surfaces on a soft gray background
- DM Sans typeface throughout
- Card-based layout with subtle shadows, hover lift animations, and rounded corners
- Quadrant colors: Q1 red, Q2 green, Q3 amber, Q4 slate — calibrated for legibility on both light and dark backgrounds
- Dark mode inverts surfaces to deep navy while preserving brand green
- Fully responsive; sidebar hidden on mobile

### PWA & Offline

- Web App Manifest (`manifest.json`) with SVG icon, standalone display mode, Hyland navy theme color
- Service worker (`sw.js`) with cache-first strategy for same-origin assets and network-first for cross-origin (Google Fonts); offline fallback to `index.html`
- Service worker handles `notificationclick` to focus or open the app when a notification is tapped
- `.nojekyll` file included for correct GitHub Pages deployment
- Data migration: loads and upgrades task objects from any prior `busywork_v1`, `busywork_v2`, or `busywork_v3` localStorage format

### Technical

- Single-file application: all HTML, CSS, and JavaScript in `index.html` — no build step, no bundler, no framework
- State managed in a plain JS object `S`; persisted to `localStorage` under key `busywork_v3`
- Notification preferences stored separately under `busywork_notif`
- All task IDs generated with a timestamp + random suffix (`uid()`)
- Quadrant is always computed (`getQ(task)`) from `task.urgent` and `task.important` flags; never stored redundantly
- `migrateTask()` upgrades any task object to the current schema on load, backfilling all optional fields with safe defaults

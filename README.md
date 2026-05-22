# Fieldwork — Task OS

A personal project task manager built as a Progressive Web App (PWA). Features Eisenhower Matrix prioritization, recurring weekly admin tasks, per-project task tracking, dark mode, and offline support.

---

## Deploy to GitHub Pages in 5 steps

### 1. Create a new GitHub repository

Go to [github.com/new](https://github.com/new) and create a repository. You can name it anything — `fieldwork`, `task-os`, etc.

> **Tip:** If you name it `<your-username>.github.io`, the app will be served at `https://<your-username>.github.io/` (root). Any other name serves it at `https://<your-username>.github.io/<repo-name>/`.

### 2. Push these files

```bash
# Clone your new empty repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Copy the contents of this folder into the repo root
cp -r /path/to/fieldwork-pwa/* .

# Commit and push
git add .
git commit -m "Initial deploy"
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

GitHub will show you the live URL — usually within 1–2 minutes.

### 4. Visit the live URL

Open `https://<your-username>.github.io/<repo-name>/` in your browser. The app should load immediately.

### 5. Install as a PWA

**On Android (Chrome):**
Tap the three-dot menu → *Add to Home Screen*

**On iOS (Safari):**
Tap the Share icon → *Add to Home Screen*

**On Desktop (Chrome/Edge):**
Look for the install icon (⊕) in the address bar, or go to the browser menu → *Install Fieldwork*

---

## File structure

```
fieldwork-pwa/
├── index.html      ← The full app (single-page, no build step needed)
├── manifest.json   ← PWA manifest: name, icons, colors, display mode
├── sw.js           ← Service worker: caches assets for offline use
├── icons/
│   └── icon.svg    ← App icon (used for home screen, tab, splash screen)
└── README.md       ← This file
```

---

## Updating the app

To push an update:

```bash
# Edit files locally, then:
git add .
git commit -m "Update: describe your change"
git push origin main
```

GitHub Pages redeploys automatically. The service worker will pick up the new version on next load.

> **Cache note:** If users have the PWA installed and aren't seeing updates, they can close and reopen the app, or go to browser Settings → clear site data for the URL. You can also increment the `CACHE` version string in `sw.js` (e.g., `fieldwork-v2`) to force all clients to refresh.

---

## iOS icon note

iOS Safari does not support SVG `apple-touch-icon` links — it requires a PNG. The app will still work and install on iOS, but the home screen icon may appear as a screenshot of the page rather than the custom icon.

To fix this for iOS:
1. Convert `icons/icon.svg` to `icons/apple-touch-icon.png` at **180×180px** (use any SVG-to-PNG converter)
2. Add this line to the `<head>` of `index.html`:
   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png">
   ```
3. Push the new file and the updated `index.html`

---

## Data & privacy

All data is stored in your browser's `localStorage` — nothing is sent to any server. Use **Settings → Download Backup** regularly to save a JSON copy of your tasks and projects. You can restore from backup on any device via **Settings → Restore from Backup**.

---

## Tech stack

- Vanilla HTML/CSS/JavaScript — no framework, no build step, no dependencies
- Google Fonts (DM Sans) — loaded from CDN, cached by service worker after first visit
- localStorage for persistence
- Web App Manifest + Service Worker for PWA installability and offline support

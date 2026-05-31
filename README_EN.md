# Bookmark Dashboard 🌐

A single-file, serverless Web bookmark portal that automatically generates a modern, functional dashboard simply by writing standard "Markdown". 
With a local-first design, all your registered links and customized settings are securely saved inside your own browser's LocalStorage, requiring no external databases.

---

## ✨ Features

* **Single-File Architecture (SPA)**: Zero installation or server setup required. Simply open the single HTML file in any browser to get a blazing-fast dashboard.
* **Local Auto-Screenshot Capture (New!)**: Automatically generates and caches website homepages locally inside your project folder using a local headless Google Chrome browser—bypassing any third-party API limits or costs.
* **Dual-Tier Ultra-Wide Search Bar**: Leverages 100% of the screen width to perform instant, cross-sectional incremental searches across titles, URLs, and notes.
* **Hybrid Multi-Layout System**: Instantly switch between "Grid View (Table)" for detailed management and "Tile View (Visual Card)" for a clean, graphical layout.
* **Individual Card Images & Custom Visuals**: Supports setting unique images (Web URLs or local relative paths) for each tile. Images automatically fit beautifully using `object-fit: cover`.
* **Robust Error Fallback**: If an image link is broken or a local path is temporarily missing, the system automatically detects the error and falls back to a clean Bootstrap Icon without breaking the layout.
* **Dynamic Sorting Options**: Easily reorder links on the fly by "Order written", "Alphabetical (A-Z)", or "Click count".
* **160+ Built-in Icon Picker**: Browse and search a curated catalog of icons. Clicking an icon automatically rewrites the corresponding Markdown code in the background.
* **Canvas Background Compression**: Upload your favorite wallpapers as a background with built-in client-side compression to bypass browser storage limits.
* **100% Private & Secure**: Zero tracking or external data transmission. Completely private to your local browser session.

---

## 📸 Automatic Screenshot Capture Feature

This application includes a feature to automatically capture screenshots of bookmarked websites and render them as tile images when no custom image is specified. You can choose between two modes:

### 1. Local Mode (Recommended - 100% Free & Unlimited)
Saves and caches screenshots inside a local `./screenshots/` directory. It uses your PC's local headless Google Chrome to capture the screen, bypassing any external API limits and ensuring complete privacy.

* **Prerequisites**: Node.js and Google Chrome must be installed on your PC.
* **How to run**:
  1. Open your terminal in this directory and launch the zero-dependency local server:
     ```bash
     node server.js
     ```
  2. Open your preferred browser and visit `http://localhost:3000`.
  3. Turn on the **"スクショ自動取得" (Auto Screenshot)** toggle switch and select **"ローカル" (Local)**.
  4. Screenshots will be automatically captured, cached inside the `./screenshots/` folder, and served.
  5. **On-Demand Recapture**: Click the circular refresh icon on the top-left of the tile (or on the table row) to trigger a headless Chrome recapture and instantly refresh the screenshot on-demand.

### 2. Cloud Mode (Thum.io Fallback)
Uses the public `Thum.io` website screenshot API to dynamically render homepages even without running the local server or when opening the HTML directly (via `file:///`). (Subject to Thum.io's standard monthly limits).

---

## 🚀 How to Use

### 1. Launching the App
* **Via Local Server (Recommended - enables full local screenshot capabilities)**:
  1. Open your terminal, run `node server.js`, and open `http://localhost:3000` in your browser.
* **Standalone Static File**:
  1. Download `spa_bookmark_dashboard.html` from this repository and double-click to open it directly in any preferred browser.

### 2. Managing & Adding Bookmarks
1. Click the **"Open Editor"** button in the top-right corner.
2. Write or paste your bookmarks into the fullscreen text area following the simple syntax rules below.
3. Click **"Close Editor & View Dashboard"** to instantly generate your tabs and bookmark cards.

#### 📝 Markdown Syntax Rules
```markdown
# 🌐 Category Name (Define a category/tab by starting a line with a '#' followed by a space)
- [Link Title](URL) {icon: icon-name} {img: image-path} : Your Note (Add descriptions here)

# 💻 Development Tools (Multiple categories automatically become distinct tabs)
- [GitHub](https://github.com) {icon: github} : Source code hosting platform.
- [Google](https://google.com) {icon: google} {img: https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300} : Example with an online image preset.
- [Local App](http://localhost:8080) {img: ./my-icon.png} : Example referencing a local file in the same directory.
```

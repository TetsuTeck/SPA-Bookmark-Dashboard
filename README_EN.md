# Bookmark Dashboard 🌐

A single-file, serverless Web bookmark portal that automatically generates a modern, functional dashboard simply by writing standard "Markdown". 
With a local-first design, all your registered links and customized settings are securely saved inside your own browser's LocalStorage, requiring no external databases.

---

## ✨ Features

* **Single-File Architecture (SPA)**: Zero installation or server setup required. Simply open the single HTML file in any browser to get a blazing-fast dashboard.
* **Zero Dependency Local Server**: The companion Node.js server for capturing screenshots relies strictly on Node's built-in standard libraries. There is no need to run `npm install` or manage heavy third-party packages.
* **Local Auto-Screenshot Capture**: Automatically generates and caches website homepages locally inside your project folder using a local headless Google Chrome browser—bypassing any third-party API limits or costs.
* **【NEW】Offline & Server-Stopped Screenshot Persistence**:
  - Even after stopping `server.js` or when opening the dashboard HTML directly via the `file://` protocol in your browser, the dashboard will directly load and display your cached screenshots (`screenshots/`) purely client-side without them disappearing.
* **Dual-Tier Ultra-Wide Search Bar**: Leverages 100% of the screen width to perform instant, incremental searches across titles, URLs, and notes.
* **Hybrid Multi-Layout System**: Instantly switch between "Grid View (Table)" for detailed management and "Tile View (Visual Card)" for a clean, graphical layout (scalable from 2 up to 10 columns).
* **Individual Card Images & Custom Visuals**: Supports setting unique images (Web URLs or local relative paths) for each tile. 
* **Robust Error Fallback**: If an image link is broken or a local path is temporarily missing, the system automatically detects the error and falls back to a clean Bootstrap Icon without breaking the layout.
* **Dynamic Sorting Options**: Easily reorder links on the fly by "Order written", "Alphabetical (A-Z)", or "Click count".
* **160+ Built-in Icon Picker**: Browse and search a curated catalog of icons. Clicking an icon automatically rewrites the corresponding Markdown code in the background.
* **Canvas Background Compression**: Upload your favorite wallpapers as a background with built-in client-side compression to bypass browser storage limits.
* **100% Private & Secure**: Zero tracking or external data transmission. Completely private to your local browser session.

---

## 📥 Installation

This tool is designed to be local-first and zero-dependency, making setup extremely fast and simple.

### Prerequisites
1. **Node.js** (v14+ recommended) - Only required if you wish to use the automatic local screenshot capture feature.
2. **Google Chrome** - Used by the server to capture screenshots in headless mode.
   - *Note*: By default, the server is configured for Windows and looks at the standard path (`"C:\Program Files\Google\Chrome\Application\chrome.exe"`). If you are using a different OS or a custom installation path, simply open `server.js` and edit `CHROME_PATH` (line 11) to point to your Chrome executable.

### Setup Instructions
1. Download or clone all files (`spa_bookmark_dashboard.html`, `server.js`) into any folder on your computer.
2. **No installation required!** You do not need to run `npm install`. The server is ready to run immediately.

---

## 📸 Automatic Screenshot Capture Feature

This application includes a feature to automatically capture screenshots of bookmarked websites and render them as cached tile images when no custom image is specified.

### How It Works Under the Hood
1. The dashboard client-side generates a unique MD5 hash for each bookmarked URL.
2. The image element attempts to load from the local relative path: `screenshots/<hash>.png`.
3. If the image exists, **it will load successfully even if the local Node.js server is stopped** (including when opened via `file:///`).
4. If the image is not found (i.e. not captured yet) and **"スクショ自動取得" (Auto Screenshot)** is toggled ON, the client detects the loading error and automatically requests the local Node server API (`http://localhost:3000/api/screenshot`) to launch a headless Chrome browser, capture the page on-the-fly, save it to the local folder, and display it.

---

## 🚀 How to Use

### 1. Launching the App

#### A. Via Local Server (Recommended - enables auto-screenshot capabilities)
1. Open your terminal in this project directory and start the local server:
   ```bash
   node server.js
   ```
2. Open your preferred browser and visit `http://localhost:3000`.
3. Turn on the **"スクショ自動取得" (Auto Screenshot)** toggle switch in the dashboard header.

#### B. Standalone Static Mode
1. Drag and drop `spa_bookmark_dashboard.html` directly into any web browser (the URL in your address bar will start with `file:///`).
2. *Note*: In this mode, any screenshots already saved inside your local `screenshots/` directory will still display perfectly. However, new captures for newly added bookmarks will not be triggered automatically.

---

### 2. Managing & Adding Bookmarks
1. Click the **"Open Editor"** (or **"エディタを開く"**) button in the top-right corner.
2. Write or paste your bookmarks into the fullscreen text area following the simple Markdown syntax rules below.
3. Click **"Close Editor & View Dashboard"** to instantly generate your tabs and bookmark cards. Your changes are automatically saved to your browser.

#### 📝 Markdown Syntax Rules
```markdown
# 🌐 Category Name (Define a category/tab by starting a line with a '#' followed by a space)
- [Link Title](URL) {icon: icon-name} {img: image-path} : Your Note (Add descriptions here)

# 💻 Development Tools (Multiple categories automatically become distinct tabs)
- [GitHub](https://github.com) {icon: github} : Source code hosting platform.
- [Google](https://google.com) {icon: google} {img: https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300} : Example with an online image preset.
- [Local App](http://localhost:8080) {img: ./my-icon.png} : Example referencing a local file in the same directory.
```

---

### 3. Extra Features & Controls

* **On-Demand Capture & Refresh**:
  Hover over any bookmark tile and click the circular "refresh" icon on the top-left (or on the table row) to manually trigger a headless Chrome recapture and instantly refresh the screenshot.
* **Custom Backgrounds**:
  Use the background thumbnail circles in the header to switch wallpapers. Click the `+` thumbnail to upload your own image (it will be automatically optimized client-side and saved to your LocalStorage).
* **Dark / Light Theme Toggle**:
  Click the sun/moon icon in the header to instantly switch between sleek glassmorphic dark mode and clean light mode.

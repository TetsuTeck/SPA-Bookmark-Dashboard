# Bookmark Dashboard 🌐

A single-file, serverless Web bookmark portal that automatically generates a modern, functional dashboard simply by writing standard "Markdown". 
With a local-first design, all your registered links and customized settings are securely saved inside your own browser's LocalStorage, requiring no external databases.

---

## ✨ Features

* **Single-File Architecture (SPA)**: Zero installation or server setup required. Simply open the single HTML file in any browser to get a blazing-fast dashboard.
* **Dual-Tier Ultra-Wide Search Bar**: Leverages 100% of the screen width to perform instant, cross-sectional incremental searches across titles, URLs, and notes.
* **Hybrid Multi-Layout System**: Instantly switch between "Grid View (Table)" for detailed management and "Tile View (Visual Card)" for a clean, graphical layout.
* **Individual Card Images & Resizing**: Supports setting unique images (Web URLs or local relative paths) for each tile. Images automatically fit beautifully using `object-fit: cover`.
* **Robust Error Fallback**: If an image link is broken or a local path is temporarily missing, the system automatically detects the error and falls back to a clean Bootstrap Icon without breaking the layout.
* **Dynamic Sorting Options**: Easily reorder links on the fly by "Order written", "Alphabetical (A-Z)", or "Click count".
* **160+ Built-in Icon Picker**: Browse and search a curated catalog of icons. Clicking an icon automatically rewrites the corresponding Markdown code in the background.
* **Canvas Background Compression**: Upload your favorite wallpapers as a background with built-in client-side compression to bypass browser storage limits.
* **100% Private & Secure**: Zero tracking or external data transmission. Completely private to your local browser session.

---

## 🚀 How to Use

### 1. Launching the App
1. Download `index.html` from this repository (or copy the entire source code into a local file).
2. Simply double-click or drag-and-drop `index.html` into your preferred Web browser (Google Chrome, Edge, Safari, etc.).

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
- [Google](https://google.com) {icon: google} {img: [https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300](https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300)} : Example with an online image preset.
- [Local App](http://localhost:8080) {img: ./my-icon.png} : Example referencing a local file in the same directory.

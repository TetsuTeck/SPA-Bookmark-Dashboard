const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');
const urlModule = require('url');

const PORT = 3000;
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const SPA_FILE = path.join(__dirname, 'spa_bookmark_dashboard.html');
const CHROME_PATH = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"`;

// screenshotsディレクトリの自動作成
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  // CORS ヘッダーの付与（file:///等からのクロスドメインアクセスも許容）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = urlModule.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // 1. メインダッシュボード画面の配信
  if (pathname === '/' || pathname === '/index.html') {
    if (fs.existsSync(SPA_FILE)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(SPA_FILE).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('ダッシュボードHTMLファイルが見つかりません。');
    }
    return;
  }

  // 2. ローカルに保存されたスクリーンショットの静的ファイル配信
  if (pathname.startsWith('/screenshots/')) {
    const filename = path.basename(pathname);
    const filepath = path.join(SCREENSHOTS_DIR, filename);
    if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(filepath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('画像ファイルが存在しません。');
    }
    return;
  }

  // 3. ヘッドレスChromeによるスクリーンショット生成・取得API
  if (pathname === '/api/screenshot') {
    const targetUrl = parsedUrl.query.url;
    const forceRefresh = parsedUrl.query.refresh === 'true';
    const noCapture = parsedUrl.query.nocapture === 'true';

    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('URLパラメータを指定してください。');
      return;
    }

    try {
      // URLからMD5ハッシュを作成して一意のファイル名を決定
      const hash = crypto.createHash('md5').update(targetUrl).digest('hex') + '.png';
      const filepath = path.join(SCREENSHOTS_DIR, hash);

      // キャッシュが存在し、かつリフレッシュ要求がない場合は保存済みファイルを即座に返す
      if (fs.existsSync(filepath) && !forceRefresh) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream(filepath).pipe(res);
        return;
      }

      // キャッシュが存在せず、かつ新規撮影を行わない（nocapture=true）場合は404を返す
      if (noCapture) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('キャッシュが見つかりません。新規撮影は無効化されています。');
        return;
      }

      // ヘッドレスChromeを起動してスクリーンショットを撮影
      console.log(`[Screenshot] 撮影中: ${targetUrl} -> ${hash}`);
      const cmd = `${CHROME_PATH} --headless=new --screenshot="${filepath}" --window-size=1280,800 "${targetUrl}"`;
      
      // execSyncを実行（タイムアウト15秒）
      execSync(cmd, { stdio: 'ignore', timeout: 15000 });

      if (fs.existsSync(filepath)) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream(filepath).pipe(res);
      } else {
        throw new Error('Chromeプロセスは終了しましたが、画像ファイルが生成されませんでした。');
      }
    } catch (error) {
      console.error(`[Error] キャプチャ失敗 (${targetUrl}):`, error.message);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`スクリーンショットの取得に失敗しました: ${error.message}`);
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('ページが見つかりません。');
});

server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  SPA Bookmark Dashboard ローカルサーバー起動完了！`);
  console.log(`  ダッシュボードURL: http://localhost:${PORT}`);
  console.log(`  保存先フォルダ: ${SCREENSHOTS_DIR}`);
  console.log(`==================================================`);
});

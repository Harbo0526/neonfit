/* NEON FIT · Service Worker — 离线缓存 */
// ⚠️ 每次发版更新 index.html 时，必须把下面 CACHE 的版本号 +1（如 v3→v4），否则手机端不会重新拉取最新页面！
const CACHE = 'neonfit-v3.1';   // 每次发版改此版本号，强制更新缓存（v2→v3→v4…）
const ASSETS = ['./', './index.html', './404.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 收到 SKIP_WAITING → 立即接管页面（配合前端"发现新版本"提示条）
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    // 网络优先：先尝试拉最新文件，失败再用缓存兜底（保证每次拿到最新版）
    fetch(e.request)
      .then(resp => {
        const cp = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, cp));
        return resp;
      })
      .catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
  );
});

// Service Worker — n0v isteklerine Patron referer ekle
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  
  // Sadece n0v stream sunucusu isteklerini yakala
  if (url.indexOf('n0v.d72577a9dd0ec34.sbs') === -1) return;
  
  e.respondWith(
    fetch(e.request, {
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Referer': 'https://patronizle16.cfd/',
        'Origin': 'https://patronizle16.cfd'
      }
    }).catch(function(err) {
      console.error('[SW] Fetch failed:', err);
      return new Response('Stream error', { status: 503 });
    })
  );
});

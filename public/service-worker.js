
// Service Worker for Kalmunai Connect PWA

const CACHE_NAME = 'kalmunai-connect-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/src/App.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - Cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        // Make network request and cache the response
        return fetch(fetchRequest).then(
          response => {
            // Check if valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Don't cache API calls
                if (!event.request.url.includes('/api/')) {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          }
        );
      })
      .catch(() => {
        // If both cache and network fail, show a generic fallback
        if (event.request.url.indexOf('/api/') !== -1) {
          // Return a custom offline response for API requests
          return new Response(JSON.stringify({ 
            success: false, 
            message: 'You are currently offline. Please check your connection.' 
          }), {
            headers: {'Content-Type': 'application/json'}
          });
        }
        
        // For page navigations, show an offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Push notification support
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/notification-badge.png',
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Kalmunai Connect', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  // Open the app and navigate to a specific page when notification is clicked
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Function to sync forms when back online
async function syncForms() {
  try {
    // Get all saved form data from IndexedDB
    const offlineForms = await getOfflineForms();
    
    const promises = offlineForms.map(async form => {
      try {
        // Attempt to send each form
        const response = await fetch(form.url, {
          method: form.method,
          headers: form.headers,
          body: form.body
        });
        
        if (response.ok) {
          // If successful, remove from IndexedDB
          await removeFormFromOfflineStorage(form.id);
        }
      } catch (error) {
        console.error('Failed to sync form:', error);
      }
    });
    
    await Promise.all(promises);
  } catch (error) {
    console.error('Failed to sync forms:', error);
  }
}

// These are placeholder functions for IndexedDB operations that would be implemented in actual usage
function getOfflineForms() {
  return [];
}

function removeFormFromOfflineStorage(id) {
  return Promise.resolve();
}

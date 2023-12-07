
// Example: Caching (Optional, based on your PWA requirements)
self.addEventListener('install', event => {
  // Cache operations
});

self.addEventListener('fetch', event => {
  // Respond with cached resources or go to network
});

// Push Notification Handling
self.addEventListener('push', event => {
  const data = event.data.json(); // Assuming the payload is JSON

  const title = data.title || 'Default Title';
  const options = {
    body: data.body || 'Default message body',
    icon: '/next.svg', // Optional: Path to an icon
    badge: '/vercel.svg', // Optional: Path to a badge image
    // Other notification options
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Event Handling
self.addEventListener('notificationclick', event => {
  event.notification.close(); // Close the notification

  // Perform an action upon notification click, like navigating to a URL
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/'); // Open your site's main page, or a specific URL
      }
    })
  );
});

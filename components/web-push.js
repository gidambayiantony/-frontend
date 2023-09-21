// web-push.js code (subscribing users and sending notifications)
function subscribeToWebPushNotifications() {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      registration.pushManager.subscribe({
        userVisibleOnly: true
      })
        .then(function(subscription) {
          // Send the subscription to your web push notification service provider.
        })
        .catch(function(error) {
          // Handle the error.
        });
    })
    .catch(function(error) {
      // Handle the error.
    });
}

function sendWebPushNotification(subscription, payload) {
  // Send the payload to your web push notification service provider.
}


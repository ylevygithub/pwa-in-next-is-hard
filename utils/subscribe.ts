

export async function subscribeToPushNotifications(): Promise<PushSubscription> {
  const sw = await navigator.serviceWorker.ready;
  const pushSubscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BLJwjQOdNTRdC8st92bBR9wMDu6I6OSJwkHnZWzp6JhsbSuekyF3nXWY4zThuSP4IPiBMIcecufAIHQxyzpnFng', // Replace with your public VAPID key
  });
  // Here, you would send 'pushSubscription' to your backend
  return pushSubscription;
}

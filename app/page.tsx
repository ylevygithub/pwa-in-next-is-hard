"use client"

import { callApiRoute } from '@/utils/apiCalls';
import { subscribeToPushNotifications } from '@/utils/subscribe';
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Or some placeholder content
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration: ServiceWorkerRegistration) => {
        console.log('Service Worker Registered', registration);
      })
      .catch((error: any) => {
        console.log('Service Worker registration failed:', error);
      });
  }
  const handleSubscribeClick = () => {
    subscribeToPushNotifications()
      .then(subscription => {
        sendSubscriptionToServer(subscription)
          .then(response => console.log(response.message))
          .catch(err => console.error('Error sending subscription to server:', err));
      })
      .catch(err => console.error('Push subscription error: ', err));
  };

  async function sendSubscriptionToServer(subscription: PushSubscription) {
    const response = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
  
    return response.json();
  }

  // document.getElementById('subscribeButton')!.addEventListener('click', () => {
  //   subscribeToPushNotifications()
  //     .then(subscription => {
  //       sendSubscriptionToServer(subscription)
  //         .then(response => console.log(response.message))
  //         .catch(err => console.error('Error sending subscription to server:', err));
  //     })
  //     .catch(err => console.error('Push subscription error: ', err));
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button id="subscribeButton" onClick={handleSubscribeClick}>Subscribe to Notifications</button>
        </div>
      </div>

    </main>
  )
}

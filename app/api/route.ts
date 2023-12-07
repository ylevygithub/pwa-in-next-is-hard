// import * as webpush from 'web-push';


// VAPID keys (Voluntary Application Server Identification)
const publicKey: string = 'BLJwjQOdNTRdC8st92bBR9wMDu6I6OSJwkHnZWzp6JhsbSuekyF3nXWY4zThuSP4IPiBMIcecufAIHQxyzpnFng';
const privateKey: string = '2UH_PsRuikXi8AuX0jD67c6FtaZaZojmXma_LEMmQ2E';

// webpush.setVapidDetails(
//   'mailto:yaacov.levy@epitech.eu',
//   publicKey,
//   privateKey
// );

// // Define the type for your push subscription object
// interface PushSubscription {
//   endpoint: string;
//   keys: {
//     p256dh: string;
//     auth: string;
//   };
// }

// // Example of a push subscription object, replace this with the one retrieved from your database
// const pushSubscription: PushSubscription = {
//   endpoint: 'http://localhost:3000/',
//   keys: {
//     p256dh: '...',
//     auth: '...'
//   }
// };

// const payload: string = JSON.stringify({ title: 'Notification Title', body: 'Notification body' });



// export async function POST() {
//   webpush.sendNotification(pushSubscription, payload)
//   .catch((error: any) => console.error(error));
// }






import * as webpush from 'web-push';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

webpush.setVapidDetails(
  'mailto:yaacov.levy@epitech.eu',
  publicKey,
  privateKey
);

// Define a function to send notifications
function sendNotification(subscription: webpush.PushSubscription, data: any): Promise<webpush.SendResult> {
  return webpush.sendNotification(subscription, JSON.stringify(data));
}

// Example usage
const payload: string = JSON.stringify({ title: 'Notification Title', body: 'Notification body' });
// const pushData = { title: 'Hello', body: 'World' };
const storedSubscription = {}; // Replace with the stored subscription object

/** POST
  * @param req - The Request object.
  * @returns The response object containing the product and user details.
*/
// export default async function POST(){
//       // Store the subscription object
//     const subscription = req.body;
//     // You might want to associate this subscription with a specific user
//     sendNotification(storedSubscription as webpush.PushSubscription, payload)
//     .then(res => console.log('Notification sent', res))
//     .catch(error => console.error('Error sending notification', error));
    
//     // Respond with success
//     res.status(200).send.('Subscription received successfully');
// }

export async function POST() {
  const res = sendNotification(storedSubscription as webpush.PushSubscription, payload)
  .then(res => console.log('Notification sent', res))
  .catch(error => console.error('Error sending notification', error));

  // const data = await res.json()
 
  // return Response.json(data)
}
import { getMessaging, onMessage, getToken } from 'firebase/messaging'
import { app } from './firebase'

const messaging = getMessaging(app);
const messageVapidKey = 'BJfxxfJiESlTO-67hfXlr8N6cXeGC54-TO2fIIjey1SKEJQ2SPIMBHQzFvcLQQ16F-vVUTprsJnoJQiB3IVL1Wk'

export const getMessagingToken = async () => {
  const token = await getToken(messaging, {
    vapidKey: messageVapidKey,
  }).catch((e) => {
    console.log('Error generating the token: ', e)
    return null
  })
  return token
}

export const onMessageRecieved = (callback) => {
  onMessage(messaging, (message) => {
    callback(message)
  })
}

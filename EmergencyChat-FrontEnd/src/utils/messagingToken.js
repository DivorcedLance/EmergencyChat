import { onMessage, getToken } from 'firebase/messaging'
import { messaging, messageVapidKey } from './firebase'

export const getMessagingToken = async () => {
  const token = await getToken(messaging, {
    vapidKey: messageVapidKey,
  }).catch((e) => {
    console.log('Error al generar token: ', e)
    return null
  })
  return token
}

export const onMessageRecieved = (callback) => {
  onMessage(messaging, (message) => {
    callback(message)
  })
}

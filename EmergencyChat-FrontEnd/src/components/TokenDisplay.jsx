import { useEffect, useState } from 'react'

import { getMessagingToken, onMessageRecieved } from '../utils/firebaseMessaging'

export function TokenDisplay() {

  const [messagingToken, setMessagingToken] = useState('')

  const activarMensajes = async () => {
    setMessagingToken(await getMessagingToken())
  }

  const sendDesktopNotification = (title, body) => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification')
      return 
    }
    if (Notification.permission === 'granted') {
      new Notification(title, { body })
    }
  }

  useEffect(() => {
    onMessageRecieved((message) => {
      console.log('Message recieved: ', message)
      sendDesktopNotification(message.notification.title, message.notification.body)
    })
  }, [])

  return (
    <>
      <h1>TokenDisplay</h1>
      <h2>{messagingToken}</h2>

      <button onClick={activarMensajes}> Recibir notificaciones</button>
    </>
  )
}

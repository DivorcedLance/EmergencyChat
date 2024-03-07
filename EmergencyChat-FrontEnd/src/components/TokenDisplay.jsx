import { useEffect, useState } from 'react'

import { getMessagingToken, onMessageRecieved } from '../utils/firebaseMessaging'

export function TokenDisplay() {

  const [messagingToken, setMessagingToken] = useState('')

  useEffect(() => {
    activarMensajes();
  }, [])

  const sendMessagingToken = (messagingToken) => {
    fetch('http://localhost:3001/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messagingToken })
    })
  }

  const activarMensajes = async () => {
    setMessagingToken(await getMessagingToken())
    navigator.clipboard.writeText(messagingToken)
    // sendMessagingToken(messagingToken)
  }

  useEffect(() => {
    onMessageRecieved((message) => {
      console.log('Message recieved: ', message)
    })
  }, [])

  return (
    <>
      <h1>TokenDisplay</h1>
      <h2>{messagingToken}</h2>

    </>
  )
}

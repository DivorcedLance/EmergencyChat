import { useEffect, useState } from 'react'

import { getToken, onMessage } from 'firebase/messaging'

import { messaging } from '../utils/firebase'
import { messageVapidKey } from '../utils/apiKeys'

export function TokenDisplay() {
  const [displayToken, setDisplayToken] = useState('')

  const activarMensajes = async () => {
    const token = await getToken(messaging, {
      vapidKey: messageVapidKey,
    }).catch((e) => {
      console.log('Error al generar token: ', e)
    })

    if (token) {
      console.log('Token:', token)
      setDisplayToken(token)
    } else {
      console.log('No hay token disponible')
    }
  }

  useEffect(() => {
    onMessage(messaging, (message) => {
      console.log('tu mensaje:', message)
    })
  }, [])

  return (
    <>
      <h1>TokenDisplay</h1>
      <h2>{displayToken}</h2>

      <button onClick={activarMensajes}> Recibir notificaciones</button>
    </>
  )
}

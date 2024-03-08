import React from 'react'
import { useState } from 'react'
import { Button, Popup } from 'react-chat-elements'
import ModalIMG from './ModalIMG'
import './SengImage.css'
export default function SendImage() {
    const [show, setShow] = useState(false);

    const modalIMG = () => {
        return <ModalIMG />
    }

    const popup = {
        show:show,
        header:"Example Popup",
        headerButtons: [
            {
                type: "transparent",
                color: "black",
                text: "X",
                onClick: () => {
                    setShow(false);
                },
            },
        ],
        renderContent: modalIMG,
        footerButtons: [
            {
                color: "white",
                backgroundColor: "#ff5e3e",
                text: "Cancel",
                onClick: () => {
                    setShow(false);
                },
            },
            {
                color: "white",
                backgroundColor: "lightgreen",
                text: "OK",
                onClick: () => {
                    setShow(false);
                },
            },
        ]
      }

  return (
    <>
        <Button
            text={"Images"}
            onClick={() => setShow(true)}
            title="Send"
        />
        <Popup popup = {popup} />
    </>
  )
}

import React from 'react'
import { useState } from 'react'
import { Button, Popup } from 'react-chat-elements'

export default function SendImage() {
    const [show, setShow] = useState(false);
    
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
        text:"Here is a sample popup component to use in your projects.",
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

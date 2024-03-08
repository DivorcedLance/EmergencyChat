import { useEffect, useState } from "react";
import {
  getMessagingToken,
  onMessageRecieved,
} from "../utils/firebaseMessaging";

export function DataManager({ updateDevice }) {
  const [location, setLocation] = useState("");
  const [messagingToken, setMessagingToken] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation([-77.0649444066673,-11.994909663438648]);
          // setLocation([-77.1337, -11.8944]);
        },
        function (error) {
          console.log(error);
        }
      );
    } else {
      alert("Your browser does not support geolocation");
    }
  }, []);

  useEffect(() => {
    activarMensajes();
  }, []);

  useEffect(() => {
    onMessageRecieved((message) => {
      console.log("Message recieved: ", message);
    });
  }, []);

  const activarMensajes = async () => {
    setMessagingToken(await getMessagingToken());
  };

  const sendData = (messagingToken, location) => {
    updateDevice(location[1], location[0], messagingToken);

    console.log({
      messagingToken: messagingToken,
      longitud: location[0],
      latitud: location[1],
    });
  };

  useEffect(() => {
    if (location && messagingToken) {
      sendData(messagingToken, location);
    }
  }, [location, messagingToken]);

  return <></>;
}

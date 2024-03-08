import backendAPI from "../utils/backendAPI.js";
import Chat from "./Chat/Chat";
function TestComponent() {
  const test = async () => {
    backendAPI.get("find-all").then((usuarios) => {
      console.log(usuarios);
    });
  };
  /* <>
      <h1>TestComponent</h1>
      <button onClick={test}>test</button>
    </> */

  return (
    <Chat
      logoutSesion={() => {}}
      sesion={{
        usuario: {
          id: "",
          username: "Aldair",
          logueado: false,
        },
        device: {
          id: "",
          district: "VENTANILLA",
          location: {
            latitude: 0.0,
            longitude: 0.0,
          },
          deviceToken: "",
        },
      }}
    />
  );
}

export default TestComponent;

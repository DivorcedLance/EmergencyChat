import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import Solubi from "./SolUbi/solubi";
import Chat from "./Chat/Chat";

export default function LoginSign() {
  const [usuario, setUsuario] = useState({
    id: "",
    username: "",
    logueado: false,
  });

  const [ubicacionDisponible, setUbicacionDisponible] = useState(true);

  /* if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        setUbicacionDisponible(true);
        //estoyaca es la posicion en latitud y longitud que debe pasarse al back
        const estoyaca = [position.coords.longitude, position.coords.latitude];
        console.log(`Longitud: ${estoyaca[0]} Latitud: ${estoyaca[1]}`);
      },
      function (error) {
        console.log(error);
      }
    );
  } else {
    alert("Your browser does not support geolocation");
  } */

  async function loggearUsuario(usuario) {
    setUsuario(usuario);
    console.log(usuario);
    alert("Usuario logueado");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            ubicacionDisponible ? (
              <Login loggearUsuario={loggearUsuario} />
            ) : (
              <Solubi />
            )
          }
        />
        <Route
          path="/signup"
          element={ubicacionDisponible ? <SignUp /> : <Solubi />}
        />
        <Route
          path="/chat"
          element={
            ubicacionDisponible && usuario.logueado ? <Chat /> : <Solubi />
          }
        />
      </Routes>
    </Router>
  );
}

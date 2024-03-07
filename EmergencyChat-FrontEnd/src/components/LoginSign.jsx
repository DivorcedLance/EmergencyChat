import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import Solubi from "./SolUbi/Solubi";

export default function LoginSign() {

  const [ubicacionDisponible, setUbicacionDisponible] = useState(false);

  if (navigator.geolocation) {
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
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={ubicacionDisponible ? <Login /> : <Solubi />}
        />
        <Route path="/signup" element={ubicacionDisponible ? <SignUp /> : <Solubi />} />
      </Routes>
    </Router>
  );
}

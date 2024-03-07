import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";

export default function LoginSign() {
  let ubicacionDisponible = false;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        ubicacionDisponible = true
        //estoyaca es la posicion en latitud y longitud que debe pasarse al back
        const estoyaca = [position.coords.longitude, position.coords.latitude];
        console.log(`Longitud: ${estoyaca[0]} <br> Latitud: ${estoyaca[1]}`)
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
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import Solubi from "./SolUbi/solubi";
import Chat from "./Chat/Chat";
import backendAPI from "../utils/backendAPI";
import { DataManager } from "./DataManager";

export default function LoginSign() {
  const [sesion, setSesion] = useState({
    usuario: {
      id: "",
      username: "",
      logueado: false,
    },
    device: {
      district: {
        id: "",
        name: "",
      },
      location: {
        latitude: 0.0,
        longitude: 0.0,
      },
      deviceToken: "",
    },
  });
  
  const loggearUsuario = (sesion) => {
    setSesion(sesion);
    console.log(sesion);

    alert("Usuario logueado");
  };

  const logoutSesion = () => {
    setSesion({
      usuario: {
        id: "",
        username: "",
        logueado: false,
      },
      device: {
        district: {
          id: "",
          name: "",
        },
        location: {
          latitude: 0.0,
          longitude: 0.0,
        },
        deviceToken: "",
      },
    });

    alert("Usuario deslogueado");
  };

  const updateDevice = (la, lo, token) => {
    setSesion({
      usuario: {
        id: "",
        username: "",
        logueado: false,
      },
      device: {
        district: {
          id: "",
          name: "",
        },
        location: {
          latitude: la,
          longitude: lo,
        },
        deviceToken: token,
      },
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("sesion");
    if (storedData) {
      setSesion(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    console.log("Sesión actualizada:", sesion);
    const handleBeforeUnload = () => {
      localStorage.setItem("sesion", JSON.stringify(sesion));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sesion]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            sesion.device.location &&
            sesion.device.deviceToken &&
            !sesion.usuario.logueado ? (
              <Login sesion={sesion} loggearUsuario={loggearUsuario} />
            ) : (
              <>
                <DataManager updateDevice={updateDevice} />
                <Solubi />
              </>
            )
          }
        />
        <Route
          path="/signup"
          element={
            sesion.device.location &&
            sesion.device.deviceToken &&
            !sesion.usuario.logueado ? (
              <SignUp sesion={sesion} loggearUsuario={loggearUsuario} />
            ) : (
              <>
                <DataManager updateDevice={updateDevice} />
                <Solubi />
              </>
            )
          }
        />
        <Route
          path="/chat/:room"
          element={
            sesion.device.location &&
            sesion.device.deviceToken &&
            sesion.usuario.logueado ? (
              <Chat logoutSesion={logoutSesion} sesion={sesion} />
            ) : (
              <>
                <Solubi />
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
}

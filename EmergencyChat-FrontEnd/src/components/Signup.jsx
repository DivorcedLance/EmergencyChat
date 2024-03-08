import "bootstrap/dist/css/bootstrap.min.css";
import signimg from "../assets/singupIMG.svg";
import "./LoginSign.css";
import backendAPI from "../utils/backendAPI.js";
import { useNavigate } from "react-router-dom";

export default function Signup({ loggearUsuario, sesion }) {
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await backendAPI.post("sign-up", {
      user: {
        username: username,
        password: password,
      },
      device: {
        latitude: sesion.device.location.latitude,
        longitude: sesion.device.location.longitude,
        device_token: sesion.device.deviceToken,
      },
    });
    console.log(response);

    if (response.detail) {
      alert(response.detail);
    } else {
      loggearUsuario({
        usuario: {
          id: response.device.user_id,
          username: response.user.username,
          logueado: true,
        },
        device: {
          district: {
            id: response.device.district_id,
            name: response.device.district,
          },
          location: {
            latitude: response.device.latitude,
            longitude: response.device.longitude,
          },
          deviceToken: response.device.device_token,
        },
      });

      navigate(`/chat/${response.device.district}`); 
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 p-5 mx-5 rounded bg-white shadow-lg">
        <form onSubmit={register}>
          <h3 className="text-center">Registro</h3>
          <div className="mb2 py-2">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Ingresar usuario"
            />
          </div>
          <div className="mb2 py-2">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresar contraseña"
            />
          </div>
          <div className="d-grid mt-3 py-2">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
          <div>
            <p className="text-center mt-3">
              ¿Ya tienes una cuenta? <a href="/">Inicia sesion</a>
            </p>
          </div>
        </form>
      </div>
      <div className="w-50 px-5 logo">
        <img src={signimg} className="img-fluid" alt="..."></img>
      </div>
    </div>
  );
}

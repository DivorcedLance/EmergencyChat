import "bootstrap/dist/css/bootstrap.min.css";
import loginimg from "../assets/loginIMG.svg";
import "./LoginSign.css";
import backendAPI from '../utils/backendAPI.js'

export default function Login({loggearUsuario}) {

  async function login () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const usuarios = await backendAPI.get("find-all");
    console.log(usuarios);

    usuarios.forEach(usuario => {
      if(usuario.username === username && usuario.password === password){
        console.log("Usuario encontrado");
        loggearUsuario({
          username: username,
          password: password,
          logueado: true
        });
      }
    });
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="w-50 p-5 mx-5 rounded bg-white shadow-lg">
        <form>
          <h3 className="text-center">Iniciar Sesión</h3>
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
            <button type="submit" className="btn btn-primary" onClick={login}>
              Iniciar Sesión
            </button>
          </div>
          <div>
            <p className="text-center mt-3">
              ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
            </p>
          </div>
        </form>
      </div>
      <div className="w-50 logo">
        <img src={loginimg} className="img-fluid" alt="..."></img>
      </div>
    </div>
  );
}

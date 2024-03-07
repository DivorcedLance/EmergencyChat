import "bootstrap/dist/css/bootstrap.min.css";
import loginimg from "../assets/loginIMG.svg";
import "./LoginSign.css";

export default function Login() {
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
            <button type="submit" className="btn btn-primary">
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
      <div className="w-50">
        <img src={loginimg} className="img-fluid" alt="..."></img>
      </div>
    </div>
  );
}

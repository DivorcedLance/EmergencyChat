import "bootstrap/dist/css/bootstrap.min.css";
import signimg from "../assets/singupIMG.svg";
import "./LoginSign.css";

export default function Signup() {
  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 p-5 mx-5 rounded bg-white shadow-lg">
        <form>
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

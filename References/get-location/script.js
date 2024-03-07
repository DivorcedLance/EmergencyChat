let ubicacionDisponible = document.getElementById("container");
let ubicacionActual = document.getElementById("posicion");

//backendAPI para consultas a la api (modificar al back)
const backendAPI = {
  host: "https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/distritos-peru@bogota-laburbano/",

  async request(endpoint, method = "GET", data = null) {
    try {
      const response = await fetch(`${this.host}/${endpoint}`, {
        method,
        headers: data ? { "Content-Type": "application/json" } : {},
        body: data ? JSON.stringify(data) : null,
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  },

  async get(endpoint) {
    return await this.request(endpoint);
  },

  async post(endpoint, data) {
    return await this.request(endpoint, "POST", data);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        ubicacionDisponible.classList.remove("nolibre");
        ubicacionDisponible.classList.add("libre");
        console.log(position);

        //estoyaca es la posicion en latitud y longitud que debe pasarse al back
        const estoyaca = [position.coords.longitude, position.coords.latitude];
        ubicacionActual.innerHTML = `Longitud: ${estoyaca[0]} <br> Latitud: ${estoyaca[1]}`;
      },
      function (error) {
        ubicacionDisponible.classList.remove("libre");
        ubicacionDisponible.classList.add("nolibre");
        console.log(error);
      }
    );
  } else {
    alert("Your browser does not support geolocation");
  }
});



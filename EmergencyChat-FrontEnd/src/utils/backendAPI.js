const backendAPI = {
    host: "http://127.0.0.1:8000",
  
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

export default backendAPI;
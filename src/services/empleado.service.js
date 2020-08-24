import http from "../http-common";

class EmpleadoDataService {
  getAll() {
    return http.get("/empleados");
  }

  get(id) {
    return http.get(`/empleados/${id}`);
  }

  create(data) {
    return http.post("/empleados", data);
  }

  update(data) {
    
    return http.put("/empleados", data);
  }

  delete(id) {
    return http.delete(`/empleados/${id}`);
  }

  deleteAll() {
    return http.delete(`/empleados`);
  }

  findByTitle(title) {
    
    return http.get('/empleados',{
      params: {title: `${title}`}})
  }
}

export default new EmpleadoDataService();
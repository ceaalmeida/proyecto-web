class ReportService {
  async getListaPIAD(token) {
    const resp = await fetch(
      "http://localhost:3000/rep/plan-ingreso-adopciones-donaciones",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    return data;
  }

  async getListaPA(token) {
    const resp = await fetch(
      "http://localhost:3000/rep/proveedores-alimentos",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    return data;
  }

  async getListaPSC(token) {
    const resp = await fetch(
      "http://localhost:3000/rep/proveedores-servicios-complementarios",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    return data;
  }

  async getProgramaActividadesAnimal(id, token) {
    const resp = await fetch(
      `http://localhost:3000/rep/programa-actividades-animal/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    return data;
  }
}

export default new ReportService();

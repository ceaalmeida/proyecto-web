class ProveedorServiciosComplementariosService {
    async getAllProveedores(token) {
      const proveedores = await fetch("http://localhost:3000/proveedores_servicios_complementarios/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await proveedores.json();
      return data;
    }
  
    async updateProveedor(id, proveedor) {
      const proveedorResponse = await fetch(`http://localhost:3000/proveedores_servicios_complementarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proveedor),
      });
      return await proveedorResponse.json();
    }
  
    async createProveedor(proveedor) {
      const proveedorResponse = await fetch("http://localhost:3000/proveedores_servicios_complementarios/", {     
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proveedor),
      });
      return await proveedorResponse.json();
    }
  
    async deleteProveedor(id) {
      await fetch(`http://localhost:3000/proveedores_servicios_complementarios/${id}`, {
        method: "DELETE",
      });
    }
  }
  
  export default new ProveedorServiciosComplementariosService();
  
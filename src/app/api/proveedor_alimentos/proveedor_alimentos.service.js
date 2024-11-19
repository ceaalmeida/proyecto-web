class ProveedoresAlimentosService {
    async getAllProveedoresAlimentos(token) {
      const proveedores = await fetch("http://localhost:3000/proveedores_alimentos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await proveedores.json();
      return data;
    }
  
    async updateProveedorAlimentos(id, proveedor) {
      const proveedorResponse = await fetch(`http://localhost:3000/proveedores_alimentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proveedor),
      });
      return await proveedorResponse.json();
    }
  
    async createProveedorAlimentos(proveedor) {
      const proveedorResponse = await fetch("http://localhost:3000/proveedores_alimentos/", {     
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proveedor),
      });
      return await proveedorResponse.json();
    }
  
    async deleteProveedorAlimentos(id) {
      await fetch(`http://localhost:3000/proveedores_alimentos/${id}`, {
        method: "DELETE",
      });
    }
  }
  
  export default new ProveedoresAlimentosService();
  
class DonacionService {
    async getAll(token) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Donacion`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
       window.alert("Error obteniendo donacion");
      }
      const data = await response.json();
      return data;
    }
  
    async delete(id, token) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Donacion/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error eliminando donacion");
      }
      return response.ok;
    }
  
    async update(id, element, token) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Donacion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(element),
      });
  
      if (!response.ok) {
        throw new Error("Error actualizando donacion");
      }
      return response.json();
    }
  
    async create(element, token) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Donacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(element),
      });
  
      if (!response.ok) {
        throw new Error("Error creando donacion");
      }
      return response.json();
    }
  }
  
  export default new DonacionService();
  
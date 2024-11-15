class VeterinarioService {
    async getAllVeterinarios() {
      const veterinarios = await fetch("http://localhost:3000/Veterinarios/", {
        method: "GET",
      });
      const data = await veterinarios.json();
      return data;
    }
  
    async updateVeterinario(id, veterinario) {
      const veterinarioResponse = await fetch(`http://localhost:3000/Veterinarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veterinario),
      });
      return await veterinarioResponse.json(); 
    }
  
    async createVeterinario(veterinario) {
      const veterinarioResponse = await fetch("http://localhost:3000/Veterinarios/", {     
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veterinario),
      });
      return await veterinarioResponse.json(); 
    }
  
    async deleteVeterinario(id) {
      await fetch(`http://localhost:3000/Veterinarios/${id}`, {
        method: "DELETE",
      });
    }
  }
  
  export default new VeterinarioService();
  
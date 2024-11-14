class ContratoService {
    async getAllContratos() {
      const contratos = await fetch("http://localhost:3000/contrato/", {
        method: "GET",
      });
      const data = await contratos.json();
      return data;
    }
  
    async updateContrato(id, contrato) {
      const contratoResponse = await fetch(`http://localhost:3000/contrato/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contrato),
      });
      return await contratoResponse.json(); 
    }
  
    async createContrato(contrato) {
      const contratoResponse = await fetch("http://localhost:3000/contrato/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contrato),
      });
      return await contratoResponse.json(); 
    }
  
    async deleteContrato(id) {
      await fetch(`http://localhost:3000/contrato/${id}`, {
        method: "DELETE",
      });
    }
  }
  
  export default new ContratoService();
  
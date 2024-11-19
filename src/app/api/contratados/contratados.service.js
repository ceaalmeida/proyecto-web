class ContratadosService {
  async getAllContratados() {
    const contratados = await fetch("http://localhost:3000/contratado/", {
      method: "GET",
    });
    const data = await contratados.json();
    return data;
  }

  async getContratadoById(id) {
    try {
      const contratadoResponse = await fetch(`http://localhost:3000/contratado/${id}`, {
        method: "GET",
      });

      if (!contratadoResponse.ok) {
        throw new Error(`Error al obtener contratado con ID ${id}: ${contratadoResponse.statusText}`);
      }

      return await contratadoResponse.json();
    } catch (error) {
      console.error("Error en getContratadoById:", error);
      throw error;
    }
  }

  async updateContratado(id, contratado) {
    const contratadoResponse = await fetch(`http://localhost:3000/contratado/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contratado),
    });
    return await contratadoResponse.json();
  }

  async createContratado(contratado) {
    const contratadoResponse = await fetch("http://localhost:3000/contratado/", {     
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contratado),
    });
    return await contratadoResponse.json();
  }

  async deleteContratado(id) {
    await fetch(`http://localhost:3000/contratado/${id}`, {
      method: "DELETE",
    });
  }
}

export default new ContratadosService();

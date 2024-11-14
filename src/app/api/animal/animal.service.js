class AnimalService {
  async getAllAnimal() {
    const animales = await fetch("http://localhost:3000/Animal/", {
      method: "GET",
    });
    const data = await animales.json();
    return data;
  }
  async getBy(id){
    const animal= await fetch(`http://localhost:3000/Animal/${id}`, {
      method: "GET",
    })
    return  await animal.json()

  }
  async updateAnimal(id, animal) {
    const animales = await fetch(`http://localhost:3000/Animal/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal),
    });
    return await Response.json;
  }
  async createAnimal(animal) {
    //window.alert(`Dsde la api ${animal.Precio_Adopción}`)
    const animals = await fetch("http://localhost:3000/Animal/", {     
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal),
    });

  }
  async deleteAnimal(id){
    const dele= await fetch(`http://localhost:3000/Animal/${id}`,{
        method: "DELETE",
    })
    // if (!dele.ok) {
    //     window.alert("No se pudo eliminar el animal.");
    // } else {
    //     window.alert("Animal eliminado exitosamente.");
    // }
  }
}
export default new AnimalService();

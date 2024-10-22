


class AnimalService{

    async getAllAnimal(){
        const animales= await fetch("http://localhost:3000/Animal/",{ method:"GET"});
        const data = await animales.json();
        return data;
    }
}
export default new AnimalService()
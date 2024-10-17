const loadAllServices = async()=>{
    const response = await fetch("http://localhost:3000/tipo-de-servicio/", {
        method: "GET",
      });
      const services = await response.json();
}

module.exports ={
    loadAllServices
}
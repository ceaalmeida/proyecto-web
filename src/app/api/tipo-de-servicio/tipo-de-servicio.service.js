const loadAllServices = async () => {
  const response = await fetch("http://localhost:3000/tipo-de-servicio/", {method: "GET",});
  const services = await response.json();
  return services;
};

const createService = async (newService) => {
  const response = await fetch("http://localhost:3000/tipo-de-servicio", {
    method: "POST",
    body: JSON.stringify(newService),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
};

const readService = async (ID_Servicio) => {
  return await fetch(
    `http://localhost:3000/tipo-de-servicio/${ID_Servicio}`,
    {
      method: "GET",
    }
  );
};

const updateService = async (ID_Servicio, updateService) => {
  const response = await fetch(
    `http://localhost:3000/tipo-de-servicio/${ID_Servicio}`,
    {
      method: "PUT",
      body: JSON.stringify(updateService),
      headers: { "Content-Type": "application/json" },
    }
  );
};

const deleteService = async (ID_Servicio) => {
  const response = await fetch(
    `http://localhost:3000/tipo-de-servicio/${ID_Servicio}`,
    {
      method: "DELETE",
    }
  );
};

module.exports = {
  loadAllServices,
  createService,
  readService,
  updateService,
  deleteService
};

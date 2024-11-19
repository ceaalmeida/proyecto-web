const loadAllServices = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-servicio/`, {
    method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const services = await response.json();
  return services;
};

const createService = async (newService, token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-servicio`, {
    method: "POST",
    body: JSON.stringify(newService),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
};

const readService = async (ID_Servicio, token) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-servicio/${ID_Servicio}`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  );
};

const updateService = async (ID_Servicio, updateService, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-servicio/${ID_Servicio}`,
    {
      method: "PUT",
      body: JSON.stringify(updateService),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  );
};

const deleteService = async (ID_Servicio, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-servicio/${ID_Servicio}`,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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

const loadAllProvincias = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/provincia`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  console.log("Cargando provincias", data)
  return data;
};

const loadProvincia = async (id, token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/provincia/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  return data;
};

module.exports = {
  loadAllProvincias,
  loadProvincia
}
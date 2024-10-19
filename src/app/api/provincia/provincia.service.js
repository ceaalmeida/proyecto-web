const loadAllProvincias = async () => {
  const response = await fetch("https://localhost:3000/transporte", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const loadProvincia = async (id) => {
  const response = await fetch(`https://localhost:3000/transporte/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

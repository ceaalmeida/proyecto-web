const loadAllFoods = async () => {
  const response = await fetch("http://localhost:3000/tipo-de-alimento", {
    method: "GET",
  });
  return await response.json();
};

const createFood = async (food) => {
  const response = await fetch("http://localhost:3000/tipo-de-alimento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
};

const readFood = async (ID_Alimento) => {
  const response = await fetch(
    `http://localhost:3000/tipo-de-alimento/${ID_Alimento}`,
    {
      method: "GET",
    }
  );
};

const updateFood = async (ID_Alimento, updateService) => {
  const response = await fetch(
    `http://localhost:3000/tipo-de-alimento/${ID_Alimento}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateService),
    }
  );
};

const deleteFood = async (ID_Alimento) => {
  const response = await fetch(
    `http://localhost:3000/tipo-de-alimento/${ID_Alimento}`,
    {
      method: "DELETE",
    }
  );
};

module.exports = {
  loadAllFoods,
  createFood,
  readFood,
  updateFood,
  deleteFood,
};

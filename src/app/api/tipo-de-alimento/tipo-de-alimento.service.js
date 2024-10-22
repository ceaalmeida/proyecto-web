const loadAllFoods = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-alimento`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return await response.json();
};

const createFood = async (food, token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-alimento`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(food),
  });
};

const readFood = async (ID_Alimento, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-alimento/${ID_Alimento}`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  );
};

const updateFood = async (ID_Alimento, updateService, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-alimento/${ID_Alimento}`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateService),
    }
  );
};

const deleteFood = async (ID_Alimento, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-de-alimento/${ID_Alimento}`,
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
  loadAllFoods,
  createFood,
  readFood,
  updateFood,
  deleteFood,
};

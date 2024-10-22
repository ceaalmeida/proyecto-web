const loadAllProvincias = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  return data;
};

const loadProvincia = async (id, token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  return data;
};

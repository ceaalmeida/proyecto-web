const loadAllTransports = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const createTransport = async (transport, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transport),
    }
  );
};

const updateTransport = async (ID_Transporte, transport, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte/${ID_Transporte}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transport),
    }
  );
};

const readTransport = async (ID_Transporte, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte/${ID_Transporte}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteTransport = async (ID_Transporte, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transporte/${ID_Transporte}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

module.exports = {
  loadAllTransports,
  createTransport,
  readTransport,
  updateTransport,
  deleteTransport,
};

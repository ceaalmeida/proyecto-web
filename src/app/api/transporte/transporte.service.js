const loadAllTransports = async () => {
  const response = await fetch("http://localhost:3000/transporte");
  const data = await response.json();
  return data;
};

const createTransport = async (transport) => {
  const response = await fetch("http://localhost:3000/transporte", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transport),
  });
};

const updateTransport = async (ID_Transporte, transport) => {
  const response = await fetch(
    `http://localhost:3000/transporte/${ID_Transporte}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transport),
    }
  );
};

const readTransport = async (ID_Transporte) => {
  const response = await fetch(
    `http://localhost:3000/transporte/${ID_Transporte}`,
    {
      method: "GET",
    }
  );
};

const deleteTransport = async (ID_Transporte) => {
  const response = await fetch(
    `http://localhost:3000/transporte/${ID_Transporte}`,
    {
      method: "DELETE",
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

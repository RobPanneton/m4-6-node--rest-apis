const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...

const handlerAccessClientbase = async (req, res) => {
  res.status(200).json({
    status: 200,
    data: clients,
  });
};

const handlerAccessClientInfo = async (req, res) => {
  const clientId = req.params.id;
  const searchedClient = await clients.find((client) => {
    if (client.id === clientId) return client;
  });
  if (!searchedClient) {
    res.status(400).json({
      status: 400,
      message: "there is no client with that id",
    });
  } else {
    res.status(200).json({
      status: 200,
      data: searchedClient,
    });
  }
};

const handlerCreateNewClient = async (req, res) => {
  const {
    isActive,
    age,
    name,
    gender,
    company,
    email,
    phone,
    address,
  } = req.body;

  const newClient = {
    isActive,
    age,
    name,
    gender,
    company,
    email,
    phone,
    address,
  };

  newClient.id = uuidv4();

  clients.forEach((client) => {
    if (client.email.includes(email)) {
      res.status(400).json({
        status: 400,
        error: "client with same email address already exists",
      });
    }
  });
  clients.push(newClient);
  res.status(201).json({
    status: 201,
    message: "new client created",
    data: newClient,
  });
};

const handlerDeleteClient = async (req, res) => {
  const clientId = req.params.id;
  let clientRemoved = false;

  for (let i = 0; i < clients.length; i++) {
    if (clients[i].id === clientId) {
      clients.splice(i, 1);
      clientRemoved = true;
      break;
    }
  }
  // clients.forEach((client, index) => {
  //   if (client.id === clientId) {
  //     clients.splice(index, 1);
  //     clientRemoved = true;
  //     break;
  //   }
  // });
  if (clientRemoved) {
    res.status(200).json({
      status: 200,
      message: "client succesfully deleted",
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "there is no client with this id",
    });
  }
};

module.exports = {
  handlerAccessClientbase,
  handlerAccessClientInfo,
  handlerCreateNewClient,
  handlerDeleteClient,
};

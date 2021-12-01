// Código retirado do repositproio de aulas - live lecture 27.3
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const memoryServer = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async () => {
  const urlMock = await memoryServer.getUri();

  return MongoClient.connect(urlMock, OPTIONS);
};

module.exports = { getConnection };
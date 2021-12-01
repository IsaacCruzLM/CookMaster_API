const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota "/recipes/" - GET', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('Quando as receitas são retornadas com sucesso', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/recipes');
    });

    it('requisição retorna status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('array');
    });
  });
  
});
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota "/login"', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('Quando a entrada de dados é inválida, sem password', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com'
        });
    });

    it('requisição retorna status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  
    it('a propriedade "message" possui o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('Quando o user não existe no banco de dados', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'Test123'
        });
    });

    it('requisição retorna status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  
    it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('Quando o login é efetuado com sucesso', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('Cookmaster').collection('users');

      await users.insertOne({
        name: 'Teste',
        email: 'test@email.com',
        password: 'Test123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'Test123'
        });
    });

    it('requisição retorna status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  
    it('a propriedade "token" tem um token JWT válido', () => {
      const token = response.body.token;
      const userWithoutPassword = jwt.decode(token);

      expect(userWithoutPassword.data.email).to.be.equals('test@email.com');
    });

  });

});
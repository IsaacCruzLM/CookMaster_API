const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota "/user/" - POST', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  describe('Quando a entrada de dados é inválida', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Teste',
        });
    });

    it('requisição retorna status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Quando o email da entra já existe no BD', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('Cookmaster').collection('users');
  
      await users.insertOne({
        name: 'Teste 2',
        email: 'test2@email.com',
        password: 'Test12345',
        role: 'user',
      });
  
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Teste 2',
          email: 'test2@email.com',
          password: 'Test12345'
        });
    });
  
    it('requisição retorna status "409"', () => {
      expect(response).to.have.status(409);
    });
  
    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
  
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  
    it('a propriedade "message" possui o texto "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });
  
  describe('Quando o registro do usuário é feito com sucesso ', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
          name: 'Test',
          email: 'testando@email.com',
          password: 'Test123'
        });
    });

    it('requisição retorna status "201"', () => {
      expect(response).to.have.status(201);
    });
    
    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });
  
    it('a propriedade "user" tem uma key "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('a propriedade "user" tem uma key "name" igual a inserida na requisição', () => {
      const name = response.body.user.name;
      expect(name).to.be.equals('Test');
    });
    
    it('a propriedade "user" tem uma key "email" igual a inserida na requisição', () => {
      const email = response.body.user.email;
      expect(email).to.be.equals('testando@email.com');
    });

    it('a propriedade "user" tem uma key "role" igual a "user"', () => {
      const role = response.body.user.role;
      expect(role).to.be.equals('user');
    });
    
  });
  
});
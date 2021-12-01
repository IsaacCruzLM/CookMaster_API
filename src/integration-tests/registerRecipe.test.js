const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota "/recipes/" - POST', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const users = connectionMock.db('Cookmaster').collection('users');

    await users.insertOne({
      name: 'Teste Admin',
      email: 'testAdmin@email.com',
      password: 'TestAdmin123',
      role: 'admin',
    });
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não possui um token jwt válido na requisição', () => {
    let response;
    before(async () => {

      response = await chai.request(server)
        .post('/recipes')
        .send({
          name: "Receita Teste",
          ingredients: "Ingrediente Teste",
          preparation: "Preparação Teste"
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
  
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
    
  });

  describe('Quando possui um token jwt inválido na requisição', () => {
    let response;
    before(async () => {

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', "Token Inválido")
        .send({
          name: "Receita Teste",
          ingredients: "Ingrediente Teste",
          preparation: "Preparação Teste"
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
  
    it('a propriedade "message" possui o texto "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
    
  });

  describe('Quando a entrada de dados é inválida', () => {
    let response;
    before(async () => {
      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'testAdmin@email.com',
          password: 'TestAdmin123',
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: "Receita Teste",
          ingredients: "Ingrediente Teste",
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
  
  describe('Quando o registro da receita, é realizado com sucesso', () => {
    let response;
    before(async () => {
      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'testAdmin@email.com',
          password: 'TestAdmin123',
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: "Receita Teste",
          ingredients: "Ingrediente Teste",
          preparation: "Preparação Teste"
        });
    });

    it('requisição retorna status "201"', () => {
      expect(response).to.have.status(201);
    });
    
    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });
  
    it('a propriedade "recipe" tem uma key "_id"', () => {
      expect(response.body.recipe).to.have.property('_id');
    });

    it('a propriedade "recipe" tem uma key "name" igual a inserida na requisição', () => {
      const name = response.body.recipe.name;
      expect(name).to.be.equals('Receita Teste');
    });
    
    it('a propriedade "recipe" tem uma key "ingredients" igual a inserida na requisição', () => {
      const preparation = response.body.recipe.preparation;
      expect(preparation).to.be.equals('Preparação Teste');
    });

    it('a propriedade "recipe" tem uma key "userId"', () => {
      expect(response.body.recipe).to.have.property('userId');
    });
    
  });
  
});
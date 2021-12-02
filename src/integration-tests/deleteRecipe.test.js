const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota "/recipes/:id" - PUT', () => {
  const recipeIDTest = "61a681b7ba14a969ca11f24a";
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const users = connectionMock.db('Cookmaster').collection('users');
    const recipes = connectionMock.db('Cookmaster').collection('recipes');

    await users.insertOne({
      name: 'Teste Admin',
      email: 'testAdmin@email.com',
      password: 'TestAdmin123',
      role: 'admin',
    });

    await users.insertOne({
      name: 'Teste Admin 2',
      email: 'testAdmin2@email.com',
      password: 'TestAdmin123',
      role: 'user',
    });

    await recipes.insertOne({
      _id: ObjectId(recipeIDTest),
      name: "Receita Teste",
      ingredients: "Ingrediente Teste",
      preparation: "Preparação Teste",
      userId: "Id de Teste"
    });
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não possui um token jwt válido na requisição', () => {
    let response;

    before(async () => {

      response = await chai.request(server)
        .delete(`/recipes/${recipeIDTest}`);
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
        .delete(`/recipes/${recipeIDTest}`)
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

  describe('Quando a receita não é encontrada no Banco de dados', () => {
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
        .delete(`/recipes/IdInválido`)
        .set('authorization', token);
    });

    it('requisição retorna status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  
    it('a propriedade "message" possui o texto "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });

  describe('Quando o usuário que fez a requisição não tem permissão', () => {
    let response;
    before(async () => {
      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'testAdmin2@email.com',
          password: 'TestAdmin123',
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .delete(`/recipes/${recipeIDTest}`)
        .set('authorization', token);
    });

    it('requisição retorna status "403"', () => {
      expect(response).to.have.status(403);
    });

    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  
    it('a propriedade "message" possui o texto "You dont have permission"', () => {
      expect(response.body.message).to.be.equals('You dont have permission');
    });
  });
  
  describe('Quando a receita e deletada com sucesso com sucesso', () => {
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
        .delete(`/recipes/${recipeIDTest}`)
        .set('authorization', token);
    });

    it('requisição retorna status "204"', () => {
      expect(response).to.have.status(204);
    });
    
  });
  
});
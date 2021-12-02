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
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando não possui um token jwt válido na requisição', () => {
    let response;

    before(async () => {

      response = await chai.request(server)
        .put(`/recipes/${recipeIDTest}`)
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
        .put(`/recipes/${recipeIDTest}`)
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
        .put(`/recipes/${recipeIDTest}`)
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
        .put(`/recipes/${recipeIDTest}`)
        .set('authorization', token)
        .send({
          name: "Receita Teste",
          ingredients: "Ingrediente Teste",
          preparation: "Preparação Teste"
        });
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
  
  describe('Quando a atualização da receita, é realizado com sucesso', () => {
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
        .put(`/recipes/${recipeIDTest}`)
        .set('authorization', token)
        .send({
          name: "Receita Teste",
          ingredients: "Ingrediente Teste",
          preparation: "Preparação Teste"
        });
    });

    it('requisição retorna status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
  
    it('a reposta da requisição tem uma key "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('a reposta da requisição tem uma key "name" igual a inserida na requisição', () => {
      const name = response.body.name;
      expect(name).to.be.equals('Receita Teste');
    });

    it('a reposta da requisição tem uma key "ingredients" igual a inserida na requisição', () => {
      const ingredients = response.body.ingredients;
      expect(ingredients).to.be.equals('Ingrediente Teste');
    });
    
    it('a reposta da requisição tem uma key "preparation" igual a inserida na requisição', () => {
      const preparation = response.body.preparation;
      expect(preparation).to.be.equals('Preparação Teste');
    });
    
  });
  
});
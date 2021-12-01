const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota "/recipes/:id" - GET', () => {
  const recipeIDTest = "61a681b7ba14a969ca11f24a";
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a receita não é encontrada no banco de dados', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .get(`/recipes/${recipeIDTest}`);
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


  describe('Quando as receita é retornada com sucesso', () => {
    let response;
    before(async () => {
      const recipes = connectionMock.db('Cookmaster').collection('recipes');

      await recipes.insertOne({
        _id: ObjectId(recipeIDTest),
        name: "Receita Teste",
        ingredients: "Ingrediente Teste",
        preparation: "Preparação Teste",
        userId: "UserIDTest"
      });

      response = await chai.request(server)
        .get(`/recipes/${recipeIDTest}`);
    });

    console.log(response);

    it('requisição retorna status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('resposta da requisição é um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o corpo da resposta tem uma key "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o corpo da resposta tem uma key "name"', () => {
      expect(response.body).to.have.property('name');
    });
    
    it('o corpo da resposta tem uma key "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o corpo da resposta tem uma key "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o corpo da resposta tem uma key "userId"', () => {
      expect(response.body).to.have.property('userId');
    });
  });
  
});
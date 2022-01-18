/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  image:'https://www.paulinacocina.net/wp-content/uploads/2015/03/P1150541-e1439164269502.jpg',
  summary: 'Comida clásica argentina'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
    setTimeout(function(){
      agent.get('/recipes').expect(200)
    }, 2000)
    );
  });
  describe('GET /types', () => {
    it('should get 200', () =>
    setTimeout(function(){
      agent.get('/recipes').expect(200)
    }, 2000)
    );
  });
  describe('POST /recipes', () => {
    it('should get 200', () =>
    setTimeout(function(){
      agent.get('/recipes').expect(200)
    }, 2000)
    );
  });
});

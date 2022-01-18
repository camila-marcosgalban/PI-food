const { Router } = require('express');
const typesRouter = Router();
const axios = require('axios');
const { Type } = require('../db')
const {API_KEY} = process.env;

typesRouter.get('/', async (req, res) => {
    const endpoint = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const types = endpoint.data.results.map(data => data.diets)
    types.unshift(['vegetarian']);
    types.map(t => {
        t.forEach(e => {
            Type.findOrCreate({
                where: { name: e}
            })
        })})
    const showDiets = await Type.findAll();
    res.send(showDiets)
})

module.exports = typesRouter;
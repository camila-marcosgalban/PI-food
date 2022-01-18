const { Router } = require('express');
const recipeRouter = Router();
const axios = require('axios');
const { Recipe, Type } = require('../db')
const {API_KEY} = process.env;

//get 100 recipes from api
const getApiRecipes = async () => {
    const endpoint = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const recipes = endpoint.data.results.map(data => {
        if(data.vegetarian){
            data.diets.push('vegetarian')
        }
        return {
                        id: data.id,
                        name: data.title,
                        image: data.image,
                        summary: data.summary,
                        spoonacularScore : data.spoonacularScore,
                        healthScore: data.healthScore,
                        instructions: data.analyzedInstructions.map(i => i.steps.map(s => s.step))[0],
                        dishTypes: data.dishTypes,
                        diets: data.diets,
                        vegetarian: data.vegetarian
                    }
    })
    return recipes;
}

//get recipes from database
const getDbRecipes = async () => {
    let db = await Recipe.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
    return db;
}

//get all recipes
const getAll = async () => {
    const api = await getApiRecipes();
    const db = await getDbRecipes();
    const all = api.concat(db);
    return all;
}

//find recipes by name
recipeRouter.get('/', async (req, res) => {
    const name = req.query.name;
    let getRecipes = await getAll();
    if(name){
        //SHOW BY NAME
        let recipeByName = await getRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()))
        recipeByName.length > 0 ?
        res.status(200).send(recipeByName)
        : res.send('Not found')
    }else{
        //SHOW ALL
        res.status(200).send(getRecipes)
    }
})

//find recipe by id
recipeRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    let getRecipes = await getAll();
    if(id) {
        let recipeById = await getRecipes.filter(r => r.id == id)
        res.send(recipeById)
    }else{
        res.status(404).send('Hubo un error.')
    }
})

//add recipe to db
recipeRouter.post('/', async (req, res) => {
    let {
        name,
        image,
        summary,
        spoonacularScore,
        healthScore,
        instructions,
        created,
        diets,
        dishTypes
    } = req.body;

    console.log(diets)

    let addRecipe = await Recipe.create({
        name,
        image,
        summary,
        spoonacularScore,
        healthScore,
        instructions,
        dishTypes,
        created
    })

    let type = await Type.findAll({
        where: {name : diets}
    })
    addRecipe.addType(type);
    res.send('Se guardo la receta correctamente.')
})

module.exports = recipeRouter;
import axios from 'axios';

export function getAllRecipes(){
    return async function (dispatch){
        const allRecipes = await axios.get('http://localhost:3001/recipes')
        return dispatch({
            type: 'GET_ALL_RECIPES',
            payload: allRecipes.data
        })
    }
}

export function getRecipesByName(name){
    return async function (dispatch){
        let getByName = await axios.get('http://localhost:3001/recipes?name=' + name)
        return dispatch({
            type: 'GET_BY_NAME',
            payload: getByName.data
        })
    }
}

export function getDetail(id){
    return async function (dispatch){
        const detail = await axios.get('http://localhost:3001/recipes/' + id)
        return dispatch({
            type: 'GET_DETAIL',
            payload: detail.data
        })
    }
}

export function getAllTypes(){
    return async function (dispatch){
        const allTypes = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_ALL_TYPES',
            payload: allTypes.data
        })
    }
}

export function orderByAToZ(payload){
    return {
        type: 'ORDER_BY_A_TO_Z',
        payload
    }
}

export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function filterByDietType(payload){
    return{
        type: 'FILTER_BY_DIET_TYPE',
        payload
    }
}

export function postRecipe(payload){
    return async function (dispatch){
        const postRecipe = await axios.post('http://localhost:3001/recipes', payload)
        return postRecipe
    }
}
const initialState = {
    recipes: [],
    allRecipes: [],
    detail: [],
    types: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        //get all recipes
        case 'GET_ALL_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        //get by name
        case 'GET_BY_NAME':
            return{
                ...state,
                recipes: action.payload
            }
        //get detail
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        //get all types
        case 'GET_ALL_TYPES':
            return {
                ...state,
                types: action.payload
            }
        //order by name
        case 'ORDER_BY_A_TO_Z':
            let orderByNames = action.payload === 'asc' ?
            state.recipes.sort(function (a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1
                }
                return 0
            }) :
            state.recipes.sort(function (a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: orderByNames
            }

            //order by score
        case 'ORDER_BY_SCORE':
            let orderByScores = action.payload === 'high' ?
            state.recipes.sort(function (a,b){
                if(a.spoonacularScore > b.spoonacularScore){
                    return -1;
                }
                if(a.spoonacularScore < b.spoonacularScore){
                    return 1
                }
                return 0
            }) :
            state.recipes.sort(function (a,b){
                if(a.spoonacularScore > b.spoonacularScore){
                    return 1;
                }
                if(a.spoonacularScore < b.spoonacularScore){
                    return -1
                }
                return 0
            })
            return {
                ...state,
                recipes: orderByScores
            }

            //filter by diet type
            case 'FILTER_BY_DIET_TYPE':
                const allRecipes = state.allRecipes
                console.log(allRecipes)
                const filtered = action.payload === 'all' ?
                allRecipes : 
                allRecipes.filter(r => {
                    if(r.created){
                        return r.types.map(t => t.name === action.payload)
                    }else{
                        return r.diets.includes(action.payload)
                    }
                })
                return {
                    ...state,
                    recipes: filtered
                }
            //post
            case 'POST_RECIPE':
                return{
                    ...state
                }
            //default case
            default:
                return state;
    }
}

export default rootReducer;
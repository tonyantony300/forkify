import { async } from 'regenerator-runtime'
import {API_URL} from './config.js'
import { getJSON} from './helpers'

export const state = {
    recipe: {},
    search:{
        query:'',
        results:[]
    }
}

export const loadRecipe = async function(id) {

    try{
           const data = await getJSON(`${API_URL}${id}`)

            const { recipe } = data.data
            state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredints: recipe.ingredients
            }
            // console.log(state.recipe)

    }catch(err){
        //temp error handling
        console.error(`${err}`)
        throw err
    }
}


export const loadSearchResults = async function(query){

    try{
   
        const data = await getJSON(`${API_URL}?search=${query}`)
        // console.log(data)
        state.query = query
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
       

    }catch(err){
        console.log(err)
        throw err
    }
}

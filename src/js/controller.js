
import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';




// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



let controlRecipes = async function(){
  
  try{

    let id = window.location.hash.slice(1)

    if(!id) return 
    recipeView.renderSpinner();
    // 1) loading the data 
    await model.loadRecipe(id)
    // const {recipe} =  model.state
    // 2 Rendering the recipe
   recipeView.render(model.state.recipe)
   

    
  }catch(err){
    console.log(err)
    recipeView.renderError()
  }

}

const controlSearchResults = async function(){
   try{
    
        const query = searchView.getQuery();
        if(!query) return
        await model.loadSearchResults(query)
        console.log(model.state.search.results)
       

   }catch(err){
      console.log(err)
   }

}



const init = function(){
recipeView.getHandlerRender(controlRecipes)
searchView.addHandlerSearch(controlSearchResults)
}
init()


import * as model from './model'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js'
import paginationView from './views/pagination.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime';





// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if(module.hot){
//   module.hot.accept()
// }


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
        ResultsView.renderSpinner()
        const query = searchView.getQuery();
        if(!query) return
        await model.loadSearchResults(query)
        //console.log()
        // console.log(model.getSearchResultPage(1))
        ResultsView.render(model.getSearchResultPage(2))
        paginationView.render(model.state.search);
 

   } catch(err){
      console.log(err)
   }

}

const controlPagination = function(goToPage){
  ResultsView.render(model.getSearchResultPage(goToPage))
  paginationView.render(model.state.search);
}



const init = function(){

recipeView.getHandlerRender(controlRecipes)
searchView.addHandlerSearch(controlSearchResults)
paginationView.addHandlerClick(controlPagination)

}
init()

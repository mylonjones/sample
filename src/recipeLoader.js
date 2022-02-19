import { addRecipes } from './redux'
import axios from 'axios'
import store from './redux/store'

const key = process.env.REACT_APP_API_SPOONACULAR

axios({
  method: 'get',
  url: `https://api.spoonacular.com/recipes/random/?number=5&apiKey=${key}`,
  responseType: 'json'
})
  .then((response) => {
    const data = response.data.recipes
    store.dispatch(addRecipes(data.map((recipe)=>{
      return {
        calories: recipe.pricePerServing,
        name: recipe.title,
        image: recipe.image
      }
    })))
  })


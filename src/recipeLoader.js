import { addRecipes } from './redux'
import store from './redux/store'
// import axios from 'axios'

// const key = process.env.REACT_APP_API_SPOONACULAR

const tempData = [{calories:34.82,name:"Alouette Sundried Tomato and Basil Bisque",image:"https://spoonacular.com/recipeImages/632250-556x370.jpg"},{calories:83.36,name:"Sex in a glass",image:"https://spoonacular.com/recipeImages/659782-556x370.jpg"},{calories:168.58,name:"Creamy Porcini Mushroom Polenta",image:"https://spoonacular.com/recipeImages/640677-556x370.jpg"},{calories:76.34,name:"Restaurant Style Salsa",image:"https://spoonacular.com/recipeImages/658180-556x370.png"},{calories:355.78,name:"African Chicken Peanut Stew",image:"https://spoonacular.com/recipeImages/716268-556x370.jpg"}]

store.dispatch(addRecipes(tempData.map((recipe)=>{
  return {
    calories: Math.trunc(recipe.calories),
    name: recipe.name,
    image: recipe.image
  }
})))

// axios({
//   method: 'get',
//   url: `https://api.spoonacular.com/recipes/random/?number=5&apiKey=${key}`,
//   responseType: 'json'
// })
//   .then((response) => {
//     const data = response.data.recipes
//     store.dispatch(addRecipes(data.map((recipe)=>{
//       return {
//         calories: Math.trunc(recipe.pricePerServing),
//         name: recipe.title,
//         image: recipe.image
//       }
//     })))
//   })


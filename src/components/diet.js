import React from 'react'
import { connect } from 'react-redux'
import { addCalories, addRecipes, editCalories } from '../redux'
import axios from 'axios'
import CalorieCounter from './calorieCounter'
import sampleRecipes from '../recipeLoader.js'

const key = process.env.REACT_APP_API_SPOONACULAR

class Diet extends React.Component {
  constructor(props) {
    super (props)

    this.state = {
      query: '',
      recipes: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
  }

  componentDidMount() {
    this.setState({
      recipes: sampleRecipes
    })
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddCalories (meal) {
    let newMeal = {
      name: meal.name,
      cal: meal.calories,
      index: this.props.calories.length,
      type: 'meal'
    }
    this.props.addCalories(newMeal)
    localStorage.setItem('meals', JSON.stringify(this.props.calories.concat([newMeal])))
  }

  searchHandler(e) {
    e.preventDefault()

    axios({
      methos: 'get',
      url: 'https://api.spoonacular.com/recipes/complexSearch',
      params: {
        apiKey: key,
        query: this.state.query,
        instructionsRequired: true,
        number: 5,
        minCalories: 0
      }
    })
    .then((response) => {
      const data = response.data.results
      console.log(response)
      this.setState({
        recipes: data.map((recipe)=>{
          return {
            calories: Math.trunc(recipe.nutrition.nutrients[0].amount),
            name: recipe.title,
            image: recipe.image
          }
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })


    this.setState({
      query: ''
    })
  }

  render() {

    return (
      <div className='dietContainer split' >
        <CalorieCounter type='meal' />
        <div className='recipes' >
          <div className='search' >
            <form onSubmit={this.searchHandler} >
              <label>
                <input type='text' autoComplete='off' name='query' value={this.state.query} onChange={this.changeHandler}  />
              </label>
              <input type='submit' value='search' />
            </form>
          </div>
          {this.state.recipes.map((recipe, index) => {
            return (<div className='recipeCard' key={index}>
              <img
                className='recipeImage'
                src={recipe.image}
                alt={recipe.image}
              />
              <div className='recipeInfo' >
                <div className='recipeName' >
                  {recipe.name}
                </div>
                <div className='recipeCalories' >
                  {recipe.calories}
                </div>
                <button onClick={() => {this.handleAddCalories(recipe)}} className='addRecipeCaloriesButton' >add calories</button>
              </div>
            </div>)
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    calories: state.caloriesReducer.calories,
    recipes: state.recipesReducer.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCalories: (value) => dispatch(addCalories(value)),
    editCalories: (item, index) => dispatch(editCalories(item, index)),
    addRecipes: (value) => dispatch(addRecipes(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Diet)
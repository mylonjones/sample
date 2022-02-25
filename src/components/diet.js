import React from 'react'
import { connect } from 'react-redux'
import { addCalories, addRecipes, editCalories } from '../redux'
import CalorieCounter from './calorieCounter'

class Diet extends React.Component {
  // constructor(props) {
  //   super (props)
  // }

  componentDidMount() {
    require('../recipeLoader.js')
  }

  handleAddCalories (meal) {
    let newMeal = {
      name: meal.name,
      cal: meal.calories,
      index: this.props.calories.length
    }
    this.props.addCalories(newMeal)
    localStorage.setItem('meals', JSON.stringify(this.props.calories.concat([newMeal])))
  }

  render() {
    const filter = function(calorieSet) {return calorieSet.cal >= 0}

    return (
      <div className='dietContainer split dashPartition' >
        <CalorieCounter tracking='meal' filter={filter} sign='+' />
        <div className='recipes' >
          {this.props.recipes.map((recipe, index) => {
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
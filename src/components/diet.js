import React from 'react'
import { connect } from 'react-redux'
import { addCalories, addRecipes, editCalories } from '../redux'

class Diet extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      edit: null,
      name: '',
      cal: ''
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    require('../recipeLoader.js')
  }

  handleCalorieSubmit (e) {
    let newMeal = {
      name: e.target[0].value,
      cal: parseInt(e.target[1].value)
    }
    this.props.addCalories(newMeal)
    localStorage.setItem('meals', JSON.stringify(this.props.calories.concat([newMeal])))
    e.target[0].value = ''
    e.target[1].value = ''
    e.preventDefault();
  }

  handleEditSubmit (e) {
    e.preventDefault();

    if(e.target[0].value.length === 0 || e.target[1].value.length === 0) {
      this.setState({
        edit: null
      })
      return
    }
    let newMeal = {
      name: e.target[0].value,
      cal: parseInt(e.target[1].value)
    }

    let meals = this.props.calories
    meals.splice(e.target.getAttribute('index'), 1, newMeal)


    this.props.editCalories(newMeal, e.target.getAttribute('index'))

    localStorage.setItem('meals', JSON.stringify(meals))

    this.setState({
      edit: null
    })
  }

  handleChange (e, key) {
    this.setState({
      [key]: e.target.value
    })
  }

  handleEditClick (index) {
    this.setState({
      edit: index
    })
  }

  handleAddCalories (meal) {
    let newMeal = {
      name: meal.name,
      cal: meal.calories
    }
    this.props.addCalories(newMeal)
    localStorage.setItem('meals', JSON.stringify(this.props.calories.concat([newMeal])))
  }

  render() {
    const total = this.props.calories.slice(1).reduce((prev, current) => prev + current.cal, 0);

    return (
      <div className='dietContainer split dashPartition' >
        <div className='calorieCounter' >
          <div className='total' >
            {'total '}
            {total}
          </div>
          <div className='meals' >
            {this.props.calories.map((obj, index)=>{
              obj.index = index
              if(index === this.state.edit) {
                return (
                  <form
                    className='meal'
                    key={index}
                    onSubmit={this.handleEditSubmit}
                    index={index}
                    >
                    <input
                      type='text'
                      onChange={(e)=>{this.handleChange(e, 'name')}}
                      value={this.name}
                      placeholder={obj.name}
                      className='mealName' />
                    <input
                      type='text'
                      onChange={(e)=>{this.handleChange(e, 'cal')}}
                      value={this.cal}
                      placeholder={obj.cal}
                      className='amount' />
                    <input
                      type='submit'
                      className='editMealButton'
                      value='change' />
                  </form>
                )
              } else {
                return (
                  <div
                    className='meal'
                    key={index}
                    index={index}
                    >
                    <div className='mealName' >
                      {obj.name}
                    </div>
                    <div className='amount' >
                      {obj.cal}
                    </div>
                    <button
                      onClick={()=>{this.handleEditClick(index)}}
                      className='editMealButton'
                      > edit </button>
                  </div>
                )
              }
          })}</div>
          <div className='mealForm' >
            <form onSubmit={this.handleCalorieSubmit}>
              <label>
                meal
                <input type='text' autoComplete="off" name='meal' />
              </label>
              <label>
                cal
                <input type='text' autoComplete="off" name='cal' />
              </label>
              <input type='submit' value='add' />
            </form>
          </div>
        </div>
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
    calories: state.calorieReducer.calories,
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
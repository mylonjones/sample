import React from 'react'
import { connect } from 'react-redux'
import { addCalories, addRecipes } from '../redux'

class Diet extends React.Component {
  constructor(props) {
    super (props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    require('../recipeLoader.js')
  }


  handleSubmit (e) {
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

  render() {
    const total = this.props.calories.reduce((prev, current) => prev + current.cal, 0);
    console.log(this.props.recipes)

    return (
      <div className='dietContainer split dashPartition' >
        <div className='calorieCounter' >
          <div className='total' >
            {'total '}
            {total}
          </div>
          <div className='meals' >
            name
            {this.props.calories.map((obj, index)=>{
            return (
              <div key={index}>
                {obj.name}
              </div>
            )
          })}</div>
          <div className='amounts' >
            amounts
            {this.props.calories.map((obj, index)=>{
            return (
              <div key={index}>
                {obj.cal}
              </div>
            )
          })}</div>
          <div className='mealForm' >
            <form onSubmit={this.handleSubmit}>
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
        <div className='recipes' ></div>
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
    addRecipes: (value) => dispatch(addRecipes(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Diet)
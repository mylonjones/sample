import React from 'react'
import { connect } from 'react-redux'
import { addCalories } from '../redux'
import axios from 'axios'

const key = process.env.REACT_APP_API_SPOONACULAR

let data = {}
axios({
  method: 'get',
  url: `https://api.spoonacular.com/recipes/complexSearch?number=5&apiKey=${key}&minCalories=50`,
  responseType: 'json'
})
  .then((response) => {
    data = response.data.results
    console.log(data)
  })

function Diet(props) {
  const total = props.calories.reduce((prev, current) => prev + current.cal, 0);

  function handleSubmit (e) {
    let newMeal = {
      name: e.target[0].value,
      cal: parseInt(e.target[1].value)
    }
    props.addCalories(newMeal)
    localStorage.setItem('meals', JSON.stringify(props.calories.concat([newMeal])))
    e.target[0].value = ''
    e.target[1].value = ''
    e.preventDefault();
  }

  return (
    <div className='dietContainer split dashPartition' >
      <div className='calorieCounter' >
        <div className='total' >
          {'total '}
          {total}
        </div>
        <div className='meals' >
          name
          {props.calories.map((obj, index)=>{
          return (
            <div key={index}>
              {obj.name}
            </div>
          )
        })}</div>
        <div className='amounts' >
          amounts
          {props.calories.map((obj, index)=>{
          return (
            <div key={index}>
              {obj.cal}
            </div>
          )
        })}</div>
        <div className='mealForm' >
          <form onSubmit={handleSubmit}>
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



const mapStateToProps = state => {
  return {
    calories: state.calories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCalories: (value) => dispatch(addCalories(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Diet)
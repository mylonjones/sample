import React from 'react'
import { connect } from 'react-redux'
import { addCalories } from '../redux'



function Diet(props) {
  const total = props.calories.reduce((prev, current) => prev + current.cal, 0);

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
    addCalories: () => dispatch(addCalories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Diet)
import React from 'react'
import { connect } from 'react-redux'
import { addCalories, editCalories } from '../redux'

class CalorieCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { edit: null, name: '', cal: '' }
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCalorieSubmit = this.handleCalorieSubmit.bind(this)
  }

  handleCalorieSubmit (e) {
    e.preventDefault();
    let calorieSet = {
      name: e.target[0].value,
      cal: parseInt(this.props.sign + e.target[1].value),
      index: this.props.calories.length
    }
    this.props.addCalories(calorieSet)
    localStorage.setItem('meals', JSON.stringify(this.props.calories.concat([calorieSet])))
    e.target[0].value = ''
    e.target[1].value = ''
  }

  handleEditSubmit (e) {
    e.preventDefault();

    if(e.target[0].value.length === 0 || e.target[1].value.length === 0) {
      this.setState({
        edit: null
      })
      return
    }
    let calorieSet = {
      name: e.target[0].value,
      cal: parseInt(this.props.sign + e.target[1].value),
      index: parseInt(e.target.getAttribute('index'))
    }

    let calories = this.props.calories
    calories.splice(e.target.getAttribute('index'), 1, calorieSet)


    this.props.editCalories(calorieSet, e.target.getAttribute('index'))

    localStorage.setItem('meals', JSON.stringify(calories))

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

  render() {
    let countedCalories = this.props.calories.filter(this.props.filter)

    const total = countedCalories.reduce((prev, current) => prev + current.cal, 0);

    return(<div className='calorieCounter' >
      <div className='total' >
        {'total '}
        {Math.abs(total)}
      </div>
      <div className='calorieSets' >
        <div className='calorieSet' >
          <div className='calorieTitle' > {this.props.tracking} </div>
          <div className='calorieAmount' > calories </div>
        </div>
        {countedCalories.map((obj, index)=>{
          if(obj.index === this.state.edit) {
            return (
              <form
                className='calorieSet'
                key={index}
                onSubmit={this.handleEditSubmit}
                index={obj.index}
                >
                <input
                  type='text'
                  onChange={(e)=>{this.handleChange(e, 'name')}}
                  value={this.name}
                  placeholder={obj.name}
                  className='calorieTitle' />
                <input
                  type='text'
                  onChange={(e)=>{this.handleChange(e, 'cal')}}
                  value={this.cal}
                  placeholder={Math.abs(obj.cal)}
                  className='calorieAmount' />
                <input
                  type='submit'
                  className='editCaloriesButton'
                  value='change' />
              </form>
            )
          } else {
            return (
              <div
                className='calorieSet'
                key={index}
                index={obj.index}
                >
                <div className='calorieTitle' >
                  {obj.name}
                </div>
                <div className='calorieAmount' >
                  {Math.abs(obj.cal)}
                </div>
                <button
                  onClick={()=>{this.handleEditClick(obj.index)}}
                  className='editCaloriesButton'
                  > edit </button>
              </div>
            )
          }
      })}</div>
      <div className='calorieForm' >
        <form onSubmit={this.handleCalorieSubmit}>
          <label>
            {this.props.tracking}
            <input type='text' autoComplete="off" name='meal' />
          </label>
          <label>
            calories
            <input type='text' autoComplete="off" name='calories' />
          </label>
          <input type='submit' value='add' />
        </form>
      </div>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    calories: state.caloriesReducer.calories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCalories: (value) => dispatch(addCalories(value)),
    editCalories: (item, index) => dispatch(editCalories(item, index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CalorieCounter)
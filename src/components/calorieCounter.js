import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addCalories, editCalories, deleteOneCalories } from '../redux'

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
      cal: parseInt(e.target[1].value),
      index: this.props.calories.length,
      type: this.props.type
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
      cal: parseInt(e.target[1].value),
      index: parseInt(e.target.getAttribute('index')),
      type: this.props.type
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

  handleDeleteOneClick (index) {
    this.props.deleteOneCalories(index)
    localStorage.setItem('meals', JSON.stringify(this.props.calories))
    this.forceUpdate()
  }

  handleSubmitForDay () {
    let id = 1
    let calories = JSON.parse(localStorage.getItem('meals'))
    const d = new Date()
    let day = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()
    let date = year + '-' + month + '-' + day

    axios({
      method: 'post',
      url: '/api/days',
      data: {
        id,
        date,
        calories
      }})
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
  }

  render() {
    let countedCalories = this.props.calories.filter(calories => calories.type === this.props.type)

    const total = countedCalories.reduce((prev, current) => prev + current.cal, 0);

    return(<div className='calorieCounter' >
      <div className='total' >
        {'total '}
        {total}
      </div>
      <button className='dailySubmit'
      onClick={this.handleSubmitForDay}
      >submit for the day</button>
      <div className='calorieSets' >
        <div className='calorieSet' >
          <div className='calorieTitle' > {this.props.type} </div>
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
                  className='textInput' />
                <input
                  type='text'
                  onChange={(e)=>{this.handleChange(e, 'cal')}}
                  value={this.cal}
                  placeholder={obj.cal}
                  className='textInput' />
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
                  {obj.cal}
                </div>
                <button
                  className='deleteOneButton'
                  onClick={()=>{this.handleDeleteOneClick(obj.index)}}
                  > X </button>
                <button
                  onClick={()=>{this.handleEditClick(obj.index)}}
                  className='editCaloriesButton'
                  > edit </button>
              </div>
            )
          }
      })}</div>
      <form className='calorieForm' onSubmit={this.handleCalorieSubmit}>
        <label>
          {this.props.type}
          <br/>
          <input type='text' autoComplete="off" name='meal' className='textInput' />
        </label>
        <label>
          calories
          <br/>
          <input type='text' autoComplete="off" name='calories' className='textInput' />
        </label>
        <input type='submit' value='add' />
      </form>
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
    editCalories: (item, index) => dispatch(editCalories(item, index)),
    deleteOneCalories: (index) => dispatch(deleteOneCalories(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CalorieCounter)
import React from 'react'
import axios from 'axios'

function Days(props) {
  return (<div className='calorieSets history' >
    {props.days.map((day, index)=>{
      let date = new Date(day.date)
      return (<div
        className='calorieSet'
        key={index}
        >
        <div className='calorieTitle' onClick={() => {props.handleClick(index)}} >
          {props.parseDay(date.getDay())}
        </div>
      </div>)
    })}
  </div>)
}

function CaloriesHistory(props) {

  let countedCalories = []
  if(props.day){
    countedCalories = props.day.sets.filter(calories => calories.type === props.type)
  }


  // const total = countedCalories.reduce((prev, current) => prev + current.cal, 0);

  return (<div className='calorieSets history' >
    <div className='calorieSet' >
      <div className='calorieTitle' > {props.type} </div>
      <div className='calorieAmount' > calories </div>
    </div>
      {countedCalories.map((obj, index)=>{
        return (<div
          className='calorieSet'
          key={index}
          >
          <div className='calorieTitle' >
            {obj.name}
          </div>
          <div className='calorieAmount' >
            {obj.calories}
          </div>
        </div>)
      })}
  </div>)
}


class History extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      days: [],
      component: <div/>,
      dayIndex: 0
    }
    this.handleDayClick = this.handleDayClick.bind(this)
  }

  componentDidMount () {


    axios({
      method: 'get',
      url: `/api/days/${1}`
    })
      .then((result) => {
        this.setState({
          days: result.data
        })
      })
      .then(() => {
        this.setState({
          component: <Days days={this.state.days} parseDay={this.parseDay} handleClick={this.handleDayClick} />
        })
      })
      .catch(e => console.log(e))
  }

  handleDayClick(index) {
    this.setState({
      component: <CaloriesHistory type={this.props.type} day={this.state.days[index]} />
    })
  }

  parseDay(num) {
    switch (num) {
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      default:
        return 'Not a day'
    }
  }





  render() {
    return (<div className='calorieCounter calorieDisplay'>
      history
      <div className='historyContainer'>
        <button
          className='historyButton'
          onClick={this.props.toggle}
        >show today</button>
      </div>
      {this.state.component}
    </div>)
  }

}


export default History
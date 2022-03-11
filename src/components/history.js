import React from 'react'
import axios from 'axios'

class History extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      days: []
    }
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
      .catch(e => console.log(e))
  }



  render() {
    let day = this.state.days[0]

    let countedCalories = []
    if(day){
      countedCalories = day.sets.filter(calories => calories.type === this.props.type)
    }


    // const total = countedCalories.reduce((prev, current) => prev + current.cal, 0);

    return (<div className='calorieCounter calorieDisplay'>
      history
      <div className='historyContainer'>
        <button
          className='historyButton'
          onClick={this.props.toggle}
        >show today</button>
      </div>
      <div className='calorieSets history' >
        <div className='calorieSet' >
          <div className='calorieTitle' > {this.props.type} </div>
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
        })}</div>
      </div>)
    }

}


export default History
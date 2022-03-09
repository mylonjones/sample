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
      .then(() => {
        this.setState({
          days: []
        })
      })
      .catch(e => console.log(e))
  }



  render() {
    return (<div className='calorieDisplay'>
    history
    <div className='historyContainer'>
      <button
        className='historyButton'
        onClick={this.props.toggle}
      >show today</button>
    </div>
  </div>)
  }

}


export default History
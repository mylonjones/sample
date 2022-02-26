import React from 'react'
// import axios from 'axios'
import videoData from '../videodata'
import CalorieCounter from './calorieCounter'
// const key = process.env.REACT_APP_API_YOUTUBE

// import ReactPlayer from 'react-player'
// <ReactPlayer controls url='http://www.youtube.com/embed/6w7XxuH6iL8' ></ReactPlayer>


class Exercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      displayPosition: 0,
      currentVideo: <div className='videoPlaceHolder'/>,
      gender: '',
      weight: '',
      feet: '',
      inches: '',
      age: '',
      activity: 1.2,
      dailyBurn: 0
    }

    this.moveRight = this.moveRight.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount() {
    // axios({
    //   method: 'get',
    //   url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&channelId=UCEbbyBuyQiHpKiOMj9GFhVw&key=${key}`,
    //   responseType: 'json'
    // })
    // .then((response) => {
    //   const videos = response.data.items
    //   console.log(videos)

    // })

    const snippet = videoData.map((video)=>{
      return {
        id: video.id.videoId,
        description: video.snippet.description,
        title: video.snippet.title,
        thumbnails: video.snippet.thumbnails
      }
    })
    this.setState({videos: snippet})
  }

  moveRight() {
    const videoContainers = document.getElementsByClassName('snippetContainer')

    if(this.state.displayPosition >= this.state.videos.length - 3) {
      for(let display of videoContainers) {
        display.style.transform = ''
      }
      this.setState({
        displayPosition: 0
      })
    } else {
      for(let display of videoContainers) {
        display.style.transform += 'translateX(-290px)'
      }
      this.setState({
        displayPosition: this.state.displayPosition + 1
      })
    }
  }

  moveLeft() {
    const videoContainers = document.getElementsByClassName('snippetContainer')
    if(this.state.displayPosition <= 0) {
      for(let display of videoContainers) {
        display.style.transform = 'translateX(' + ((this.state.videos.length - 3) * (-290)) + 'px)'
      }
      this.setState({
        displayPosition: this.state.videos.length - 3
      })
    } else {
      for(let display of videoContainers) {
        display.style.transform += 'translateX(290px)'
      }
      this.setState({
        displayPosition: this.state.displayPosition - 1
      })
    }
  }

  handleVideoClick(id) {
    this.setState({
      currentVideo: <iframe
        className='video'
        title='exercise'
        src={`//www.youtube.com/embed/${id}`}
        ></iframe>
    })
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler(e) {
    e.preventDefault()
    let { gender, weight, feet, inches, age, activity } = this.state
    weight = parseFloat(weight)
    feet = parseFloat(feet)
    inches = parseFloat(inches)
    age = parseFloat(age)

    let fields = { weight, feet, inches, age }
    console.log(fields)
    for(let key in fields) {
      if(isNaN(fields[key])) {
        console.log('enter a real number for ' + key)
        return
      }
    }

    let calculated = 0

    if(gender === 'male') {
      calculated = (66 + 6.2 * weight + 12.7 * (12 * feet + inches) - 6.76 * age) * activity
    } else {
      calculated = (655.1 + 4.35 * weight + 4.7 * (12 * feet + inches) - 4.7 * age) * activity
    }

    this.setState({
      dailyBurn: Math.trunc(calculated)
    })
  }


  render() {

    return (<div className='exerciseContainer dashPartition' >
      <div className='exerciseCalorieContainer split' >
        <CalorieCounter type='workout' />
        <div className='calorieCalculator' >
          <h3>Daily Calorie Burn Calculator</h3>
          <form className='calculatorForm' onSubmit={this.submitHandler} >
            <label>
              gender
              <br/>
              <div className='calculatorField' >
                <input
                  type='checkbox'
                  name='gender'
                  value='male'
                  onChange={this.changeHandler}
                  checked={this.state.gender === "male"}
                  ></input>male
                <input
                  type='checkbox'
                  name='gender'
                  value='female'
                  onChange={this.changeHandler}
                  checked={this.state.gender === "female"}
                  ></input>female
              </div>
            </label>

            <label>
              weight
              <br/>
              <input onChange={this.changeHandler} value={this.state.weight} className='textInput calculatorField' name='weight' type='number'></input>
            </label>

            <label>
              height
              <br/>
              <input onChange={this.changeHandler} value={this.state.feet} className='textInput' name='feet' type='number' placeholder='feet' ></input>
              <br/>
              <input onChange={this.changeHandler} value={this.state.inches} className='textInput calculatorField' name='inches' type='number' placeholder='inches' ></input>
            </label>

            <label>
              age
              <br/>
              <input onChange={this.changeHandler} value={this.state.age} className='textInput calculatorField' name='age' type='number' ></input>
            </label>

            <label>
              activity
              <br/>
              <select className='calculatorField' onChange={this.changeHandler} value={this.state.activity} name='activity' >
                <option value={1.2} >none</option>
                <option value={1.37} >low</option>
                <option value={1.55} >medium</option>
                <option value={1.725} >high</option>
                <option value={1.9} >extreme</option>
              </select>
            </label>

            <input type='submit' className='calculatorField' value='calculate' />
            {'Your daily burn is ' + this.state.dailyBurn}
          </form>
        </div>
      </div>
      <div className='snippetDisplayContainer' >
        <button onClick={this.moveLeft}>left</button>
        <div className='snippetDisplay'>
          {this.state.videos.map((video, index)=>{
            return(<div
              key={index}
              className='snippetContainer'
              onClick={()=>{this.handleVideoClick(video.id)}} >
              <img
                className='snippet'
                src={video.thumbnails.default.url}
                alt={video.title} />
            </div>)
          })}
        </div>
        <button onClick={this.moveRight}>right</button>
      </div>
      <div className='videoContainer' >
        {this.state.currentVideo}
      </div>



    </div>)
  }
}

export default Exercise


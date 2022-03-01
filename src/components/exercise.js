import React from 'react'
import axios from 'axios'
import sampleVidoes from '../videodata'
import CalorieCounter from './calorieCounter'
const key = process.env.REACT_APP_API_YOUTUBE


class Exercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      displayPosition: 0,
      query: '',
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
    this.searchHandler = this.searchHandler.bind(this)
  }

  componentDidMount() {
    const snippet = sampleVidoes.map((video)=>{
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
    let width = videoContainers[0].offsetWidth

    if(this.state.displayPosition >= this.state.videos.length - 3) {
      for(let display of videoContainers) {
        display.style.transform = ''
      }
      this.setState({
        displayPosition: 0
      })
    } else {
      for(let display of videoContainers) {
        display.style.transform += 'translateX(-' + width + 'px)'
      }
      this.setState({
        displayPosition: this.state.displayPosition + 1
      })
    }
  }

  moveLeft() {
    const videoContainers = document.getElementsByClassName('snippetContainer')
    let width = videoContainers[0].offsetWidth

    if(this.state.displayPosition <= 0) {
      for(let display of videoContainers) {
        display.style.transform = 'translateX(' + ((this.state.videos.length - 3) * (-width)) + 'px)'
      }
      this.setState({
        displayPosition: this.state.videos.length - 3
      })
    } else {
      for(let display of videoContainers) {
        display.style.transform += 'translateX(' + width + 'px)'
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
    inches = parseFloat(inches)
    inches = inches ? inches : 0
    let height = parseFloat(feet) * 12 + inches
    weight = parseFloat(weight)
    age = parseFloat(age)

    let fields = { weight, height, age }
    let missingField = false
    for(let key in fields) {
      let warning = document.getElementById(key)
      warning.innerHTML = key
      warning.classList.remove('warning')
      if(isNaN(fields[key])) {
        warning.classList.add('warning')
        warning.innerHTML += ' must be a valid number'
        missingField = true
      }
    }
    if(missingField) return

    let calculated = 0

    // Revised Harris-Benedict Equation
    if(gender === 'male') {
      calculated = (88.362 + 0.453592 * 13.397 * weight + 2.54 * 4.799 * height - 5.677 * age) * activity
    } else {
      calculated = (447.593 + 0.453592 * 9.247 * weight + 2.54 * 3.098 * height - 4.33 * age) * activity
    }

    this.setState({
      dailyBurn: Math.trunc(calculated)
    })
  }

  searchHandler(e) {
    e.preventDefault()

    axios({
      methos: 'get',
      url: 'https://youtube.googleapis.com/youtube/v3/search',
      params: {
        key: key,
        part: 'snippet',
        channelId: 'UCEbbyBuyQiHpKiOMj9GFhVw',
        q: this.state.query,
        type: 'video'
      }
    })
    .then((response) => {
      let snippets = response.data.items
      snippets = snippets.map((video)=>{
        return {
          id: video.id.videoId,
          description: video.snippet.description,
          title: video.snippet.title,
          thumbnails: video.snippet.thumbnails
        }
      })

      this.setState({
        videos: snippets
      })
    })
    .catch((err) => {
      console.log(err)
    })


    this.setState({
      query: ''
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
              <div id='weight' >weight</div>
              <input onChange={this.changeHandler} value={this.state.weight} className='textInput calculatorField' name='weight' type='number'></input>
            </label>

            <label>
              <div id='height' >height</div>
              <input onChange={this.changeHandler} value={this.state.feet} className='textInput' name='feet' type='number' placeholder='feet' ></input>
              <input onChange={this.changeHandler} value={this.state.inches} className='textInput calculatorField' name='inches' type='number' placeholder='inches' ></input>
            </label>

            <label>
              <div id='age' >age</div>
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
      <div className='search' >
        <form onSubmit={this.searchHandler} >
          <label>
            <input type='text' autoComplete='off' name='query' value={this.state.query} onChange={this.changeHandler}  />
          </label>
          <input type='submit' value='search' />
        </form>
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


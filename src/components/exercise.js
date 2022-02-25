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
      currentVideo: <div className='videoPlaceHolder'/>
    }

    this.moveRight = this.moveRight.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
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


  render() {
    const filter = function(calorieSet) {return calorieSet.cal <= 0}

    return (<div className='exerciseContainer dashPartition' >
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
      <div className='split' >
        <CalorieCounter tracking='workout' filter={filter} sign='-' />
      </div>


    </div>)
  }
}

export default Exercise


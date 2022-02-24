import React from 'react'
// import axios from 'axios'
import videoData from '../videodata'
// const key = process.env.REACT_APP_API_YOUTUBE


class Exercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }

    this.moveRight = this.moveRight.bind(this)
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
    // const display = document.getElementsByClassName('videoDisplay')[0]

    // display.style.transform = 'translateX(0px)'
    // setTimeout(()=>{
    //   let videos = this.state.videos
    //   let last = videos.pop()
    //   this.setState({
    //     videos: [last].concat(videos)
    //   },()=>{
    //     const display = document.getElementsByClassName('videoDisplay')[0]
    //     display.style.transition = ''
    //     display.style.transform = 'translateX(-290px)'
    //   })

    // }, 1000)
  }

  moveLeft() {
    const display = document.getElementsByClassName('videoDisplay')[0]
    display.style.transform = 'translateX(-580px)'
    setTimeout(()=>{
      console.log(this)
    }, 1000)
  }


  render() {
    return (<div>
      <div className='videoDisplay'>
        {this.state.videos.map((video, index)=>{
          let positionClass = 'right'
          switch (index) {
            case 0:
              positionClass = 'left'
              break;
            case 1:
            case 2:
            case 3:
              positionClass = 'middle'
              break;
            default:
              break;
          }

          return(<div
                  key={index}
                  className={`videoContainer ${positionClass}`} >
            <img
              className='videoSnippet'
              src={video.thumbnails.default.url}
              alt={video.title}
            />
          </div>)
        })}
      </div>
      <button onClick={this.moveLeft}>left</button>
      <button onClick={this.moveRight}>right</button>
    </div>)
  }
}

export default Exercise


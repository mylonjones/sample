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


  render() {
    return (
      <div>
        {this.state.videos.map((video, index)=>{
          return(<div key={index}>
              <img
                className='exerciseSnippet'
                src={video.thumbnails.default.url}
                alt={video.title}
              />
              {video.title}
            </div>)
        })}
      </div>
    )
  }
}

export default Exercise


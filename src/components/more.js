import React, {useState} from 'react'
import PdfViewer from './pdfViewer.js'
// import Notation from './notation.js'




export default function More() {
  const [url, setUrl] = useState();

  async function getFile(e) {
    let fileHandle = document.getElementById('fileInput').files[0]
    setUrl(URL.createObjectURL(fileHandle))

    console.log(url);

  }


  return (
    <div className='filePicker' >
      {/* <Notation /> */}
      <div className='pdfDisplay' >
        {url && <PdfViewer url={url} />}
      </div>
      <input
        type='file'
        title='file input'
        id='fileInput'
        onChange={getFile}
      ></input>
    </div>
  )
}
import React, { useRef, useEffect } from 'react'

export default function Notation() {

  const canvasRef = useRef()


  useEffect(() => {
    let canvas = canvasRef.current
    canvas.width = window.innerWidth * .8
    canvas.height = window.innerWidth * 1.11
  })



  let drawing = false
  function startPosition(e){
    drawing = true
    draw(e)
  }
  function finishedPosition() {
    drawing = false
    let canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
  }

  function draw(e) {
    if(!drawing) return
    let canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    ctx.lineWidth = .51
    ctx.lineCap = 'round'

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  }

  return (
    <canvas
      className='notation'
      ref={canvasRef}
      onMouseDown={startPosition}
      onMouseUp={finishedPosition}
      onMouseMove={draw}
    ></canvas>
  )
}
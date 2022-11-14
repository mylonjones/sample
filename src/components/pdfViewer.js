import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

export default function PdfViewer({url}){
  const canvasRef = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [canvas, setCanvas] = useState()
  const [ctx, setCtx] =  useState()

  const [canvas2, setCanvas2] = useState()
  const [ctx2, setCtx2] =  useState()
  const canvasRef2 = useRef();

  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [lineWidth, setLineWidth] = useState(1.51)


  const renderPage = useCallback((pageNum, pdf=pdfRef) => {
    pdf && pdf.getPage(pageNum).then(function(page) {
      let viewport = page.getViewport({scale: 1});
      const ratio = (window.innerWidth * .8)/viewport.width
      viewport = page.getViewport({scale: ratio})
      const renderContext = { canvasContext: ctx, viewport };
      page.render(renderContext)

      canvas.height = viewport.height;
      canvas.width = viewport.width;
    });
  }, [pdfRef, canvas, ctx]);

  const renderPage2 = useCallback((pageNum, pdf=pdfRef) => {
    pdf && pdf.getPage(pageNum).then(function(page) {
      let viewport = page.getViewport({scale: 1});
      const ratio = (window.innerWidth * .8)/viewport.width
      viewport = page.getViewport({scale: ratio})
      const renderContext = { canvasContext: ctx2, viewport };
      page.render(renderContext)

      canvas2.height = viewport.height;
      canvas2.width = viewport.width;
    });
  }, [pdfRef, canvas2, ctx2]);

  useEffect(() => {
    setCanvas(canvasRef.current)
    setCtx(canvasRef.current.getContext('2d'))
    renderPage(currentPage, pdfRef);

    setCanvas2(canvasRef2.current)
    setCtx2(canvasRef2.current.getContext('2d'))
    renderPage2(currentPage, pdfRef);

  }, [pdfRef, currentPage, renderPage, renderPage2]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(loadedPdf => {
      setPdfRef(loadedPdf);
    }, function (reason) {
      console.error(reason);
    });
  }, [url]);

  useEffect(() => {

    document.body.addEventListener("touchstart", function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, {passive: false});
    document.body.addEventListener("touchend", function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, {passive: false});
    document.body.addEventListener("touchmove", function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, {passive: false});

  })

  let drawing = false

  function getMousePos(e) {
    let touch = e.touches && e.touches[0]
    return {
      x: (e.clientX || touch.clientX) - canvas.offsetLeft, y: (e.clientY || touch.clientY) - canvas.offsetTop + window.scrollY
    }
  }

  function startPosition(e){
    drawing = true
    draw(e)
  }

  function finishedPosition(e) {
    drawing = false
    ctx.beginPath()
  }

  function draw(e) {
    if(!drawing) return
    let position = getMousePos(e)

    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'

    ctx.lineTo(position.x, position.y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(position.x, position.y)
  }

  const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  let handleErase = () => {
    let color = ctx.globalCompositeOperation
    if(color !== 'source-over') {
      ctx.globalCompositeOperation = 'source-over'
      setLineWidth(1.51)
    } else {
      ctx.globalCompositeOperation = 'destination-out'
      setLineWidth(10)
    }
  }

  return (
    <div className='pageContainer' >
      <div className='arrowContainer'>
        <div className='arrow' onClick={prevPage} >{`<`}</div>
        <button onClick={handleErase} >toggle</button>\
        <div className='arrow' onClick={nextPage} >{`>`}</div>
      </div>

      <canvas
        className='sheetMusic'
        ref={canvasRef2}
      ></canvas>
      <canvas
        className='sheetMusic'
        ref={canvasRef}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        onTouchStart={startPosition}
        onTouchEnd={finishedPosition}
        onTouchMove={draw}
      ></canvas>
    </div>
  )
}
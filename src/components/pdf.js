
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export function loadPdf(url, setPdfRef) {
  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(loadedPdf => {
    setPdfRef(loadedPdf);
  }, function (reason) {
    console.error(reason);
  });
}

export function renderPdf(pageNum, pdf, canvas, img, ctx, type) {
  pdf && pdf.getPage(pageNum).then(function(page) {
    let viewport = page.getViewport({scale: 1});
    const ratio = (window.innerWidth * .8)/viewport.width
    viewport = page.getViewport({scale: ratio})

    if(type === 'sheetMusic') {
      const renderContext = { canvasContext: ctx, viewport };
      page.render(renderContext)
    }

    if(type === 'canvas') {
      const savedCanvas = localStorage.getItem('savedCanvas' + pageNum)
      if(savedCanvas) img.src = savedCanvas
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

  });
}
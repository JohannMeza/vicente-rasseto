import { useEffect, useRef } from 'react';
import useLoaderContext from './useLoaderContext';
import { AlertUtilRelease } from '../util/AlertUtil';

let pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

export const useReadLibro = (pdfData, pageNumber = 1) => {
  const setLoader = useLoaderContext();
  let canvasElement = useRef(null);
  
  useEffect(() => {
    if (pdfData && canvasElement) {
      setLoader(true)
      pdfjsLib.getDocument({data: pdfData}).promise.then(function(pdf) {
        setLoader(false)

        pdf.getPage(pageNumber)
        .then(function(page) {
          var scale = 1;
          var viewport = page.getViewport({scale: scale});
      
          // Prepare canvas using PDF page dimensions
          var canvas = canvasElement.current;
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
      
          // Render PDF page into canvas context
          var renderContext = { canvasContext: context, viewport: viewport};
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () { setLoader(false) });
        })
        .catch(err => {
          let { message } = err;
          // setPageNumber(1)
          AlertUtilRelease({title: "Ohh no...!!!", text: message, icon: "warning"})
        });
      }, function (reason) {
        setLoader(false)
        console.error(reason);
      })
    }
  }, [pageNumber, pdfData])

  return [canvasElement]
}
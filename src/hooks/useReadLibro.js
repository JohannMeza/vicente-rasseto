import { useEffect, useRef, useState } from 'react';
import useLoaderContext from './useLoaderContext';
import { AlertUtilRelease } from '../util/AlertUtil';
import { EnvConstant } from '../util/EnvConstant';
import WebViewer from "@pdftron/pdfjs-express";
let pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Leer Libro - Todas las paginas
export const useReadLibroUrl = (pdfData) => {
  const setLoader = useLoaderContext();
  let canvasElement = useRef(null);

  
  useEffect(() => {
    if (canvasElement && pdfData) {
      setLoader(true)
      WebViewer(
        {
          path: "/src/webviewer/lib",
          initialDoc: pdfData,
          licenseKey: EnvConstant.REACT_APP_PDFJS_KEY,
        },
        canvasElement.current
      ).then((instance) => {
        // now you can access APIs through the WebViewer instance
        setLoader(false)
        const { Core, UI } = instance;
  
        // adding an event listener for when a document is loaded
        // Core.documentViewer.addEventListener("documentLoaded", () => {
        //   console.log("document loaded");
        // });
  
        // adding an event listener for when the page number has changed
        // Core.documentViewer.addEventListener(
        //   "pageNumberUpdated",
        //   (pageNumber) => {
        //     console.log(`Page number is: ${pageNumber}`);
        //   }
        // );
  
        // adds a button to the header that on click sets the page to the next page
        UI.setHeaderItems((header) => {
          header.push({
            type: "actionButton",
            img: "https://icons.getbootstrap.com/assets/icons/caret-right-fill.svg",
            onClick: () => {
              const currentPage = Core.documentViewer.getCurrentPage();
              const totalPages = Core.documentViewer.getPageCount();
              const atLastPage = currentPage === totalPages;
  
              if (atLastPage) {
                Core.documentViewer.setCurrentPage(1);
              } else {
                Core.documentViewer.setCurrentPage(currentPage + 1);
              }
            },
          });
        });
      });
    }
 
  }, [canvasElement, pdfData]);

  return [canvasElement, pdfData]
}

export const useReadLibroPage = (pdfData, pageNumber = 1, scale = 1.5) => {
  const setLoader = useLoaderContext();
  const [numeroPaginas, setNumeroPaginas] = useState(0);
  let canvasElement = useRef(null);

  useEffect(() => {
    if (pdfData && canvasElement) {
      setLoader(true)

      var loadingTask = pdfjsLib.getDocument(pdfData);
      loadingTask.promise
      .then((pdf) => {
        setNumeroPaginas(pdf._pdfInfo.numPages)
        pdf.getPage(pageNumber).then(function(page) {
          var viewport = page.getViewport({scale: scale});
          var canvas = canvasElement.current;
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
    
          var renderContext = { canvasContext: context, viewport: viewport };
          var renderTask = page.render(renderContext);
          renderTask.promise
          .then(function () {
            setLoader(false)
          })
          .catch(err => {
            setLoader(false)
          });
        });
      }, function (reason) {
        setLoader(false)
        console.error(reason);
      })
      .catch(err => {
        console.error(err)
        setLoader(false)
      });
      // import('https://raw.githubusercontent.com/JohannMeza/vicente-rasseto/bb12b7517237eb801cad0da92921e6bb52a202a5/build/upload/1673569996690.pdf')
      // .then((module) => {
      //   console.log(module)
      // })
      // .catch((err) => {
      //   setLoader(false)
      //   console.log(err);
      // });
    }
  }, [pageNumber, pdfData, scale])

  return [canvasElement, pdfData]
}

// Leer libro en base 64 - Canvas
export const useReadLibroBase64 = (pdfData, pageNumber = 1) => {
  const setLoader = useLoaderContext();
  const [numeroPaginas, setNumeroPaginas] = useState(0);
  let canvasElement = useRef(null);
  
  useEffect(() => {
    if (pdfData && canvasElement) {
      setLoader(true)
      pdfjsLib.getDocument({data: pdfData}).promise
      .then(function(pdf) {
        setLoader(false)
        setNumeroPaginas(pdf._pdfInfo.numPages)
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
          setLoader(false)
          let { message } = err;
          AlertUtilRelease({title: "Ohh no...!!!", text: message, icon: "warning"})
        });
      }, function (reason) {
        setLoader(false)
        console.error(reason);
      })
      .catch(err => {
        console.error(err)
        setLoader(false)
      })
    }
  }, [pageNumber, pdfData])

  return [canvasElement, numeroPaginas]
}
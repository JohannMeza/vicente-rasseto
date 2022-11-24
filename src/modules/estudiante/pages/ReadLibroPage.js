import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pathServer } from '../../../config/router/path';
import Controls from '../../../framework/components/Controls';
import { ICON } from '../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import useLoaderContext from '../../../hooks/useLoaderContext';
import { SERVICES_GET } from '../../../services/services.axios';
import { AlertUtilRelease } from '../../../util/AlertUtil';
import { MessageUtil } from '../../../util/MessageUtil';
import './ReadLibroPage.css';
let pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

const ReadLibroPage = () => {
  const setLoader = useLoaderContext();
  const [libro, setLibro] = useState();
  const { id } = useParams();
  const [pdfData, setPdfData] = useState();
  const [loadingTask, setLoadingTask] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  let canvasElement = useRef(null);

  const getLibro = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SHOW + id,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setLoader(false)
        setLibro(resp.data[0])
        setPdfData(atob(resp.data[0]?.FILE?.url))
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      }
    })
  }
  
  useEffect(() => {
    getLibro()
  }, [])

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
          setPageNumber(1)
          AlertUtilRelease({title: "Ohh no...!!!", text: message, icon: "warning"})
        });
      }, function (reason) {
        setLoader(false)
        console.error(reason);
      })
    }
  }, [pageNumber, pdfData])

  return (
    <Box className="readlibropage">
      <Box className="readlibropage__header">
        <Box className="display-flex display-flex-left-center">
          <Controls.ButtonIconComponent
            icon={ICON.SEARCH_PAGE}
            title="Todas las Páginas"
            className="color-white_100"
          />
          <Controls.ButtonIconComponent
            icon={ICON.ARROW_SMALL_TOP}
            title="Ir Página Anterior"
            className="color-white_100"
            onClick={() => setPageNumber(pageNumber - 1)}
          />
          <Controls.ButtonIconComponent
            icon={ICON.ARROW_SMALL_BOTTOM}
            title="Siguiente Página"
            className="color-white_100"
            onClick={() => setPageNumber(pageNumber + 1)}
          />
          
          <Box className="display-flex" style={{ height: "-webkit-fill-available", gap: "10px", alignItems: "center" }}>
            <input type="text" className="readlibropage__header__input" />
            <span>de</span>
            <span>250</span>
          </Box>
        </Box>
        <Box className="display-flex display-flex-center-center">
          <Controls.ButtonIconComponent
            icon={ICON.REMOVE}
            title="Disminuir Zoom"
            className="color-white_100"
          />
          <Controls.ButtonIconComponent
            icon={ICON.ADD}
            title="Aumentar Zoom"
            className="color-white_100"
          />
          <input type="text" className="readlibropage__header__input" />
        </Box>
        <Box className="display-flex display-flex-right-center">
          <Controls.ButtonIconComponent
            icon={ICON.SCANNER}
            title="Todas las Páginas"
            className="color-white_100"
          />
        </Box>
      </Box>

      <Box className="readlibropage__book">
        <canvas ref={canvasElement}></canvas>
      </Box>
    </Box>
  )
}

export default ReadLibroPage;
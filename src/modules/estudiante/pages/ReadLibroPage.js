import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pathServer } from '../../../config/router/path';
import Controls from '../../../framework/components/Controls';
import { ICON } from '../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import useLoaderContext from '../../../hooks/useLoaderContext';
import { useReadLibro } from '../../../hooks/useReadLibro';
import { SERVICES_GET } from '../../../services/services.axios';
import { MessageUtil } from '../../../util/MessageUtil';
import './ReadLibroPage.css';

const ReadLibroPage = () => {
  const setLoader = useLoaderContext();
  const { id } = useParams();
  const [pdfData, setPdfData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [canvas] = useReadLibro(pdfData, pageNumber)

  const getLibro = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SHOW + id,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setLoader(false)
        setPdfData(atob(resp.data[0]?.FILE))
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
        <canvas ref={canvas}></canvas>
      </Box>
    </Box>
  )
}

export default ReadLibroPage;
import { Box } from '@mui/system';
import React, { useEffect, useState, Suspense, lazy, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { pathServer } from '../../config/router/path';
import Controls from '../../framework/components/Controls';
import { ICON } from '../../framework/components/icons/Icon';
import { SaveRequestData } from '../../helpers/helpRequestBackend';
import useLoaderContext from '../../hooks/useLoaderContext';
import { useReadLibroBase64, useReadLibroUrl } from '../../hooks/useReadLibro';
import { SERVICES_GET } from '../../services/services.axios';
import { MessageUtil } from '../../util/MessageUtil';
import './VisorPdfComponent.css';

const listScale = [
  { value: 1.5, label: "Automático" },
  { value: 1.5, label: "Tamaño real" },
  { value: 1.5, label: "Ajuste de la página" },
  { value: 1.5, label: "Anchura de la página" },
  { value: 0.5, label: "50%" },
  { value: 0.75, label: "75%" },
  { value: 1, label: "100%" },
  { value: 1.25, label: "125%" },
  { value: 1.5, label: "150%" },
  { value: 1.75, label: "175%" },
  { value: 2, label: "200%" },
  { value: 3, label: "300%" },
  { value: 4, label: "400%" },
]

let totalPaginas = 0;

const VisorPdfComponent = () => {
  const setLoader = useLoaderContext();
  const {id} = useParams();
  const [pdfData, setPdfData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [canvas] = useReadLibro(pdfData, pageNumber)
  const [fullHeight, setFullHeight] = useState(false)
  const [scale, setScale] = useState(1.5)
  const [requestInicializado, setRequestInicializado] = useState(false);

  const inputPage = useRef()

  const fullHeightStyle = {
    top: fullHeight ? "0px" : "64px",
    zIndex: fullHeight ? 1200 : 100,
  }

  const fullHeightHeaderStyle = {
    borderBottom: "1px solid white"
  }

  const fullHeightCanvasStyle = {
    background: fullHeight ? "var(--black_100)" : "none",
    justifyContent: "center",
    gap: "15px"
  }

  const getLibro = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SHOW + id,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setLoader(false)
        setPdfData(resp.data[0]?.FILE)
        setTotalPages(parseInt(resp.data[0]?.PAGINAS));
        totalPaginas = parseInt(resp.data[0]?.PAGINAS);
        inputPage.current.value = 1
        inputPage && inputPage.current.addEventListener("change", (e) => {
          if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= totalPaginas) {
            validarHojaMaxima(e.target.value, resp.data[0]?.PAGINAS)
          }
        })
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      }
    })
  }

  const handleChangePage = (e) => {
    if ((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= parseInt(totalPages)) === false) {
      inputPage.current.value = e.target.value.substr(0, 3)
    }
  }

  const validarHojaMaxima = (page, total = totalPages) => {
    if (parseInt(page) === parseInt(total)) {
      setPageNumber(total - 1)
      inputPage.current.value = total
      return;
    }
    
    if (parseInt(page) > total) {
      setPageNumber(1)
      inputPage.current.value = 1
      return;
    }

    if (parseInt(page) < 1) {
      setPageNumber(1)
      inputPage.current.value = 1
      return;
    }

    setPageNumber(parseInt(page))
    inputPage.current.value = page
  }
  
  const handleBotonPage = (page) => {
    validarHojaMaxima(page)
  }

  useEffect(() => {
    getLibro()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className="visorPdf" sx={fullHeightStyle}>
      <Box className="visorPdf__header" sx={fullHeightHeaderStyle}>
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
            onClick={() => handleBotonPage(pageNumber - 1)}
          />
          <Controls.ButtonIconComponent
            icon={ICON.ARROW_SMALL_BOTTOM}
            title="Siguiente Página"
            className="color-white_100"
            onClick={() => handleBotonPage(pageNumber + 1)}
          />
          
          <Box className="display-flex" style={{ height: "-webkit-fill-available", gap: "10px", alignItems: "center" }}>
            <input type="number" 
              // onKeyUp={(e) => {// console.log(e.keyCode === 13)}} 
              ref={inputPage}
              onChange={handleChangePage} className="input-number__desactive visorPdf__header__input" style={{ width: "80px" }} />
            <span>de</span>
            <span>{totalPages}</span>
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
          <select className="visorPdf__header__input" onChange={(e) => setScale(parseFloat(e.target.value)) }>
            { listScale.map((el, index) => <option value={el.value} key={index} style={{ textAlign: "left" }}>{el.label}</option> ) }
          </select>
        </Box>
        <Box className="display-flex display-flex-right-center">
          <Controls.ButtonIconComponent
            icon={ICON.SCANNER}
            title="Ancho Completo"
            className="color-white_100"
            onClick={() => setFullHeight(!fullHeight)}
          />
        </Box>
      </Box>

      <Box className="visorPdf__book display-flex" sx={fullHeightCanvasStyle}>
        {/* <canvas ref={canvas}></canvas> */}
        {/* {Array.from(
          new Array(2),
          (el, index) => 
          (
            <Suspense key={index} fallback={<h1>Cargando</h1>}>
              {
                <RenderPDF 
                  pdf={pdfData} 
                  number={(index + 1) % 2 ? pageNumber : pageNumber + index } 
                />
              }
            </Suspense>
          )
        )} */}
        

        <Suspense fallback={<h1>Cargando</h1>}>
          {
            <RenderPDF 
              pdf={pdfData} 
              number={pageNumber} 
              scale={scale} 
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          }
        </Suspense>
      </Box>
    </Box>
  )
}

const RenderPDF = ({ pdf, number, totalPages, setTotalPages, scale }) => {
  const [canvas, numberPaginas] = useReadLibroUrl(pdf, number, scale)
  useEffect(() => { 
    if (!totalPages) setTotalPages(numberPaginas) 
    totalPaginas = numberPaginas
  }, [numberPaginas, totalPages])
  return (
    <div style={{ display: "inline", height: "100%" }}>
      <canvas ref={canvas} style={{ height: "inherit", width: "100%" }}></canvas>
      {/* <p style={{ display: "flex", justifyContent: "center" }}>
        <span style={{ padding: "3px 8px", background: "white", borderRadius: "3px" }} className="color-text">{number}</span>
      </p> */}
    </div>
  )
}

export default VisorPdfComponent;
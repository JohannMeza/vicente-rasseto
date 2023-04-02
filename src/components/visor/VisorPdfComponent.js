import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pathServer } from '../../config/router/path';
import { SaveRequestData } from '../../helpers/helpRequestBackend';
import useLoaderContext from '../../hooks/useLoaderContext';
import { useReadLibroUrl } from '../../hooks/useReadLibro';
import { SERVICES_GET } from '../../services/services.axios';
import { MessageUtil } from '../../util/MessageUtil';
import './VisorPdfComponent.css';

const VisorPdfComponent = () => {
  const setLoader = useLoaderContext();
  const [pathFile, setPathFile] = useState();
  const [canvas] = useReadLibroUrl(pathFile)
  const {id} = useParams();

  const getLibro = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SHOW + id,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setLoader(false)
        setPathFile(resp.data[0].FILE);
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      }
    })
  }

  
  useEffect(() => {
    getLibro()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="webviewer" ref={canvas}></div>
  )
}

export default VisorPdfComponent;
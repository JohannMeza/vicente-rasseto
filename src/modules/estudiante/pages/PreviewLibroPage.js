import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import img from '../../../assets/image/integracion_soluciones.jpg'
import LabelComponent from '../../../components/card/LabelComponent';
import { pathServer } from '../../../config/router/path';
import { pathFront } from '../../../config/router/pathFront';
import Controls from '../../../framework/components/Controls';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import useLoaderContext from '../../../hooks/useLoaderContext';
import { SERVICES_GET } from '../../../services/services.axios';
import { MessageUtil } from '../../../util/MessageUtil';

const PreviewLibroPage = () => {
  const setLoader = useLoaderContext();
  const [libro, setLibro] = useState()
  const { id } = useParams();
  const navigate = useNavigate(); 

  const getLibro = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SHOW + id,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        console.log(resp)
        setLibro(resp.data[0])
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }
  
  useEffect(() => {
    getLibro()
  }, [])
  
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <img src={`data:image;base64,${libro?.IMAGEN?.url}`} style={{ width: "100%", maxHeight: "750px" }} alt="" />
        </Grid>
        <Grid item xs={6}>
          <Controls.Title title={libro?.TITULO} sx={{ color: "var(--blue_700)" }} />
          <Controls.TextComponent variant="text2" component="div">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa atque adipisci officiis esse, labore perspiciatis itaque modi? Blanditiis, nobis. Recusandae perferendis iste est, soluta fugiat praesentium illo neque quibusdam incidunt.
          </Controls.TextComponent>
          <ul className="color-black_100" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {
              libro?.ID_AUTOR.map((libro, index) => (
                <li key={index}>Autor: {libro.NOMBRE_AUTOR}</li>
              ))
            }
          </ul>
          
          <Controls.ButtonComponent 
            variant="large" 
            type="blue" 
            title="¡¡¡VAMOS!!!" 
            onClick={() => navigate(pathFront.BIBLIOTECA_SHOW_LIBRO + id)}
          />

          <Controls.TextComponent variant="h3" component="div" sx={{ color: "var(--blue_700)" }}>
            Categorias
          </Controls.TextComponent>

          <Box className="display-flex" sx={{ gap: "15px" }}>
            {
              libro?.ID_CATEGORIA.map((categoria, index) => (
                <LabelComponent key={index} label={categoria.CATEGORIA} />
              ))
            }
          </Box>

          <Controls.TextComponent variant="h3" component="div" sx={{ color: "var(--green_500)" }}>
            Etiquetas
          </Controls.TextComponent>

          <Box className="display-flex" sx={{ gap: "15px" }}>
            {
              libro?.ID_ETIQUETA.map((categoria, index) => (
                <LabelComponent key={index} label={categoria.ETIQUETA} color="verde" />
              ))
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PreviewLibroPage;
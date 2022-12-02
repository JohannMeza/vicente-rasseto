import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardHorizontal from '../../../components/card/CardHorizontal';
import audiolibroImage from '../../../assets/image/audiolibro-card.png'
import bibliotecaImage from '../../../assets/image/biblioteca-card.png'
import Controls from '../../../framework/components/Controls';
import "./BibliotecaPage.css"
import { useNavigate } from 'react-router-dom';
import { pathFront } from '../../../config/router/pathFront';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import { pathServer } from '../../../config/router/path';
import { SERVICES_GET } from '../../../services/services.axios';
import { MessageUtil } from '../../../util/MessageUtil';
import useLoaderContext from '../../../hooks/useLoaderContext';
import LabelComponent from '../../../components/card/LabelComponent';

const BibliotecaPage = () => {
  const navigate = useNavigate()
  const setLoader = useLoaderContext();
  const [librosSugerencias, setLibrosSugerencias] = useState([])

  const getLibros = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.INDEX,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setLibrosSugerencias(resp.data || [])
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }
  
  useEffect(() => {
    getLibros()
  }, [])

  return (
    <Box>
      <Box className="display-flex" sx={{ gap: "15px" }}>
        <LabelComponent label="Aventura" />
      </Box>

      <br />

      <Controls.TextComponent variant="h1" component="span" className="background-primary color-white_100 title__estudiante">Tenemos algunas sugerencias</Controls.TextComponent>
      
      <Grid container spacing={8} marginTop={1}>
        {
          librosSugerencias.map((libro, index) => (
            <Grid item xs={6} key={index}>
              <CardHorizontal 
                classNameColor="background-primary"
                img={`data:image;base64,${libro?.IMAGEN?.url}`}
              >
                <Controls.Title title={libro.TITULO} sx={{ color: "var(--white_100)" }} />
                <Controls.TextComponent variant="text1" component="p" sx={{ color: "var(--white_100)" }}> 
                  A aqui econtrarás contenidos de libros leídos en voz alta.
                </Controls.TextComponent>
                <br />
                <Controls.ButtonComponent 
                  variant="large" 
                  title="¡¡¡VAMOS!!!" 
                  onClick={() => navigate(pathFront.BIBLIOTECA_LIBRO + libro._id)}
                />
              </CardHorizontal>
            </Grid>
          ))
        }
      </Grid>

      <br />

      <Controls.TextComponent variant="h1" component="span" className="background-third color-white_100 title__estudiante">Tenemos algunas sugerencias</Controls.TextComponent>

      <Grid container spacing={8} marginTop={1}>
        <Grid item xs={6}>
          <CardHorizontal 
            classNameColor="background-primary"
            img={audiolibroImage}
          >
            <Controls.Title title="Audio Libros" sx={{ color: "var(--white_100)" }} />
            <Controls.TextComponent variant="text1" component="p" sx={{ color: "var(--white_100)" }}> 
              A aqui econtrarás contenidos de libros leídos en voz alta.
            </Controls.TextComponent>
            <br />
            <Controls.ButtonComponent 
              variant="large" 
              title="¡¡¡VAMOS!!!" 
            />
          </CardHorizontal>
        </Grid>
        <Grid item xs={6}>
          <CardHorizontal 
            classNameColor="background-third"
            img={bibliotecaImage}
          >
            <Controls.Title title="Biblioteca" sx={{ color: "var(--white_100)" }} />
            <Controls.TextComponent variant="text1" component="p" sx={{ color: "var(--white_100)" }}> 
              A aqui econtrarás contenidos de libros leídos en voz alta.
            </Controls.TextComponent>
            <br />
            <Controls.ButtonComponent 
              variant="large" 
              title="¡¡¡VAMOS!!!" 
            />
          </CardHorizontal>
        </Grid>
        <Grid item xs={6}>
          <CardHorizontal 
            classNameColor="background-third"
            img={bibliotecaImage}
          >
            <Controls.Title title="Biblioteca" sx={{ color: "var(--white_100)" }} />
            <Controls.TextComponent variant="text1" component="p" sx={{ color: "var(--white_100)" }}> 
              A aqui econtrarás contenidos de libros leídos en voz alta.
            </Controls.TextComponent>
            <br />
            <Controls.ButtonComponent 
              variant="large" 
              title="¡¡¡VAMOS!!!" 
            />
          </CardHorizontal>
        </Grid>
        <Grid item xs={6}>
          <CardHorizontal 
            classNameColor="background-primary"
            img={audiolibroImage}
          >
            <Controls.Title title="Audio Libros" sx={{ color: "var(--white_100)" }} />
            <Controls.TextComponent variant="text1" component="p" sx={{ color: "var(--white_100)" }}> 
              A aqui econtrarás contenidos de libros leídos en voz alta.
            </Controls.TextComponent>
            <br />
            <Controls.ButtonComponent 
              variant="large" 
              title="¡¡¡VAMOS!!!" 
            />
          </CardHorizontal>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BibliotecaPage
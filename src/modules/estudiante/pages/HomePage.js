import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CardHorizontal from '../../../components/card/CardHorizontal';
import Controls from '../../../framework/components/Controls';
import audiolibroImage from '../../../assets/image/audiolibro-card.png'
import bibliotecaImage from '../../../assets/image/biblioteca-card.png'
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';
import { pathFront } from '../../../config/router/pathFront';

const HomePage = () => {
  const navigate = useNavigate()

  const redirectBiblioteca = () => {
    navigate(pathFront.BIBLIOTECA_ADMIN);
  }

  const redirectAudiolibro = () => {
    navigate(pathFront.AUDIOLIBRO_ADMIN)
  }

  return (
    <Box className="display-flex display-flex-center-center" sx={{ flexDirection: "column" }}>
      <Controls.Title title="¿Que deseas hacer?" sx={{ marginTop: 3 }} />

      <Grid container spacing={8} marginTop={1}>
        <Grid item xs={12} sm={12} md={6}>
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
              onClick={redirectAudiolibro}
            />
          </CardHorizontal>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
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
              onClick={redirectBiblioteca}
            />
          </CardHorizontal>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage;
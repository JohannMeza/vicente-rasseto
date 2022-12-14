import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardVertical from '../../../components/card/CardVertical';
import LabelComponent from '../../../components/card/LabelComponent';
import { pathServer } from '../../../config/router/path';
import { pathFront } from '../../../config/router/pathFront';
import Controls from '../../../framework/components/Controls';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import useLoaderContext from '../../../hooks/useLoaderContext';
import { SERVICES_GET, SERVICES_POST } from '../../../services/services.axios';
import { MessageUtil } from '../../../util/MessageUtil';

const PreviewLibroPage = () => {
  const setLoader = useLoaderContext();
  const [libro, setLibro] = useState()
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [librosRelacionados, setLibrosRelacionados] = useState([])

  const getLibro = () => {
    setLoader(true)

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.PREVIEW_LIBRO + id,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        let arrCategoria = Array.from(resp.data[0].ID_CATEGORIA, el => el._id);

        setLibro(resp.data[0])
        getLibrosRelacionados(arrCategoria, resp.data[0]._id)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const getLibrosRelacionados = (arrCategoria, id) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SHOW_RELACIONADO,
      body: { categories: arrCategoria, id },
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setLibrosRelacionados(resp.data)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Box>
      <Grid container spacing={4} sx={{ flexWrap: "wrap-reverse" }}>
        <Grid item xs={12} sm={12} md={6}>
          <img src={`data:image;base64,${libro?.IMAGEN?.url}`} style={{ width: "100%", maxHeight: "750px" }} alt="" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.Title title={libro?.TITULO} sx={{ color: "var(--blue_700)" }} />
          <Controls.TextComponent variant="text2" component="div">{libro?.DESCRIPCION_LARGA}</Controls.TextComponent>
          
          <ul className="color-black_100" style={{ mt: 2, padding: 0, listStyle: "none" }}>
            <li>
            <b>Autor(es): </b>
            {
              libro?.ID_AUTOR.map((el, index) => (
                <React.Fragment key={index}>{el.NOMBRE_AUTOR}  {libro.ID_AUTOR?.length === index + 1 ? "" : " - " } </React.Fragment>
              ))
            }
            </li>
          </ul>
          
          <br />

          <Controls.ButtonComponent 
            variant="large" 
            type="blue" 
            title="¡¡¡VAMOS!!!" 
            onClick={() => navigate(pathFront.BIBLIOTECA_SHOW_LIBRO + id)}
          />

          <br />
          <br />

          <Controls.TextComponent variant="h3" component="div" sx={{ color: "var(--blue_700)" }}>
            Categorias
          </Controls.TextComponent>

          <Box className="display-flex" sx={{ gap: "15px", mt: 2 }}>
            {
              libro?.ID_CATEGORIA.map((categoria, index) => (
                <LabelComponent key={index} label={categoria.CATEGORIA} />
              ))
            }
          </Box>

          <br />

          <Controls.TextComponent variant="h3" component="div" sx={{ color: "var(--green_500)" }}>
            Etiquetas
          </Controls.TextComponent>

          <Box className="display-flex" sx={{ gap: "15px", mt: 2 }}>
            {
              libro?.ID_ETIQUETA.map((categoria, index) => (
                <LabelComponent key={index} label={categoria.ETIQUETA} color="verde" />
              ))
            }
          </Box>
        </Grid>
      </Grid>
      
      <Controls.TextComponent
          variant="h1"
          component="span"
          className="background-primary color-white_100 title__estudiante"
          sx={{ marginBottom: "10px", mt: 4, display: "inline-block" }}
        >
          Búsqueda relacionada
      </Controls.TextComponent>
      <Grid container spacing={2} marginTop={1}>
          {librosRelacionados.map((libro, index) => (
            <Grid item xs={12} sm={12} md={4} key={index}>
              <CardVertical
                sx={{ background: libro.BACKGROUND }}
                img={`data:image;base64,${libro?.IMAGEN?.url}`}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Controls.TextComponent
                      variant="h2"
                      component="div"
                      children={libro.TITULO}
                      sx={{ color: "var(--white_100)" }}
                    />
                    <Controls.TextComponent
                      variant="text2"
                      component="p"
                      sx={{ color: "var(--white_100)", textAlign: "justify" }}
                    >
                      {libro.DESCRIPCION_CORTA}
                    </Controls.TextComponent>

                    <Box sx={{ marginTop: "3px" }}>
                      {libro.NOMBRE_FILE?.split(".")?.length > 0 && (
                        <Controls.TextComponent
                          variant="text2"
                          component="p"
                          sx={{
                            color: "var(--white_100)",
                            textAlign: "justify",
                          }}
                        >
                          <b>Formato: </b>
                          {libro.NOMBRE_FILE.split(".").pop()}
                        </Controls.TextComponent>
                      )}

                      {libro.PAGINAS && (
                        <Controls.TextComponent
                          variant="text2"
                          component="p"
                          sx={{
                            color: "var(--white_100)",
                            textAlign: "justify",
                          }}
                        >
                          <b>Páginas: </b>
                          {libro.PAGINAS} pag.
                        </Controls.TextComponent>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Controls.ButtonComponent
                      variant="secondary-small"
                      type="admin"
                      style={{ color: "inherit", width: "100%" }}
                      title="¡¡¡VAMOS!!!"
                      onClick={() =>
                        navigate(pathFront.BIBLIOTECA_LIBRO + libro._id)
                      }
                    />
                    {libro.LINK && (
                      <Box sx={{ textAlign: "center" }}>
                        <a
                          href={libro.LINK}
                          style={{
                            color: "var(--white_100)",
                            marginTop: "5px",
                            textDecoration: "underline",
                          }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ir a enlace del libro
                        </a>
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardVertical>
            </Grid>
          ))}
        </Grid>
    </Box>
  )
}

export default PreviewLibroPage;
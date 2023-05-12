import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CardHorizontal from "../../../components/card/CardHorizontal";
import Controls from "../../../framework/components/Controls";
import "./BibliotecaPage.css";
import { useNavigate } from "react-router-dom";
import { pathFront } from "../../../config/router/pathFront";
import { SaveRequestData } from "../../../helpers/helpRequestBackend";
import { pathServer } from "../../../config/router/path";
import { SERVICES_POST } from "../../../services/services.axios";
import { MessageUtil } from "../../../util/MessageUtil";
import useLoaderContext from "../../../hooks/useLoaderContext";
import { ICON } from "../../../framework/components/icons/Icon";
import { useForm } from "../../../hooks/useForm";
import useAuthContext from "../../../hooks/useAuthContext";

const dataOrden = [
  { value: 1, label: "Nombre" },
  { value: 2, label: "Fecha" },
  { value: 3, label: "Ascendente" },
  { value: 4, label: "Descendente" },
];

const dataInitial = {
  SEARCH: "",
};

const dataInitialSelect = {
  CATEGORIAS: [],
  ETIQUETAS: [],
  AUTORES: [],
  ORDEN: []
}

const BibliotecaPage = () => {
  const InputSearchStyled = {
    width: "100%",
    display: "block",
    borderRadius: "50px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "15px 40px 15px 20px",
  };
  const navigate = useNavigate();
  const setLoader = useLoaderContext();
  const [librosMain, setLibrosMain] = useState([]);
  const [librosView, setLibrosView] = useState([]);
  const [librosFilter, setLibrosFilter] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [autores, setAutores] = useState([]);
  const [orden, ] = useState(dataOrden);
  const [dataSelect, setDataSelect] = useState(dataInitialSelect)
  const [search, handleInputChange] = useForm(dataInitial);
  const { user } = useAuthContext()

  const getLibros = () => {
    setLoader(true);

    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.INDEX,
      body: { id: user.userAccess._id },
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let { libros, etiquetas, categorias, autores } = resp.data;
        setLibrosMain(libros || []);
        setLibrosFilter(libros || []);
        setLibrosView(libros || []);
        setCategorias(categorias || []);
        setEtiquetas(etiquetas || []);
        setAutores(autores || []);

        setLoader(false);
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  };

  const handleChange = (e) => {
    const regExp = RegExp(e.target.value, "ig");
    const arrDataFilter = librosFilter.filter((el) => el?.TITULO?.match(regExp));
    handleInputChange(e);
    setLibrosView(arrDataFilter);
  };

  useEffect(() => {
    getLibros();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { CATEGORIAS, AUTORES, ETIQUETAS,  } = dataSelect
    let arrLibros = librosMain || [];

    CATEGORIAS?.length > 0 &&
    (arrLibros = librosView.filter(libro => {
      return libro.ID_CATEGORIA?.find(categoria => {
        return CATEGORIAS?.includes(categoria)
      })
    }));
    
    AUTORES.length > 0 &&
    (arrLibros = arrLibros.filter(libro => {
      return libro.ID_AUTOR?.find(autor => {
        return AUTORES?.includes(autor)
      })
    }))

    ETIQUETAS.length > 0 &&
    (
      arrLibros = arrLibros.filter(libro => {
        return libro.ID_ETIQUETA?.find(etiqueta => {
          return ETIQUETAS?.includes(etiqueta)
      })
      }))
    
    setLibrosView(arrLibros)
    setLibrosFilter(arrLibros)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelect]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={3}>
        <Stack direction="column" spacing={2}>
          <AccordionFilterComponent label="Categorias" >
            <ItemComponent dataSelect={dataSelect} setDataSelect={setDataSelect} name="CATEGORIAS" data={categorias} title="Categorias" />
          </AccordionFilterComponent>

          <AccordionFilterComponent label="Etiquetas" >
            <ItemComponent dataSelect={dataSelect} setDataSelect={setDataSelect} name="ETIQUETAS" data={etiquetas} title="Etiquetas" />
          </AccordionFilterComponent>

          <AccordionFilterComponent label="Autores" >
            <ItemComponent dataSelect={dataSelect} setDataSelect={setDataSelect} name="AUTORES" data={autores} title="Autores" />
          </AccordionFilterComponent>

          <AccordionFilterComponent label="Orden" >
            <ItemComponent dataSelect={dataSelect} setDataSelect={setDataSelect} name="ORDEN" data={orden} title="Ordenar" />
          </AccordionFilterComponent>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={9}>
        {/* <Box className="display-flex" sx={{ gap: "15px" }}>
          <LabelComponent label="Aventura" />
        </Box> */}

        {/* <br /> */}

        <Controls.TextComponent
          variant="h1"
          component="span"
          className="background-primary color-white_100 title__estudiante"
          sx={{ marginBottom: "15px", display: "inline-block" }}
        >
          Búsqueda relacionada
        </Controls.TextComponent>

        <br />

        <Box sx={{ position: "relative", margin: "5px 0 5px" }}>
          <input
            type="text"
            placeholder="Buscar..."
            autoComplete="off"
            style={InputSearchStyled}
            name="SEARCH"
            onChange={handleChange}
            value={search.SEARCH}
          />
          <span
            style={{
              position: "absolute",
              right: "15px",
              top: "0",
              bottom: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            {ICON.SEARCH}
          </span>
        </Box>

        <Grid container spacing={2} marginTop={1}>
          {librosView.map((libro, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <CardHorizontal
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

                  <Box>
                    <Controls.ButtonComponent
                      variant="secondary-small"
                      type="admin"
                      style={{ color: "inherit", width: "100%", margin: "5px 0"}}
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
              </CardHorizontal>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const ItemComponent = ({ dataSelect, setDataSelect, data, name }) => {
  const InputSearchStyled = {
    width: "100%",
    display: "block",
    borderRadius: "50px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "7px 28px 7px 10px",
  };
  const [form, handleInputChange] = useForm({ SEARCH: "" });
  const [filter, setFilter] = useState(data);
  const inputSearch = useRef();

  const handleChangeCheck = (e, value) => {
    let { checked, name } = e.target;

    if (checked) {
      setDataSelect({
        ...dataSelect,
        [name]: [...dataSelect[name], value]
      })
    } else {
      let arrData = dataSelect[name]?.filter(el => el !== value);
      setDataSelect({
        ...dataSelect,
        [name]: arrData
      })
    }
  }

  const handleChange = (e) => {
    const regExp = RegExp(e.target.value, "ig");
    const arrDataFilter = data.filter((el) => el?.label?.match(regExp));

    handleInputChange(e);
    setFilter(arrDataFilter);
  };

  const InputSearchComponent = () => {
    return (
      <Box sx={{ position: "relative", margin: "5px 0 5px" }}>
        <input
          type="text"
          ref={inputSearch}
          placeholder="Buscar..."
          style={InputSearchStyled}
          name="SEARCH"
          onChange={handleChange}
          value={form.SEARCH}
        />
        <span
          style={{
            position: "absolute",
            right: "5px",
            top: "0",
            bottom: "0",
            display: "flex",
            alignItems: "center",
          }}
        >
          {ICON.SEARCH}
        </span>
      </Box>
    );
  };

  useEffect(() => {
    inputSearch.current.focus();
  }, [form.SEARCH]);

  useEffect(() => {
    setFilter(data);
  }, [data]);

  return (
    <Box sx={{ position: "relative", zIndex: "1000" }}>
      <InputSearchComponent />

      <Box sx={{ marginTop: "8px" }}>
        {filter.length > 0 ? (
          filter.map((el, index) => (
            <Controls.CheckComponent
              key={index}
              name={name}
              onChange={(e) => handleChangeCheck(e, el.value)}
              value={dataSelect[name]?.includes(el.value)}
              label={el.label}
              sx={{ display: "block" }}
            />
          ))
        ) : (
          <Controls.TextComponent
            variant="body3"
            component="div"
            children="Sin resultados..."
            sx={{ textAlign: "center" }}
          />
        )}
      </Box>
    </Box>
  );
};

const AccordionFilterComponent = ({ label, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false);

  return (
    <Accordion
      expanded={expanded === label}
      onChange={handleChange(label)}
    >
      <AccordionSummary aria-controls={`${label}-content`} id={`${label}-header`}>
        <Typography>{ label }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </Accordion>
  )
}

export default BibliotecaPage;

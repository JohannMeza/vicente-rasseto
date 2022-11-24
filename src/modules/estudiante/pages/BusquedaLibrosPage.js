import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Controls from "../../../framework/components/Controls";
import imagelibro from "../../../assets/image/audiolibro-card.png";
import LabelComponent from "../../../components/card/LabelComponent";
import useLoaderContext from "../../../hooks/useLoaderContext";
import { SaveRequestData } from "../../../helpers/helpRequestBackend";
import { pathServer } from "../../../config/router/path";
import { SERVICES_POST } from "../../../services/services.axios";
import { MessageUtil } from "../../../util/MessageUtil";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import { pathFront } from "../../../config/router/pathFront";

const dataInitial = {
  TITULO: "",
  TIPO_MULTIMEDIA: "Libro",
};

const BusquedaLibrosPage = () => {
  const styleInput = {
    height: "45px",
    textAlign: "left",
    padding: "0 15px",
  };

  const setLoader = useLoaderContext();
  const { data, handleInputFormChange } = useFormValidation(dataInitial);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);

  const buscarLibros = () => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ESTUDIANTE.BIBLIOTECA.SEARCH,
      body: data,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setLoader(false);
        console.log(resp);
        setLibrosFiltrados(resp.data);
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  return (
    <Box>
      <Box>
        <Controls.Title title="Buscar Libros" />
        <br />
        <Box
          className="display-flex display-flex-center-center"
          style={{ gap: "10px" }}
        >
          <input
            type="text"
            id="user"
            className="inputStyle"
            autoComplete="off"
            name="TITULO"
            style={styleInput}
            onKeyPress={(e) => (e.key === "Enter" ? buscarLibros() : null)}
            onChange={handleInputFormChange}
          />
          <Controls.ButtonComponent
            title="Buscar"
            variant="medium"
            type="green"
            style={{ marginTop: "5px" }}
            onClick={buscarLibros}
          />
        </Box>
      </Box>

      <br />

      <Box>
        <Controls.Title title={`Buscar: ${data.TITULO}`} />
        <br />
        {librosFiltrados.map((el, index) => (
          <CardLibroFiltrado
            img={`data:image;base64,${el?.IMAGEN.url}`}
            data={el}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

const CardLibroFiltrado = ({ img, data }) => {
  const styleCategorias = {
    background: "var(--white_100)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    cursor: "pointer",
    alignItems: "stretch",
    padding: "10px 15px",
    gap: "25px",
  };

  const { TITULO, _id } = data;
  const navigate = useNavigate()

  return (
    <Grid container spacing={3} sx={{ marginBottom: "30px" }} onClick={() => navigate(pathFront.BIBLIOTECA_LIBRO + _id)}>
      <Grid item xs={12}>
        <Box style={styleCategorias} className="display-flex">
          <Box>
            <img src={img} alt="" style={{ height: "250px" }} />
          </Box>

          <Box
            className="display-flex"
            sx={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Box
              className="display-flex"
              sx={{ flexDirection: "column", gap: "10px" }}
            >
              <Controls.TextComponent variant="h2" component="span">
                {TITULO}
              </Controls.TextComponent>
              <Controls.TextComponent variant="text2" component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                labore omnis veritatis ea nisi quidem dignissimos quo porro sed.
                Repellat sapiente nobis distinctio fugit id provident ab
                pariatur delectus repudiandae!
              </Controls.TextComponent>
              <Box className="display-flex" sx={{ gap: "15px" }}>
                <LabelComponent label="Aventura" />
                <LabelComponent label="Aventura" />
                <LabelComponent label="Aventura" />
                <LabelComponent label="Aventura" />
              </Box>
            </Box>
            <Controls.TextComponent variant="span2" component="p">
              Publicado 08 de enero 2022
            </Controls.TextComponent>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BusquedaLibrosPage;

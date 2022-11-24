import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { pathServer } from '../../../config/router/path';
import Controls from '../../../framework/components/Controls';
import { SaveRequestData } from '../../../helpers/helpRequestBackend';
import { useFormValidation } from '../../../hooks/useFormValidation';
import useLoaderContext from '../../../hooks/useLoaderContext';
import { SERVICES_POST } from '../../../services/services.axios';
import { MessageUtil } from '../../../util/MessageUtil';

const datatInitial = {
  CATEGORIA: ""
}

const BusquedaCategoriasPage = () => {
  const styleInput = {
    height: "45px",
    textAlign: "left",
    padding: "0 15px"
  }

  const styleCategorias = {
    background: "var(--white_100)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    height: "82px",
    cursor: "pointer"
  }

  const { data, setData, handleInputFormChange } = useFormValidation(datatInitial)
  const [categorias, setCategorias] = useState([])
  const setLoader = useLoaderContext();
  
  const buscarCategorias = () => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ESTUDIANTE.CATEGORIA.SEARCH,
      body: data,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setLoader(false)
        setCategorias(resp.data)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      }
    })
  }

  useEffect(() => {
    buscarCategorias()
  }, [])

  return (
    <Box>
      <Box>
        <Controls.Title title="Categorias" />
        <br />
        <Box className="display-flex display-flex-center-center" style={{ gap: "10px" }}>
          <input 
            type="text" 
            id="user" 
            className="inputStyle" 
            autoComplete='off'
            name="CATEGORIA"
            value={data.CATEGORIA}
            style={styleInput}
            onChange={handleInputFormChange}
          />
          <Controls.ButtonComponent
            title="Buscar"
            variant="medium"
            type="green"
            style={{ marginTop: "5px" }}
            onClick={buscarCategorias}
          />
        </Box>
      </Box>

      <br />

      <Box>
        <Controls.Title title="Buscar: Aventura" />
        <br />
        <Grid container spacing={5}>
          {categorias.map(categoria => (
            <Grid item xs={6} md={3}>
              <Box style={styleCategorias} className="display-flex display-flex-center-center"><Controls.TextComponent variant="h2" component="span">{categoria.CATEGORIA}</Controls.TextComponent></Box>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  )
}

export default BusquedaCategoriasPage;
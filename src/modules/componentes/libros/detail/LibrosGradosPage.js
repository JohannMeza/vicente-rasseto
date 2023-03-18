import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pathServer } from "../../../../config/router/path";
import { pathFront } from "../../../../config/router/pathFront";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { SERVICES_POST } from "../../../../services/services.axios";
import { MessageUtil } from "../../../../util/MessageUtil";

const columns = [
  { align: "left", value: "Nivel de Estudio", width: 180 },
  { align: "left", value: "Estado", width: 180 },
];

export default function LibrosGradosPage() {
  const [listNivelEstudio, setListNivelEstudio] = useState([]);
  const setLoader = useLoaderContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [stateGrados, handleInputChange, resetState, setStateGrados] = useForm({});

  const saveGrados = (data) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.UPDATE_GRADOS + id,
      body: data,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
        getGrados()
        setLoader(false);
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  };

  const getGrados = () => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.LIST_GRADOS_SAVE + id,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let objGrados = {};
        resp.data[0].ID_GRADO.forEach(el => objGrados = { ...objGrados, [el]: true })
        setStateGrados(objGrados)
        setLoader(false);
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  }

  const saveEstadosGrados = () => {
    const saveStates = [
      ...Object.entries(stateGrados)
        .filter((el) => el[1])
        .map((el) => el[0]),
    ];
    saveGrados(saveStates);
  };

  const listAllNivelEstudio = (rowsPerPage = 10, page = 1) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.LIST_ALL_GRADOS,
      pagination: true,
      rowsPerPage,
      page,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let arrNivelesEstudio = resp.data.map((el) => { return { ...el, id: el._id } });
        setListNivelEstudio(arrNivelesEstudio);
        setLoader(false);
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  };

  useEffect(() => {
    listAllNivelEstudio();
    getGrados()
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Controls.TextComponent variant="h1" component="div">
          Configuración de Grados
        </Controls.TextComponent>
      </Box>

      <br />

      <div>
        <Controls.TableComponents
          style={{ maxHeight: 400, width: "100%", overflow: "auto" }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell width={20}></TableCell>
                {columns.map((el, index) => (
                  <TableCell width={el.width} key={index} align={el.align}>
                    {el.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listNivelEstudio.length > 0 &&
                listNivelEstudio.map((el, index) => (
                  <RowComponent
                    row={el}
                    key={index}
                    stateGrados={stateGrados}
                    setStateGrados={setStateGrados}
                    handleInputChange={handleInputChange}
                  />
                ))}
            </TableBody>
          </Table>
        </Controls.TableComponents>
      </div>
      <br />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={() => navigate(pathFront.LIBROS_ADMIN)}
        />

        <Controls.ButtonComponent
          title={"Guardar"}
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={() => saveEstadosGrados()}
        />
      </Stack>
    </Box>
  );
}

const RowComponent = ({ row, stateGrados, setStateGrados, handleInputChange }) => {
  const [open, setOpen] = useState(false);
  const [checkPadre, setCheckPadre] = useState(false)

  const validateCheckActive = () => {
    const arrStatesActive = Object.entries(stateGrados || {}).filter(el => el[1])
    return row.GRADOS.find(el => Array.from(arrStatesActive, el => el[0]).includes(el._id))
  }

  const handleClickCheckPadre = (e) => {
    if (e.target.checked) {
      let objGrados = {}
      row.GRADOS.forEach(el => objGrados = { ...objGrados, [el._id]: true })
      setStateGrados((stateGrados) => { return { ...stateGrados, ...objGrados } })
    } else {
      let objGrados = stateGrados;
      row.GRADOS.forEach(el => delete objGrados[el._id])
      setStateGrados((stateGrados) => { return { ...stateGrados, ...objGrados } })
    }
  }

  useEffect(() => {
    setCheckPadre(Object.entries(validateCheckActive() || {}).length > 0 ? true : false)
  }, [stateGrados])
  
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? ICON.ARROW_SMALL_TOP : ICON.ARROW_SMALL_BOTTOM }
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.NIVEL_ESTUDIO}</TableCell>
        <TableCell align="left">{row.ESTADO ? "Activo" : "Inactivo"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingLeft: 10 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell width={20}>
                      <Controls.CheckComponent
                        value={checkPadre}
                        onChange={handleClickCheckPadre}
                      />
                    </TableCell>
                    <TableCell width={180}>Grado</TableCell>
                    <TableCell width={180}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.GRADOS.map((grado, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Controls.CheckComponent
                          value={stateGrados[grado._id] || false}
                          name={grado._id}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                      <TableCell>{grado.GRADO}</TableCell>
                      <TableCell>
                        {grado.ESTADO ? "Activo" : "Inactivo"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

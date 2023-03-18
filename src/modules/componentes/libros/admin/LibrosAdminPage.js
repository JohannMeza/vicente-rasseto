import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonsSearchComponent from "../../../../components/utilComponents/ButtonsSearchComponent";
import { pathServer } from "../../../../config/router/path";
import { pathFront } from "../../../../config/router/pathFront";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { SERVICES_DELETE, SERVICES_GET, SERVICES_POST } from "../../../../services/services.axios";
import { AlertUtilDelete } from "../../../../util/AlertUtil";
import { MessageUtil } from "../../../../util/MessageUtil";

const estadoLibro = [
  { label: 'Publicar', value: "Publicado" },
  { label: 'No Publicar', value: "No Publicado" }
]

const dataInitialFilter = {
  TITULO: "",
  ID_CATEGORIA: "",
  ID_ETIQUETA: "",
  ID_AUTOR: "",
  TIPO: "Libro",
}

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0,
};

export default function LibrosAdminPage() {
  const navigate = useNavigate();
  const [data, handleDataFormChange, resetData] = useForm(dataInitialFilter);
  const setLoader = useLoaderContext();
  const [libros, setLibros] = useState([]);
  const [listCategorias, setListCategorias] = useState([]);
  const [listEtiquetas, setListEtiquetas] = useState([]);
  const [listAutores, setListAutores] = useState([]);
  const [pagination, setPagination] = useState(paginate);
  const [estadoActual, setEstadoActual] = useState("");

  const getDataLibros = (rowsPerPage = 10, page = 1) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.INDEX,
      body: {...data, ESTADO: estadoActual},
      pagination: true,
      rowsPerPage,
      page,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setLoader(false);
        setLibros(resp.data.docs)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  };

  const getDataInitial = () => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.DATA_INITIAL,
      body: data,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let { categoria, etiqueta, autores } = resp.data
        setListCategorias(categoria)
        setListEtiquetas(etiqueta)
        setListAutores(autores)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const delLibro = (id) => {
    const config = {
      title: "¿Estás seguro?",
      text: "¡Al eliminar este libro, no habrá vuelta atrás!",
      icon: "warning",
    };

    const fnDeleteLibro = () => {
      setLoader(true)
      SaveRequestData({
        path: pathServer.ADMINISTRACION.MULTIMEDIA.DELETE + id,
        body: data,
        fnRequest: SERVICES_DELETE,
        success: (resp) => {
          getDataLibros()
          MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
          setLoader(false)
        },
        error: (err) => {
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
          setLoader(false)
        }
      })
    };

    AlertUtilDelete(fnDeleteLibro, { config });
  }

  const handleClickEstado = (value) =>{
    setEstadoActual(value)
    getDataLibros()
  }

  useEffect(() => {
    getDataInitial()
  }, []);

  useEffect(() => {
    getDataLibros();
  }, [estadoActual]);

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Libros" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nuevo Libro"
          onClick={() => navigate(pathFront.LIBROS_NEW)}
        />
      </Stack>
      <Stack direction="row" spacing={1} marginTop={1}>
        <Controls.TextComponent
          variant="span3"
          className={estadoActual === "" ? "color-blue_700" : "" }
          onClick={() => handleClickEstado("")}
        >
          Todos
        </Controls.TextComponent>
        <span>|</span>
        <Controls.TextComponent 
          variant="span3"
          className={estadoActual === "Publicado" ? "color-blue_700" : "" }
          onClick={() => handleClickEstado("Publicado")}
        >
          Publicadas
        </Controls.TextComponent>
        <span>|</span>
        <Controls.TextComponent 
          variant="span3"
          className={estadoActual === "No Publicado" ? "color-blue_700" : "" }
          onClick={() => handleClickEstado("No Publicado")}
        >
          No publicadas
        </Controls.TextComponent>
      </Stack>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">
          Filtros de Búsqueda
        </Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="Titulo" 
              value={data.TITULO}
              onChange={handleDataFormChange}
              name="TITULO"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Autor" 
              list={listAutores}
              value={data.ID_AUTOR}
              onChange={handleDataFormChange}
              name="ID_AUTOR"
              />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Categoria" 
              list={listCategorias}
              value={data.ID_CATEGORIA}
              onChange={handleDataFormChange}
              name="ID_CATEGORIA"
              />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Etiqueta" 
              list={listEtiquetas}
              value={data.ID_ETIQUETA}
              onChange={handleDataFormChange}
              name="ID_ETIQUETA"
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent
          resetForm={() => resetData()}
          filterForm={() => getDataLibros()}
        />
      </Box>
      <br />
      <Controls.TableComponents>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Autor/es</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Etiqueta</TableCell>
              <TableCell align="center">Operación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros?.length > 0 ? (
              libros.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.TITULO}</TableCell>
                  <TableCell>
                    {el.ID_AUTOR.map((autor, index) => (
                      <span key={index}>{autor.NOMBRE_AUTOR} </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {el.ID_CATEGORIA.map((categoria, index) => (
                      <span key={index}>{categoria.CATEGORIA} </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {el.ID_ETIQUETA.map((etiqueta, index) => (
                      <span key={index}>{etiqueta.ETIQUETA} </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                      {(el.LINK && el.LINK !== "") &&
                      <a href={el.LINK} target="_blank" rel="noreferrer">
                        <Controls.ButtonIconComponent
                          title="Abrir Link"
                          icon={ICON.READ}
                        />
                      </a>
                      }

                      <Controls.ButtonIconComponent
                        title="Editar"
                        icon={ICON.EDIT}
                        onClick={() => navigate(pathFront.LIBROS_EDIT + el._id)}
                      />

                      <Controls.ButtonIconComponent
                        title="Administrar Grados"
                        icon={ICON.DEGREE}
                        onClick={() => navigate(pathFront.LIBROS_GRADOS + el._id)}
                      />

                      <Controls.ButtonIconComponent
                        title="Eliminar"
                        icon={ICON.DELETE}
                        onClick={() => delLibro(el._id)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Sin resultados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Controls.TableComponents>
    </Box>
  );
}

import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';

export default function LibrosAdminPage () {
  const [openModal, setOpenModal] = useState(false);
  
  return(
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Autores" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nuevo autor"
          onClick={() => setOpenModal(true)}
        />
      </Stack>
      <Stack direction="row" spacing={1} marginTop={1}>
        <Controls.TextComponent variant="span3" onClick={() => console.log("Hola")}>Todos</Controls.TextComponent>
        <span>|</span>
        <Controls.TextComponent variant="span3">Publicadas</Controls.TextComponent>
        <span>|</span>
        <Controls.TextComponent variant="span3">Eliminadas</Controls.TextComponent>
      </Stack>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Controls.InputComponent label="Nombre" />
          </Grid>
          <Grid item xs={3}>
            <Controls.InputComponent label="Autor" />
          </Grid>
          <Grid item xs={3}>
            <Controls.InputComponent label="Categoria" />
          </Grid>
          <Grid item xs={3}>
            <Controls.InputComponent label="Etiqueta" />
          </Grid>
          <Grid item xs={3}>
            <Controls.InputComponent label="Estado" />
          </Grid>
        </Grid>
        <br />
        <Stack direction="row" spacing={3} justifyContent="center">
          <Controls.ButtonComponent
            title="LIMPIAR"
            variant="secondary-small"
            type="admin"
            icon={ICON.BACK}
          />

          <Controls.ButtonComponent
            title={"FILTRAR"}
            variant="primary-small"
            type="admin"
            icon={ICON.SAVE}
          />
        </Stack>
      </Box>
      <br />
      <Controls.TableComponents>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Autor/es</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Etiqueta</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Hola</TableCell>
              <TableCell>Hola</TableCell>
              <TableCell>Hola</TableCell>
              <TableCell>Hola</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Controls.ButtonIconComponent
                    title="Editar"
                    icon={ICON.EDIT}
                  />

                  <Controls.ButtonIconComponent
                    title="Eliminar"
                    icon={ICON.DELETE}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Controls.Modal
          open={openModal}
          setOpen={setOpenModal}
          title="Nuevo Autor"
          fullWidth
          maxWidth="sm"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controls.InputComponent label="Nombre de Autor" />
            </Grid>

            <Grid item xs={12}>
              <Controls.InputComponent label="Pagina Web" />
            </Grid>

            <Grid item xs={12}>
              <Controls.InputComponent label="Nacionalidad" />
            </Grid>
            
            <Grid item xs={12}>
              <Controls.InputComponent label="Descripcion del Autor" />
            </Grid>
            
            <Grid item xs={12}>
              <Stack direction="row" spacing={3} justifyContent="center">
                <Controls.ButtonComponent
                  title="Volver"
                  variant="secondary-normal"
                  type="admin"
                  icon={ICON.BACK}
                />

                <Controls.ButtonComponent
                  title={"Guardar"}
                  variant="primary-normal"
                  type="admin"
                  icon={ICON.SAVE}
                  />
              </Stack>
            </Grid>
          </Grid>
        </Controls.Modal>
      </Controls.TableComponents>
    </Box>
  )
}


import { Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';

export default function ConfiguracionDetail () {
  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Configuración" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nuevo Grado"
        />
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
      </Controls.TableComponents>
    </Box>
  )
}
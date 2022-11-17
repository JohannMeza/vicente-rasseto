import { Grid, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import ConfiguracionDetail from '../detail/ConfiguracionDetail';
import GradosDetail from '../detail/GradosDetail';
import NivelEstudioDetail from '../detail/NivelEstudioDetail';

export default function GradosAdminPage () {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return(
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab
          label="Nivel Estudio"
          id="simple-tab-1"
          aria-controls="simple-tabpanel-1"
        />
        <Tab
          label="Grados"
          id="simple-tab-1"
          aria-controls="simple-tabpanel-1"
        />
        <Tab
          label="Configuración"
          id="simple-tab-1"
          aria-controls="simple-tabpanel-1"
        />
      </Tabs>
      <br />
      <Controls.TabPanel value={value} index={0}>
        <NivelEstudioDetail />
      </Controls.TabPanel>
      <Controls.TabPanel value={value} index={1}>
        <GradosDetail />
      </Controls.TabPanel>
      <Controls.TabPanel value={value} index={2}>
        <ConfiguracionDetail />
      </Controls.TabPanel>
    </Box>
  )
}


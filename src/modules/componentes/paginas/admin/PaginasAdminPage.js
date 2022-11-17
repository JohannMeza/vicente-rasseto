import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import Controls from "../../../../framework/components/Controls";
import PaginasDetailConfiguracion from "../detail/PaginasDetailConfiguracion";
import PaginasDetail from "../detail/PaginasDetail";
import SubpaginasDetail from "../detail/SubpaginasDetail";

const PaginasAdminPage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Páginas"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
          <Tab
            label="Sub Paginas"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
          <Tab
            label="Configuración"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
        </Tabs>
      </Box>
      <br />
      <Controls.TabPanel value={value} index={0}>
        <PaginasDetail />
      </Controls.TabPanel>
      <Controls.TabPanel value={value} index={1}>
        <SubpaginasDetail />
      </Controls.TabPanel>
      <Controls.TabPanel value={value} index={2}>
        <PaginasDetailConfiguracion />
      </Controls.TabPanel>
    </Box>
  );
};

export default PaginasAdminPage;

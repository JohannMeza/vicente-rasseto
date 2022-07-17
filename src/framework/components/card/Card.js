import { Box, Paper, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { theme } from "../palette/StyleGlobals";

export default function Card ({ children, title = "Sin titulo" }) {
  const stylePaper = {
    width: '100%',
    border: ".5px solid var(--black_100)"
  }

  const styleTitle = {
    borderBottom: ".5px solid var(--black_100)",
    padding: "10px 15px"
  }

  const styleMain = {
    padding: "25px 15px"
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={stylePaper}>
        <Box sx={styleTitle}> 
          <Typography variant="text1" component="span">{title}</Typography>
        </Box>

        <Box sx={styleMain}>
          {children}
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

import { ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { theme } from "../palette/StyleGlobals";

export const Title = ({ children, title, sx }) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" component="h1" sx={sx}>
        {title}
      </Typography>
    </ThemeProvider>
  );
};

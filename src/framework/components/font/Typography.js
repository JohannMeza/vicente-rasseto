import { ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { theme } from "../palette/StyleGlobals";

export const TextComponent = ({ children, variant, component, style, className, sx }) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant={variant} component={component} style={style} className={className} sx={sx}>
        {children}
      </Typography>
    </ThemeProvider>
  );
};

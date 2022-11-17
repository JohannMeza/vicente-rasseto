import { ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { theme } from "../palette/StyleGlobals";

export const TextComponent = ({ children, variant, component, style, className, sx, onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Typography variant={variant} component={component} style={style} className={className} sx={sx} onClick={handleClick}>
        {children}
      </Typography>
    </ThemeProvider>
  );
};

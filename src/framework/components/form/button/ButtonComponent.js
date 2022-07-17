import React from 'react';
import { ThemeProvider, Button, Tooltip, IconButton } from '@mui/material';
import { theme } from '../../palette/StyleGlobals';

export const ButtonComponent = ({ type, variant = "medium", title, disabled, onClick = null, className, style, icon }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }
  
  return (
    <ThemeProvider theme={theme}>    
      <Button 
      type={type}
      variant={variant}
      disabled={disabled || false} 
      onClick={handleClick}
      style={style}
      startIcon={icon}
      >
        {title}
      </Button>
    </ThemeProvider>
  )
}

export const ButtonIconComponent = ({  type, variant, className, onClick, disabled, title, icon }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={title || ''} placement="top">
        <IconButton 
        type={type}
        variant={variant}
        onClick={handleClick} 
        disabled={disabled || false}
        className={className}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </ThemeProvider>
  )
}
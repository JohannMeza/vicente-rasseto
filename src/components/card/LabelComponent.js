import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';

const LabelComponent = ({color, label}) => {
  const [styleColor, setStyleColor] = useState("");
  
  const styleButtonsCategory = {
    userSelect: "none", 
    padding: "5px 10px 5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.5s ease",
    '&:hover': {
      transform: "scale(1.1)"
    } 
  }

  useEffect(() => {
    if (color === "verde") {
      setStyleColor("background-third color-white_100")
    } else if (color === "rojo") {
      setStyleColor("background-red_600 color-white_100")
    } else {
      setStyleColor("background-primary color-white_100")
    }
  }, [color])
  
  return (
    <Box className={styleColor} sx={styleButtonsCategory}>{label}</Box>
  )
}

export default LabelComponent
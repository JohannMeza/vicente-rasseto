import { Box } from '@mui/system';
import React from 'react';
import "./CardHorizontal.css";

const CardHorizontal = ({ classNameColor, children, img, sx }) => {
  return (
    <Box className={`card-main ${classNameColor}`} sx={sx}>
      <Box className="display-flex display-flex-center-center card-main__img">
        <img src={img} alt="" />
      </Box>
      <Box item xs={6}>
        {children}
      </Box>
    </Box>
  )
}

export default CardHorizontal;
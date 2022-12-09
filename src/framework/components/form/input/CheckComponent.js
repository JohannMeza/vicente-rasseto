import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from '@mui/material';

export default function CheckComponent({ label, name, onChange, value, sx }) {
  return (
    <>
      <FormControlLabel
        sx={sx}
        control={
          <Checkbox
            size="small"
            name={name}
            color="default"
            onChange={onChange}
            checked={value}
            value={value}
          />
        }
        label={label || ""}
      />
    </>
  );
}

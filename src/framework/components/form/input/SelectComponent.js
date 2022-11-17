import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';

export const SelectComponent = React.memo(({list, label, onChange, value, name, disabled, className, error = null, primaryItem, sx}) => {

  const handleChange = (ev) => {
    if(onChange){
        onChange(ev);
    }
  }

  return (
        <TextField
          sx={sx}
          style={{ width: "100%",backgroundColor:'white',borderRadius: "0.28rem"}}
          className={className}
          variant="outlined"
          value={(list?.length > 0) ? ((list.filter(x => x.value === value).length > 0) ? value : 0 ) : 0}
          label={label}
          size="small"
          onChange={handleChange}
          name={name}
          select
          fullWidth
          InputProps={{
            inputProps: { 
                readOnly: disabled || false
            }
          }}
          {...(error && {error:true, helperText: error, required: true})}
        >
          <MenuItem value={0} key={primaryItem || "Seleccione"}> {primaryItem ||"Seleccione"}</MenuItem>
          
          {(list?.length > 0) && list?.map( (x,i) => (
              
                  <MenuItem value={x.value} key={`${x.label}_${i}`}>{(x.label === '' || x.label == null) ? 'No Label' : x.label}</MenuItem>
              
          )) }
        </TextField>
  );
})

export default SelectComponent;
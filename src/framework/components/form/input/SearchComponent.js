import * as React from 'react';
import {TextField, Checkbox, Autocomplete} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { UserUtil } from '../../util/UserUtil';

export const SearchComponent = React.memo(({list, label, onChange, value = null, name, disabled, multiple, className, error = null}) => {
  const newList = [{value: 0, label: ''}, ...list];

  const handleChange = (ev, newValues) => { 
    
    if(onChange){
        if(multiple){
          const new_values = newValues.map(x => x.value ).join(',');
          const e = {target: { name , value: new_values}}
          onChange(e);
        }
        else{
          const e = {target: { name , value: newValues?.value}}
          onChange(e);
        }
    }
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
          (multiple) ? 
          <Autocomplete
            multiple
            limitTags={2}
            className={className || ''}
            style={{ width: "100%"}}
            options={list}
            onChange={handleChange} 
            disableCloseOnSelect
            getOptionLabel={(option) => option.label ? option.label : ''}
            name={name} 
            size="small"
            value={(value.length > 0) ? list.filter((item) => value.includes(item.value)) : []} 
            disabled={disabled || false}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 2 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label={label} size="small"
              {...(error && {error:true, helperText: error})}
              />
            )}
            sx={{ width: '100%' }}
        />
        :
        <Autocomplete
            //disablePortal
            disabled={disabled || false}
            style={{ width: "100%"}}
            //freeSolo
            options={newList}
            className={className || ''}
            onChange={handleChange} 
            autoHighlight
            includeInputInList
            getOptionLabel={(option) => option?.label || ''}
            name={name} 
            size="small"
            value={ (value != undefined || value != null || value != 0 || value != '') ? newList.find(x => x.value == value) : {value: 0, label: ''}}
            isOptionEqualToValue={(option,value) => option?.value == value?.value}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.value+ UserUtil.getKey()}>
                  {option.label}
                </li>
              );
            }}
            // popupIcon={ICON.SEARCH}
            renderInput={(params) => 
              <TextField 
              disabled={disabled || false}
              label={label}  
              InputProps={{
                inputProps: { 
                    readOnly: disabled || false
                },
              }
              }
              {...params}
              {...(error && {error:true, helperText: error, required: true})}
              />
            }
        />    
  );
})

export default SearchComponent;
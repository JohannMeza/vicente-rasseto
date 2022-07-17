import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import Controls from "../../Controls";

export default function InputComponent({
  label,
  id,
  value,
  onChange,
  name,
  disabled,
  type,
  className,
  error = null,
  min,
  max,
  precision,
  icon,
  autocomplete,
  required,
  placeholder = "",
  style,
  iconClick,
}) {
  const handleChange = (e) => {
    const valueAnt = value;
    if (type === "decimal") {
      if (min) {
        if (parseFloat(e.target.value) < parseFloat(min)) {
          e.target.value = valueAnt;
        }
      }
      if (max) {
        if (parseFloat(e.target.value) > parseFloat(max)) {
          e.target.value = valueAnt;
        }
      }
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleInput = (e) => {
    if (type === "decimal") {
      let t = e.target.value;
      let pre = precision ? precision + 1 : 4;
      e.target.value =
        t.indexOf(".") >= 0
          ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), pre)
          : t;
    }
  };

  const handleIconClick = () => {
    if (iconClick) {
      if (type === "password") iconClick("text");

      if (type === "text") iconClick("password");
    }
  };

  return (
    <TextField
      style={{ width: "100%", ...style }}
      className={className || ""}
      id={id || "outlined-basec"}
      label={label}
      type={type === "decimal" || type ? "text" : type}
      variant="outlined"
      size="small"
      name={name}
      value={value === undefined || value === null || value === "" ? "" : value}
      fullWidth={true}
      onChange={handleChange}
      onInput={handleInput}
      autoComplete={autocomplete || "off"}
      required={required || false}
      placeholder={placeholder}
      InputProps={{
        inputProps: {
          max,
          min,
          type,
          readOnly: disabled || false,
        },
        endAdornment: (
          <InputAdornment position="end" onClick={handleIconClick}>
            {iconClick && <Controls.ButtonIconComponent icon={icon || ""} />}
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink:
          type === "datetime-local" || type === "date" || type === "time"
            ? true
            : undefined,
      }}
      {...(error && { error: true, helperText: error, required: true })}
    />
  );
}

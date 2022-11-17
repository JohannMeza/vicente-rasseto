import { Stack } from "@mui/material";
import React from "react";
import Controls from "../../framework/components/Controls";
import { ICON } from "../../framework/components/icons/Icon";

export default function ButtonsSearchComponent({ resetForm, filterForm }) {
  const clearForm = () => {
    if (resetForm) resetForm()
    if (!resetForm) console.warn("No hay accion para limpiar formulario")
  }

  const saerchForm = () => {
    if (resetForm) filterForm()
    if (!resetForm) console.warn("No hay accion para filtar formulario")
  }
  
  return (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Controls.ButtonComponent
        title="LIMPIAR"
        variant="secondary-small"
        type="admin"
        icon={ICON.BACK}
        onClick={clearForm}
      />

      <Controls.ButtonComponent
        title={"FILTRAR"}
        variant="primary-small"
        type="admin"
        icon={ICON.SAVE}
        onClick={saerchForm}
      />
    </Stack>
  );
}

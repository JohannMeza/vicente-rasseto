import React, { useEffect } from "react";
import Controls from "../../../../framework/components/Controls";
import { Stack, Grid } from "@mui/material";
import { ICON } from "../../../../framework/components/icons/Icon";
import { useFormValidation } from "../../../../hooks/useFormValidation";

export default function PaginasDetailModalPage({
  open,
  setOpen,
  listSubPaginas,
  setListSubPaginas,
  dataSubmenu,
  setDataSubmenu,
  id
}) {
  const dataInitial = {
    ID_MENU: id,
    PATH: "",
    NOMBRE_SUBMENU: "",
    NOMBRE_ICON: "",
    _id: ""
  };

  const validate = (fieldValues = data) => {
    let temp = { ...errors };
    if ("PATH" in fieldValues) {
      temp.PATH =
        fieldValues.PATH === ""
          ? "El campo Ruta de la Página es requerido"
          : "";
    }
    if ("NOMBRE_SUBMENU" in fieldValues) {
      temp.NOMBRE_SUBMENU =
        fieldValues.NOMBRE_SUBMENU === ""
          ? "El campo Nombre de la Sub Página es requerido"
          : "";
    }
    if ("NOMBRE_ICON" in fieldValues) {
      temp.NOMBRE_ICON =
        fieldValues.NOMBRE_ICON === ""
          ? "El campo Nombre del Icono es requerido"
          : "";
    }
    setErrors({ ...temp });
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { data, setData, errors, setErrors, handleInputFormChange, resetForm } =
    useFormValidation(dataInitial, validate);

  const addSubpagina = () => {
    if (validate()) {
      if (data._id || data.id) {
        let arrSubPagina = []
        if (data._id) {
          arrSubPagina = listSubPaginas.map(el => el._id === data._id ? data : el)
        }
        
        if (data.id) {
          arrSubPagina = listSubPaginas.map(el => el.id === data.id ? data : el)
        }
        setListSubPaginas(arrSubPagina)
      } else {
        setListSubPaginas([...listSubPaginas, {...data, id: Date.now().toString()}]);
      }

      setOpen(false);
      resetForm();
      setTimeout(() => {
        setDataSubmenu(null);
      }, 500)
    }
  };

  const closeModal = () => {
    setOpen(false);
    resetForm()
    setTimeout(() => {
      setDataSubmenu(null);
    }, 500)
  };

  useEffect(() => {
    if (dataSubmenu) setData(dataSubmenu)
  }, [dataSubmenu, setData]);

  return (
    <Controls.Modal
      open={open}
      setOpen={closeModal}
      minWidth={600}
      fullWidth={true}
      maxWidth="sm"
      title={dataSubmenu ? "Editar Sub Página" : "Nueva Sub Página"}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controls.InputComponent
            label="Nombre de la Sub Página"
            name="NOMBRE_SUBMENU"
            value={data.NOMBRE_SUBMENU}
            error={errors.NOMBRE_SUBMENU}
            onChange={handleInputFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.InputComponent
            label="Ruta de la Página"
            name="PATH"
            value={data.PATH}
            error={errors.PATH}
            onChange={handleInputFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.InputComponent
            label="Nombre del Icono"
            name="NOMBRE_ICON"
            value={data.NOMBRE_ICON}
            error={errors.NOMBRE_ICON}
            onChange={handleInputFormChange}
          />
        </Grid>
      </Grid>
      <br />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={closeModal}
        />
        <Controls.ButtonComponent
          title={dataSubmenu ? "Editar" : "Guardar"}
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={addSubpagina}
        />
      </Stack>
    </Controls.Modal>
  );
}

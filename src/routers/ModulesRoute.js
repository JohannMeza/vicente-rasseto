import React, { memo, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdministradorRoutes from '../modules/administrador/AdministradorRoutes';
import useAuthContext from '../hooks/useAuthContext';
import DocenteAdminPage from '../modules/docente/DocenteAdminPage';
import EstudianteRoute from '../modules/estudiante/EstudianteRoute';

const ModulesRoute = () => {
  const { user } = useAuthContext()
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (user) {
      setRole(user.userAccess.ID_PERFILES.NOMBRE_PERFIL)
    }
  }, [user])
  return (
    <Routes>
      {/* <Route path="/*" element={<PrivateRoute path="/" element={<AdministradorAdminPage />} />} /> */}
      <Route path="*" element={(role && role === "Administrador") 
        ? <AdministradorRoutes />
        : (role && role === "Docente") 
          ? <DocenteAdminPage />
          : (role && role === "Estudiante")
            ? <EstudianteRoute />
            : <></>
      } />
    </Routes>
  )
}

export default memo(ModulesRoute)
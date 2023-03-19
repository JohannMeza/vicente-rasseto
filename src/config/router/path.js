// RUTAS PARA EL SERVER


// AUTENTICACION
export const LOGIN =  "/auth/usuario/login";
export const ACCESS = "/auth/usuario/access";
export const LOGOUT = "/logout";
export const PAGE = "/administrador/paginas/admin";

// ADMINISTRACION
export const PERFILES = "/seguridad/perfiles/admin";

export const HOME = "/";
export const SEGURIDAD = "/seguridad";


// SEGURIDAD
export const SEGURIDAD_PERFILES_INDEX = "/seguridad/perfiles"
export const SEGURIDAD_PERFILES_SHOW = "/seguridad/perfiles"

export const SEGURIDAD_PERFILES_MENU_SUBMENU_STORE = "/seguridad/perfiles_menu/submenu"
export const SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW = "/seguridad/perfiles_menu"

// CONFIGURACION
export const CONFIG_INDEX = "/configuracion/menu";
export const CONFIG_SHOW = "/configuracion/menu/show/"
export const CONFIG_DELETE = "/configuracion/menu"
export const CONFIG_NEW = "/configuracion/menu/new";


export const pathServer = {
  AUTH: {
    PATH: "/auth/usuario/path/"
  },

  CONFIGURACION: {
    MENU: {
      INDEX: "/configuracion/menu",
      NEW: "/configuracion/menu/new",
      UPDATE_SUBMENUS: "/configuracion/menu/update/submenus/"
    },
    SUBMENU: {
      INDEX: "/configuracion/submenu",
      SEARCH_MULTI_IDS: "/configuracion/submenu/multi_search"
    }
  },

  ADMINISTRACION: {
    GRADOS: {
      INDEX: "/administracion/grado/",
      NEW: "/administracion/grado/new/",
      DELETE: "/administracion/grado/"
    },
    NIVEL_ESTUDIO: {
      INDEX: "/administracion/nivel_estudio",
      NEW: "/administracion/nivel_estudio/new",
      DELETE: "/administracion/nivel_estudio/"
    },
    ALUMNOS: {
      INDEX: "/administracion/alumnos",
      NEW: "/administracion/alumnos/new",
      GRADOS_LABEL: "/administracion/alumnos/grados_label",
      REPORTE: "/administracion/alumnos/reporte",
      IMPORTAR: "/administracion/alumnos/importar",
    },
    DOCENTES: {
      INDEX: "/administracion/docentes",
      NEW: "/administracion/docentes/new",
      REPORTE: "/administracion/docentes/reporte",
      IMPORTAR: "/administracion/docentes/importar",
    },
    AUTOR: {
      INDEX: "/administracion/autor",
      NEW: "/administracion/autor/new",
      IMPORTAR: "/administracion/autor/importar",
    },
    CATEGORIA: {
      INDEX: "/administracion/categorias",
      NEW: "/administracion/categorias/new",
    },
    ETIQUETAS: {
      INDEX: "/administracion/etiquetas",
      NEW: "/administracion/etiquetas/new",
    },
    MULTIMEDIA: {
      INDEX: "/administracion/multimedia",
      DATA_INITIAL: "/administracion/multimedia/list_data_initial",
      LIST_GRADOS: "/administracion/multimedia/list_grados/",
      LIST_ALL_GRADOS: "/administracion/multimedia/list_nivel_estudio",
      LIST_GRADOS_SAVE: "/administracion/multimedia/list_grados_by_media/",
      NEW: "/administracion/multimedia/new/",
      NEW_CLOUDINARY: "/administracion/multimedia/new/cloudinary/",
      DELETE: "/administracion/multimedia/delete/",
      UPDATE_GRADOS: "/administracion/multimedia/update_grados/"
    }
  },

  SEGURIDAD: {
    PERFILES: {
      INDEX: "/seguridad/perfiles",
      NEW: "/seguridad/perfiles/new"
    }
  },

  CONFIG_MENU: {
    SEARCH_SUBPAGINAS: "/configuracion/menu/subpaginas/" // + id
  },

  ESTUDIANTE: {
    BIBLIOTECA: {
      INDEX: "/estudiante/biblioteca",
      SHOW: "/estudiante/biblioteca/libro/",
      PREVIEW_LIBRO: "/estudiante/biblioteca/libro/preview/",
      SHOW_RELACIONADO: "/estudiante/biblioteca/libros-relacionados",
      SEARCH: "/estudiante/biblioteca/multimedia",
    },
    CATEGORIA: {
      SEARCH: "/estudiante/categoria"
    }
  }
}


export const CONFIG_SUBMENU_INDEX = "/configuracion/submenu";
export const CONFIG_SUBMENU_NEW = "/configuracion/submenu/new";
export const CONFIG_SUBMENU_DELETE = "/configuracion/submenu";


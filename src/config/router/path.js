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
    },
    DOCENTES: {
      INDEX: "/administracion/docentes",
      NEW: "/administracion/docentes/new",
    },
    AUTOR: {
      INDEX: "/administracion/autor",
      NEW: "/administracion/autor/new",
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
      NEW: "/administracion/multimedia/new",
      DELETE: "/administracion/multimedia/delete/",
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


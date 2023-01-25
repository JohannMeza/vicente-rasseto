import { paletteColors, fontStyle, sizeText } from '../VariablesGlobal';

const styleButtonEstudiante = [
  // --- PRIMARY - RED
  {
    props: { variant: "large" },
    style: {
      borderRadius: "20%",
      padding: "15px 25px",
      boxShadow: "-4px -4px 0 0 #E07F78",
      fontSize: sizeText.boton_1,
      background: paletteColors.secondary,
      color: paletteColors.white_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#DD8781",
        boxShadow: "-4px -4px 0 0 #B25F59",
      }
    },
  },
  {
    props: { variant: 'medium' },
    style: {
      borderRadius: "20%",
      padding: "10px 20px",
      boxShadow: "-4px -4px 0 0 #E07F78",
      fontSize: sizeText.boton_2,
      background: paletteColors.secondary,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#DD8781",
        boxShadow: "-4px -4px 0 0 #B25F59",
      }
    },
  },
  {
    props: { variant: 'small' },
    style: {
      borderRadius: "20%",
      padding: "5px 15px",
      fontSize: sizeText.boton_3,
      boxShadow: "-4px -4px 0 0 #E07F78",
      background: paletteColors.secondary,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#DD8781",
        boxShadow: "-4px -4px 0 0 #B25F59",
      }
    },
  },

  // --- SECUNDARY - GREEN
  {
    props: { variant: "large", type: "green" },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_1,
      boxShadow: "-4px -4px 0 0 #46AA8F",
      background: paletteColors.third,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#43A98D",
        boxShadow: "-4px -4px 0 0 #318A72",
      }
    },
  },
  {
    props: { variant: 'medium', type: "green"  },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_2,
      boxShadow: "-4px -4px 0 0 #46AA8F",
      background: paletteColors.third,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#43A98D",
        boxShadow: "-4px -4px 0 0 #318A72",
      }
    },
  },
  {
    props: { variant: 'small', type: "green"   },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_3,
      boxShadow: "-4px -4px 0 0 #46AA8F",
      background: paletteColors.third,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#43A98D",
        boxShadow: "-4px -4px 0 0 #318A72",
      }
    },
  },

  // --- THIRD - BLUE
  {
    props: { variant: "large", type: "blue" },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_1,
      boxShadow: "-4px -4px 0 0 #3A5C95",
      background: paletteColors.primary,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#3C609E",
        boxShadow: "-4px -4px 0 0 #2E4B7C",
      }
    },
  },
  {
    props: { variant: 'medium', type: "blue"  },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_2,
      boxShadow: "-4px -4px 0 0 #3A5C95",
      background: paletteColors.primary,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#3C609E",
        boxShadow: "-4px -4px 0 0 #2E4B7C",
      }
    },
  },
  {
    props: { variant: 'small', type: "blue"   },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_3,
      boxShadow: "-4px -4px 0 0 #3A5C95",
      background: paletteColors.primary,
      fontFamily: fontStyle.primary,
      color: paletteColors.white_100,
      fontWeight: 800,
      '&:hover, &.Mui-focusVisible': {
        background: "#3C609E",
        boxShadow: "-4px -4px 0 0 #2E4B7C",
      }
    },
  },
  // --- FOURTH
  {
    props: { variant: "large", type: "fourth" },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_1,
      border: "2px solid #F5958E",
      fontFamily: fontStyle.primary,
      color: paletteColors.secondary,
      fontWeight: 800,
      background: "none",
      boxShadow: "none",
      '&:hover, &.Mui-focusVisible': {
        background: "none",
        boxShadow: "none",
      }
    },
  },
  {
    props: { variant: 'medium', type: "yellow"  },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_1,
      border: "2px solid #F5958E",
      fontFamily: fontStyle.primary,
      color: paletteColors.secondary,
      fontWeight: 800,
      background: "none",
      boxShadow: "none",
      '&:hover, &.Mui-focusVisible': {
        background: "none",
        boxShadow: "none",
      }
    },
  },
  {
    props: { variant: 'small', type: "yellow"   },
    style: {
      borderRadius: "20%",
      fontSize: sizeText.boton_1,
      border: "2px solid #F5958E",
      fontFamily: fontStyle.primary,
      color: paletteColors.secondary,
      fontWeight: 800,
      background: "none",
      boxShadow: "none",
      '&:hover, &.Mui-focusVisible': {
        background: "none",
        boxShadow: "none",
      }
    },
  },
]

const styleButtonAdminAndDocente = [
    // --- PRIMARY - ADMIN
  {
    props: { variant: "primary-normal", type: "admin" },
    style: {
      padding: "5px 25px",
      fontSize: sizeText.boton_1,
      background: paletteColors.black_100,
      color: paletteColors.white_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: "#2D2C2C",
      }
    },
  },
  {
    props: { variant: "secondary-normal", type: "admin" },
    style: {
      padding: "5px 25px",
      fontSize: sizeText.boton_1,
      background: paletteColors.white_100,
      color: paletteColors.black_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: paletteColors.white_100,
      }
    },
  },
  {
    props: { variant: "primary-small", type: "admin" },
    style: {
      padding: "0px 25px",
      fontSize: sizeText.boton_2,
      background: paletteColors.black_100,
      color: paletteColors.white_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: "#2D2C2C",
      }
    },
  },
  {
    props: { variant: "secondary-small", type: "admin" },
    style: {
      padding: "0px 25px",
      fontSize: sizeText.boton_2,
      background: paletteColors.white_100,
      color: paletteColors.black_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: paletteColors.white_100,
      }
    },
  },

  // --- COLOR - BLUE 

  {
    props: { variant: "docente-large", type: "blue" },
    style: {
      padding: "5px 25px",
      fontSize: sizeText.boton_1,
      background: paletteColors.primary,
      color: paletteColors.white_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: "#3864AF",
      }
    },
  },
  {
    props: { variant: "docente-normal", type: "blue" },
    style: {
      padding: "5px 25px",
      fontSize: sizeText.boton_1,
      background: paletteColors.primary,
      color: paletteColors.white_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: "#3864AF",
      }
    },
  },
  {
    props: { variant: "docente-small", type: "blue" },
    style: {
      padding: "0px 25px",
      fontSize: sizeText.boton_2,
      background: paletteColors.primary,
      color: paletteColors.white_100,
      fontFamily: fontStyle.primary,
      fontWeight: 800,
      boxShadow: "0 4px 4px 1px rgba(0,0,0,0.25)",
      '&:hover, &.Mui-focusVisible': {
        background: "#2D2C2C",
      }
    },
  }
]

export const StyleButton = [
  ...styleButtonEstudiante,
  ...styleButtonAdminAndDocente,
]
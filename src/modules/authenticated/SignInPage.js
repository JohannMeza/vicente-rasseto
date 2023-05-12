import { CssBaseline, Grid, Box, Stack } from '@mui/material';
import Controls from '../../framework/components/Controls';
import React from 'react';
import "./SignInPage.scss"
import { authLogin } from '../../services/auth.axios';
import { useForm } from '../../hooks/useForm';
import { LOGIN } from '../../config/router/path';
import { SaveRequestData } from '../../helpers/helpRequestBackend';
import { MessageUtil } from '../../util/MessageUtil';
import useAuthContext from '../../hooks/useAuthContext';
import useLoaderContext from '../../hooks/useLoaderContext';

const dataInitial = {
  EMAIL: "",
  PASSWORD: ""
}

export default function SignInPage() {
  const [data, handleInputChange, , setData] = useForm(dataInitial);
  const { login, setUser } = useAuthContext();
  const setLoader = useLoaderContext()

  const loginUser = () => {
    setLoader(true)
    SaveRequestData({
      path: LOGIN, 
      body: data,
      fnRequest: authLogin,
      success: (resp) => {
        login(resp.token)
        setUser(resp.data)
        setLoader(true)
        window.location.reload()
      },
      error: (err) => {
        setLoader(false)
        setData( {...data, PASSWORD: "" })
        MessageUtil({ message: err.statusText, type: "error", seg: 10, });
      }
    })

  }

  return (
    <Box className="content">
      <Box
      component="main"
      className="content__form"
      >
      <CssBaseline />
        <Grid container justifyContent="center">
          {/* <Grid item xs={6}>
            <Stack direction="row" justifyContent="center">
              <img src={Logo} alt="Insignia de Vicente Rasseto" className="logotipo" />
            </Stack>
          </Grid> */}
          
          <Grid item xs={12} lg={10}>
            <Stack direction="column" spacing={5}>
              <Controls.TextComponent 
                children="Iniciar Sesión"
                variant="h1"
                component="p"
                className=""
                sx={{ textAlign: "center", color: "var(--primary)" }}
              />

              <Box>
                <Controls.InputComponent
                  id="email"
                  label="Usuario"
                  name="EMAIL"
                  value={data.EMAIL}
                  autoComplete='on'
                  onChange={handleInputChange}
                />
              </Box>

              <Box>
                <Controls.InputComponent
                  id="password"
                  label="Contraseña"
                  type="password"
                  autoComplete='on'
                  name="PASSWORD"
                  value={data.PASSWORD}
                  onChange={handleInputChange}
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" sx={{ marginTop: "30px" }}>
              <Controls.ButtonComponent
                variant="docente-normal"
                type="blue"
                color="blue"
                onClick={loginUser}
                title="Entrar"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>

  )
}
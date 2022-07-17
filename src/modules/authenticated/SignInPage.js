import { Container, CssBaseline, Grid, Box, Stack } from '@mui/material';
import Controls from '../../framework/components/Controls';
import React, { useRef } from 'react';
import Logo from "../../assets/resources/logo.png"
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
  const inputPass = useRef(null);
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
        inputPass.current.focus()
        setData( {...data, PASSWORD: "" })
        MessageUtil({ message: err.statusText, type: "error", seg: 10, });
      }
    })

  }

  return (
    <Box className="content">
      <Container
      component="main"
      className="content__form"
      >
      <CssBaseline />
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <Stack direction="row" justifyContent="center">
              <img src={Logo} alt="Insignia de Vicente Rasseto" className="logotipo" />
            </Stack>
          </Grid>

          <Grid item xs={8}>
            <Stack direction="column" spacing={3}>
              <Box>
                <Controls.TextComponent 
                variant="h1" 
                component="div" 
                className="color-blue_700"
                sx={{ textAlign: "center", margin: "5px 0" }}
                >
                  <label htmlFor="user">Usuario</label>
                </Controls.TextComponent>

                <input 
                  type="text" 
                  id="user" 
                  className="inputStyle" 
                  autoComplete='off'
                  name="EMAIL"
                  value={data.EMAIL}
                  onChange={handleInputChange}
                />
              </Box>

              <Box>
                <Controls.TextComponent 
                variant="h1" 
                component="div" 
                className="color-blue_700"
                sx={{ textAlign: "center", margin: "5px 0" }}
                >
                  <label htmlFor="pass">Contraseña</label>
                </Controls.TextComponent>

                <input 
                  type="password" 
                  id="pass" 
                  className="inputStyle" 
                  autoComplete='off'
                  name="PASSWORD"
                  value={data.PASSWORD}
                  onChange={handleInputChange}
                  ref={inputPass}
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" sx={{ marginTop: "30px" }}>
              <Controls.ButtonComponent
                title="Entrar"
                variant="large"
                onClick={loginUser}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>

  )
}
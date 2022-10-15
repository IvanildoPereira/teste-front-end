import { Paper, Grid, TextField, Button, FormControl, FormHelperText } from '@material-ui/core';
import styled from 'styled-components';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth-context';
import { isEmailValid, isFieldFilled } from '../../utils/validate';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null)
  const [email, setEmail] = useState("");
  const auth = useContext(AuthContext); 

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    setUsernameError(null);
    setEmailError(null);
    if(!isFieldFilled(username)) setUsernameError("Name is required!");
    else if(!isFieldFilled(email)) setEmailError("Email is required!");
    else if(!isEmailValid(email)) setEmailError("Email Invalid!");
    else saveSessionUser();
  }

  const saveSessionUser = async() =>{
    const body = JSON.stringify({
      name: username.trim(),
      email: email.trim()
    });

    const response = await axios.post("http://localhost:5000/users/login", body, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    let expiresAt  = new Date(response.data.expiresAt);
    auth.login({name: username, email}, expiresAt);
  }


  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    > 
      <CustomPaper elevation={10}>
        <form onSubmit={handleOnSubmit}>
          <FormControl fullWidth>
            <TextInput 
              label='Username' 
              placeholder='Enter username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error = {usernameError ? true : false}
              fullWidth 
              //required
            />
            {usernameError && <FormHelperText id="component-error-text">{usernameError}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth>
            <TextInput 
              label='Email' 
              placeholder='Enter your email' 
              //type='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error = {emailError ? true : false}
              fullWidth 
              //required
            />
             {emailError && <FormHelperText id="component-error-text">{emailError}</FormHelperText>}
          </FormControl>
          <Button type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
        </form>
      </CustomPaper>
    </Grid>
  )
};

const CustomPaper = styled(Paper)`
  padding: 40px;
`

const TextInput = styled(TextField)`
  margin: 10px 0;
`

export default LoginPage;


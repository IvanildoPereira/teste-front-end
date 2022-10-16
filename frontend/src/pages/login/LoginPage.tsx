import { Paper, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context';
import axios from 'axios';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const auth = useContext(AuthContext); 

  const saveSessionUser = async(username: string, email: string) =>{
    const body = JSON.stringify({
      name: username.trim(),
      email: email.trim()
    });

    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, body, {
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
        <LoginForm onLogin={saveSessionUser}/>
      </CustomPaper>
    </Grid>
  )
};

const CustomPaper = styled(Paper)`
  padding: 40px;
`
export default LoginPage;


import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { isEmailValid, isFieldFilled } from "../../../utils/validate";

type LoginFormProps = {
    onLogin: (username: string, email: string) => void;
}

const LoginForm = ({onLogin}: LoginFormProps) =>{
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null)
    const [email, setEmail] = useState("");

    const isFieldsValid = () =>{
        let errors = 0;
        if(!isFieldFilled(username)){ 
          setUsernameError("Name is required!");
          errors++;
        };
        if(!isFieldFilled(email)){
          setEmailError("Email is required!");
          errors++;
        } else if(!isEmailValid(email)){
          setEmailError("Email Invalid!");
          errors++;
        }
        return errors > 0 ? false : true;
      }
    
      const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setUsernameError(null);
        setEmailError(null);
        
        if(isFieldsValid()) onLogin(username, email);
      }
    return(
        <form onSubmit={handleOnSubmit}>
            <FormControlContainer fullWidth>
                <TextField 
                    label='Username' 
                    placeholder='Enter username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error = {usernameError ? true : false}
                    fullWidth 
                    //required
                />
                {usernameError &&  <Typography  color = "error">{usernameError}</Typography>}
            </FormControlContainer>
            <FormControlContainer fullWidth>
                <TextField
                    label='Email' 
                    placeholder='Enter your email' 
                    //type='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error = {emailError ? true : false}
                    fullWidth 
                    //required
                />
                {emailError && <Typography  color = "error">{emailError}</Typography>}
            </FormControlContainer>
            <Button type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
        </form>
    )
}

const FormControlContainer = styled(FormControl)`
  margin-bottom: 20px !important;
`

export default LoginForm;
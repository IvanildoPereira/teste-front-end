import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import { ExitToApp } from "@material-ui/icons"
import { useContext } from "react"
import { AuthContext } from "../context/auth-context"
import UserAuth from "../types/UserAuth"

const Header = ({name, email}: UserAuth) =>{
    const auth = useContext(AuthContext);

    return(
        <AppBar position="static" style = {{paddingTop: 10, paddingBottom: 10}}>
          <Toolbar>
            <Avatar style={{marginRight: 20}}>{name.substring(0,1).toUpperCase()}</Avatar>
            <div style={{flexGrow: 1}}>
              <Typography variant="body1">
                {name}
              </Typography>
              <Typography>
                {email}
              </Typography>
            </div>
            <Button color="inherit" onClick={auth.logout} aria-label="Logout">
              <ExitToApp fontSize="large" aria-label="Logout Door"/>
            </Button>
          </Toolbar>
        </AppBar>
    )
}

export default Header
import { Box, Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const VideoNotFounded = () =>{
    let navigate = useNavigate();
    
    return(
        <BoxContainerError>
            <Typography variant="h2" color="error">Video Not Founded!</Typography>
            <Button 
                onClick={()=> navigate("/")}
                color='primary' 
                variant="contained"
                style={{marginTop: 20, marginBottom: 20}}
            >
                Go Back to videos
            </Button>
        </BoxContainerError>
    )
}

const BoxContainerError = styled(Box)`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default VideoNotFounded;
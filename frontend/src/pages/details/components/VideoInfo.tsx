import { Typography, Button } from "@material-ui/core";
import { useLocation, useNavigate, To } from "react-router-dom";
import styled from "styled-components";
import Video from "../../../types/Video";
import VideoStatistic from "./VideoStatistic";

type VideoInfoProps = {
    video: Video;
}

const VideoInfo = ({ video }: VideoInfoProps) =>{
    const { state } = useLocation();

    let navigate = useNavigate();

    return(
        <VideoInfoContainer>
            <Typography variant="h6" component="h2" color = "primary" align='center'>
            {video.title}
            </Typography>
            {video.videoStatistics && <VideoStatistic views={video.videoStatistics.views} likes = {video.videoStatistics.likes}/>}
            <Typography variant='body2'>
            {video.description}
            </Typography>

            <Button 
                onClick={()=> navigate(state?.previousPath ? -1 as To : "/")}
                color='primary' 
                variant="contained"
                style={{marginTop: 20}}
            >
                Go Back to Videos
            </Button>
        </VideoInfoContainer>
    )
}

const VideoInfoContainer = styled.div`
  padding: 0 20px;
`


export default VideoInfo;
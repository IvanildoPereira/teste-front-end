import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { forwardRef, Ref } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Video from "../../../types/Video";

type VideoCardProps = {
    video: Video
}

const VideoCard = forwardRef(({video}: VideoCardProps, ref: Ref<IntersectionObserver> | null) =>{
    const { pathname } = useLocation();
    
    let navigate = useNavigate();
    return(
        <Grid item xs = {12} sm = {12} md = {6} lg = {4}>
            <Card ref = {ref}>
                <CardMedia
                    component="img"
                    height="200"
                    image={video.thumbnail}
                    alt="Thumbnail of the video"
                />
                <CardVideoDetail>
                    <Typography gutterBottom variant="subtitle1" component="h3">
                        {video.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {video.description.length > 0 ? video.description : "This video has no description!" }
                    </Typography>
                </CardVideoDetail>
                <CardActions>
                    <Button size="small" onClick={()=> navigate(`/video/${video.id}`,{
                        state: { previousPath: pathname }
                    })} color='primary' variant="contained" fullWidth>Watch Video</Button>
                </CardActions>
            </Card>
        </Grid>
    )
})

const CardVideoDetail = styled(CardContent)`
    min-height: 160px;

    h3{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2; 
        -webkit-box-orient: vertical;
    }

`;

export default VideoCard;
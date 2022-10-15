import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Video from "../../../types/Video";

const VideoCard = ({id, thumbnail, title, description }: Video) =>{
    let navigate = useNavigate();
    return(
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={thumbnail}
                alt="Thumbnail of the video"
            />
            <CardVideoDetail>
                <Typography gutterBottom variant="subtitle1" component="h3">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {description.length > 0 ? description : "This video has no description!" }
                </Typography>
            </CardVideoDetail>
            <CardActions>
                <Button size="small" onClick={()=> navigate(`/video/${id}`)} color='primary' variant="contained" fullWidth>Watch Video</Button>
            </CardActions>
        </Card>
    )
}

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
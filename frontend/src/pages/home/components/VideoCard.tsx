import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
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
                <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=> navigate(`/video/${id}`)} color='primary' variant="contained" fullWidth>Watch Video</Button>
            </CardActions>
        </Card>
    )
}

export default VideoCard;
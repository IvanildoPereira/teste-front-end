import { Box } from "@material-ui/core";
import { ThumbUp, Visibility } from "@material-ui/icons";
import styled from "styled-components";

type VideoStatisticProps = {
    views: number,
    likes: number
}

const VideoStatistic = ({views, likes}: VideoStatisticProps) =>{
    return (
        <StatisticContainer>  
            <Box className="item">
                <Visibility/> <span>{views}</span>
            </Box>
            <Box className="item">
                <ThumbUp/> <span>{likes}</span>
            </Box>
        </StatisticContainer>
    )
}

const StatisticContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .item{
        display: flex;
        justify-content: center;
        align-items: center;       

        span{
            display: inline-block;
            margin-left: 10px;
            font-weight: bold;
        }
    }
`

export default VideoStatistic;
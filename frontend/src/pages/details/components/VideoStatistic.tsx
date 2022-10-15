import { Box } from "@material-ui/core";
import { ThumbUp, Visibility } from "@material-ui/icons";
import styled from "styled-components";
import { abbreviateNumber } from "../../../utils/abbreviateNumber";

type VideoStatisticProps = {
    views: number,
    likes: number
}

const VideoStatistic = ({views, likes}: VideoStatisticProps) =>{
    return (
        <StatisticContainer>  
            <Box className="item">
                <Visibility aria-label="views"/> <span>{abbreviateNumber(views)} views</span>
            </Box>
            <Box className="item">
                <ThumbUp aria-label="Number of Likes"/> <span>{abbreviateNumber(likes)}</span>
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
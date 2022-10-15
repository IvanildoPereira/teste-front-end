import { Box } from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import styled from "styled-components";

const LikeComponent = () =>{
    return (
        <LikeContainer>  
            <Box className="like_item">
                <ThumbDown/> <span>10</span>
            </Box>
            <Box className="like_item">
                <ThumbUp/> <span>40</span>
            </Box>
        </LikeContainer>
    )
}

const LikeContainer = styled(Box)`
    display: flex;

    .like_item{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        

        span{
            display: inline-block;
            margin-left: 10px;
            font-weight: bold;
        }
    }
`

export default LikeComponent;
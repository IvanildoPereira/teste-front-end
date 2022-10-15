import { Grid } from "@material-ui/core";
import { useCallback, useRef } from "react";
import styled from "styled-components";
import Video from "../../../types/Video";
import VideoCard from "./VideoCard";

type VideoListProp = {
    videos: Video[];
    hasNext: boolean;
    loading: boolean;
    changeToNextPageNumber: () => void;
}

const VideoList = ({videos, hasNext, loading, changeToNextPageNumber}: VideoListProp) =>{
    const observer = useRef<IntersectionObserver>();
    
    const lastVideoElementRef = useCallback((node: any) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasNext) {
            changeToNextPageNumber();
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasNext, changeToNextPageNumber]);

    return (
        <GridContainer container spacing={3}>
            {videos && videos.map((video: Video, index) => 
                <VideoCard key={index} ref={videos.length === index + 1 ? lastVideoElementRef : null} video = {video}/>  
            )}
        </GridContainer>
    )
}

const GridContainer = styled(Grid)`
    padding-top: 125px;
`

export default VideoList;
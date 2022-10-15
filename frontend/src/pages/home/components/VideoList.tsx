import { Grid } from "@material-ui/core";
import { useCallback, useRef } from "react";
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
            changeToNextPageNumber()
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasNext]);

    return (
        <Grid container spacing={3} style = {{paddingTop: "14vh"}}>
            {videos && videos.map((video: Video, index) => {
            if (videos.length === index + 1) {
                return (
                    <Grid item key={index} xs = {12} sm = {12} md = {6} lg = {4} ref={lastVideoElementRef}>
                        <VideoCard id = {video.id}  thumbnail = {video.thumbnail} title = {video.title} description = {video.description}/>  
                    </Grid>
                )}
            else {
                return (
                    <Grid item key={index} xs = {12} sm = {12} md = {6} lg = {4}>
                        <VideoCard id = {video.id} thumbnail = {video.thumbnail} title = {video.title} description = {video.description}/>
                    </Grid>
                )}
            })}
        </Grid>
    )
}

export default VideoList;
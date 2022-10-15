import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { To, useLocation, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { aspect } from '../../types/AspectRatio';
import Video from '../../types/Video';
import ResponsiveVideoIframe from './components/ResponsiveVideoIframe';
import VideoNotFounded from './components/VideoNotFounded';
import VideoStatistic from './components/VideoStatistic';

const DetailsPage = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() =>{
    console.log(state?.previousPath)
    const getVideoById = async() =>{
      const response = await axios(`http://localhost:5000/video/${id}`);
      if(response.data && response.data.video){
        setVideo(response.data.video);
      }
      setIsLoading(false)
    }

    getVideoById();
  }, [id])

  return (
    <>
    {!isLoading && video &&
      <div>
        <Typography variant="h4">
          {video.title}
        </Typography>
        <ResponsiveVideoIframe src = {`https://www.youtube.com/embed/${id}`} aspectRatio={aspect["16:9"]}/>
          {video.videoStatistics && <VideoStatistic views={video.videoStatistics.views} likes = {video.videoStatistics.likes}/>}
        <Typography>
          {video.description}
        </Typography>

        <Button 
          onClick={()=> navigate(state?.previousPath ? -1 as To : "/")}
          color='primary' 
          variant="contained"
          style={{marginTop: 20, marginBottom: 20}}
        >
          Go Back
        </Button>
      </div>
    }
    {isLoading && <LoadingSpinner color='#3f51b5'/>}
    {!isLoading && !video && (
      <VideoNotFounded />
    )}
    </>
  )
}

export default DetailsPage;
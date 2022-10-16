import {Paper } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { aspect } from '../../types/AspectRatio';
import Video from '../../types/Video';
import ResponsiveVideoIframe from './components/ResponsiveVideoIframe';
import VideoInfo from './components/VideoInfo';
import VideoNotFounded from './components/VideoNotFounded';

const DetailsPage = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();


  useEffect(() =>{
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
      <PaperContainerVideo elevation={6}>
        <ResponsiveVideoIframe src = {`https://www.youtube.com/embed/${id}`} aspectRatio={aspect["16:9"]}/>
        <VideoInfo video = {video}/>
      </PaperContainerVideo>
    }
    {isLoading && <LoadingSpinner color='#3f51b5'/>}
    {!isLoading && !video && (
      <VideoNotFounded />
    )}
    </>
  )
}

const PaperContainerVideo = styled(Paper)`
  border-radius: 20px !important;
  padding-bottom: 20px;
  margin-bottom: 50px;

  iframe{
    border-radius: 20px 20px 0px 0px;
  }
`

export default DetailsPage;
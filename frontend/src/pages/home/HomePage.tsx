import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import useYoutubeSearch from '../../hooks/useYoutubeSearch';
import Search from './components/Search';
import VideoList from './components/VideoList';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isSearchAnimationActive, setIsSearchAnimationActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});

  const {
    videos,
    nextPageToken,
    loading,
    error
  } = useYoutubeSearch(query, pageNumber)

  useEffect(() =>{
    let searchQuery = searchParams.get('search');
    if(searchQuery){
      handleSearch(searchQuery);
    }
  }, [])

  const handleChangePage = () =>{
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  }

  const handleSearch = (text: string) =>{
    if(!isSearchAnimationActive){
      setIsSearchAnimationActive(true);
      setSearchParams({search: text});
      setTimeout(() => setQuery(text), 1000);
      return;
    }

    setSearchParams({search: text});
    setQuery(text);
  }

  return (
    <div style={{position: "relative"}}>
      <Search 
        placeholder='Search a video' 
        defaultValue={searchParams.get('search') || ""} 
        onSearch = {handleSearch} 
        isActiveAnimation = {isSearchAnimationActive}/>
      {videos &&
        <VideoList 
          videos={videos} 
          loading = {loading} 
          hasNext = {!!nextPageToken} 
          changeToNextPageNumber = {handleChangePage}/>
      }      
      {loading && <LoadingSpinner color='#3f51b5'/>}
      {!!error && <Typography align='center' color = "error">{error}</Typography>}
    </div>
  )
}

export default HomePage;


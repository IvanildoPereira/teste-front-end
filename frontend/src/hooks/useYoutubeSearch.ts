
import { useEffect, useState } from 'react'
import axios from 'axios'
import Video from '../types/Video'

export default function useYoutubeSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [nextPageToken, setNextPageToken] = useState("")

  useEffect(() => {
    setVideos([])
  }, [query]);


  const getVideos = () =>{
    setLoading(true)
    setError(null)
    let cancel: () => void;
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BACKEND}/video/all`,
      params: { name: query, nextPageToken, maxResults: 15},
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      if(res.status === 500) throw Error(res.data.error)
      if(!res.data && !res.data.videos) throw Error("Some problem happens")
      setVideos((prevVideos: Video[]) => {
        return [...prevVideos, ...res.data.videos]
      })
      setNextPageToken(res.data.nextPageToken)
      setLoading(false)
    }).catch(error => {
      setLoading(false);
      if (axios.isCancel(error)) return
      else if(error.response.data.error) setError(error.response.data.error);
      else setError("Some problem happens");
    })
    return () => cancel()
  }

  useEffect(() => {
    if(query.length > 0){
      getVideos();
    }
  }, [query, pageNumber]);

  return { loading, error, videos, nextPageToken }
}
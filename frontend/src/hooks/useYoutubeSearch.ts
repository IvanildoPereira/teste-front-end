
import { useEffect, useState } from 'react'
import axios from 'axios'
import Video from '../types/Video'

export default function useYoutubeSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [videos, setVideos] = useState<Video[]>([])
  const [nextPageToken, setNextPageToken] = useState("")

  useEffect(() => {
    setVideos([])
  }, [query]);


  const getVideos = () =>{
    setLoading(true)
    setError(false)
    let cancel: () => void;
    axios({
      method: 'GET',
      url: 'http://localhost:5000/video/all',
      params: { name: query, nextPageToken, maxResults: 15},
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      if(!res.data && !res.data.videos) throw Error("Some problem happens")
      setVideos((prevVideos: Video[]) => {
        return [...prevVideos, ...res.data.videos]
      })
      setNextPageToken(res.data.nextPageToken)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
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
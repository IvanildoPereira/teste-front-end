import axios from "axios";
import { Request, Response } from "express";
import * as dotenv from 'dotenv';
import Video from "../models/Video";
import { VideoStatistics } from "../models/VideoStatistics";
dotenv.config()

type paramsProps = {
    q: string,
    maxResults: number,
    pageToken?: string
}

const getVideo = async (req: Request, res: Response) => {
    let { videoId } = req.params;
    let response = await axios({
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${process.env.YOUTUBE_API_KEY}`,
    });

    if(response.data && response.data.items[0]){
        let item = response.data.items[0];
        let videoStatistics = new VideoStatistics(
            item.statistics.likeCount,
            item.statistics.viewCount,
        )
        let video = new Video(
            item.id.videoId,
            item.snippet.thumbnails.high.url,
            item.snippet.title,
            item.snippet.description,
        )

        video.videoStatistics = videoStatistics;

        res.json({video});
    } 
    else res.json({error: "Video not founded!"});
}

const getVideos = async (req: Request, res: Response) => {
    let {name, nextPageToken, maxResults} = req.query;
    let videosList: Video[] = [];

    let params: paramsProps = {
        q: name as string || "",
        maxResults: parseInt(maxResults as string) || 10,
    }

    if(nextPageToken){
        params.pageToken = nextPageToken as string;
    }
    try{
        let response = await axios({
            method: 'GET',
            url: `https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=${process.env.YOUTUBE_API_KEY}`,
            params
        });
        if(response.data && response.data.items.length > 0){
            response.data.items.map((item: any) => {
                let video = new Video(
                    item.id.videoId,
                    item.snippet.thumbnails.high.url,
                    item.snippet.title,
                    item.snippet.description,
    
                )
                if(video.id) videosList.push(video);
            })
            res.json({videos: videosList, nextPageToken: response.data.nextPageToken})
        }
        else{
            res.json({error: "cant find any"})
        }
    }catch(err){
        res.status(500).json({error: "It wasn't possible to connect with the youtube API, check the limit or the API KEY"})
    }
    
}

export {
    getVideo,
    getVideos
}
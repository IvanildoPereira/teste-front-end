import axios from "axios";
import { Request, Response } from "express";
import * as dotenv from 'dotenv';
import Video from "../models/Video";
import { VideoStatistics } from "../models/VideoStatistics";
dotenv.config()

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

export {
    getVideo,
}
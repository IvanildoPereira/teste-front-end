import { Router } from "express";
import { getVideo, getVideos } from "../controller/videosController";

const videoRouter = Router();

videoRouter.get('/all', getVideos);
videoRouter.get('/:videoId', getVideo);

export {
    videoRouter
}
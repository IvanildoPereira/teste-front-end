import { Router } from "express";
import { getVideo, getVideos } from "../controller/videosController";
import { checkAuth } from "../middleware/check-auth";

const videoRouter = Router();

videoRouter.get('/all', checkAuth, getVideos);
videoRouter.get('/:videoId', checkAuth, getVideo);

export {
    videoRouter
}
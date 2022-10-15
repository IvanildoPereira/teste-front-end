import { VideoStatistics } from "./VideoStatistics";

export default class Video{
    public id: string;
    public thumbnail: string;
    public title: string;
    public description: string;
    public videoStatistics?: VideoStatistics;

    constructor(id: string, thumbnail: string, title: string, description: string){
        this.id = id;
        this.thumbnail = thumbnail;
        this.title = title;
        this.description = description;
    }
}
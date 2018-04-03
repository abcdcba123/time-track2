import {Injectable} from '@angular/core';

import {HttpService} from "./HttpService";

@Injectable()
export class TrackService {

    constructor(private httpService: HttpService) {
    }

    trackList(theme_id:number,limit:number,page:number) {
        var url = "/core/TrackController/trackList";
        var params = {theme_id:theme_id,limit:limit,page:page};
        return this.httpService.httpGetWithAuth(url, params);
    }

    trackInfo(track_id:number | null){
        var url = "/core/TrackController/trackList";
        var params = {track_id:track_id};
        return this.httpService.httpGetWithAuth(url, params);
    }

    editTrackInfo(trackInfo:any){
        var url = "/core/TrackController/editTrack";
        return this.httpService.httpGetWithAuth(url, trackInfo);
    }
}
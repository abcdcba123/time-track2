import {Injectable} from '@angular/core';

import {HttpService} from "./HttpService";

@Injectable()
export class ThemeService {

    constructor(private httpService: HttpService) {
    }

    themeList(limit:number,page:number) {
        var url = "/core/ThemeController/themeList";
        var params = {limit:limit,page:page};
        return this.httpService.httpGetWithAuth(url, params);
    }
}
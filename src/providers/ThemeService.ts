import {Injectable} from '@angular/core';

import {HttpService} from "./HttpService";

@Injectable()
export class ThemeService {

    constructor(private httpService: HttpService) {
    }

    themeList(limit: number, page: number) {
        var url = "/core/ThemeController/themeList";
        var params = {limit: limit, page: page};
        return this.httpService.httpGetWithAuth(url, params);
    }

    themeInfo(themeId) {
        var url = "/core/ThemeController/themeInfo";
        var params = {theme_id: themeId};
        return this.httpService.httpGetWithAuth(url, params);
    }

    editThemeInfo(themeInfo:any){
        var url = "/core/ThemeController/editTheme";
        return this.httpService.httpGetWithAuth(url, themeInfo);
    }
}
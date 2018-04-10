import {Component} from '@angular/core';
import {NavController, ItemSliding, ToastController, Events} from 'ionic-angular';
import {ThemeService} from "../../providers/ThemeService";
import {TrackListPage} from "../track/track-list/track-list";
import {ThemeEditPage} from "../theme/theme-edit/theme-edit";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ThemeService]
})
export class HomePage {
    themes: any[];

    constructor(public navCtrl: NavController,public events: Events, public themeService: ThemeService) {
        this.themeList();
        events.subscribe('theme:created', (themeInfo, time) => {
            this.themeList();
        });
    }

    public themeList(){
        this.themeService.themeList(10, 1).then(data => {
            console.log(data);
            // this.user = data.Result;
            if (typeof(data) == 'object' && typeof(data.code) == 'string' && data.code == 'OK') {
                console.log(data);
                this.themes = [];
                for (let i in data.data) {
                    console.log(data.data[i]);
                    this.themes[i] = {
                        theme_id: data.data[i].theme_id,
                        img: data.data[i].theme_icon_url,
                        name: data.data[i].theme_name,
                        message: data.data[i].theme_name,
                        time: data.data[i].create_time
                    }
                }
            } else {
                console.log('请先登录.');
            }
        });
    }

    public trackList(theme_id: any) {
        this.navCtrl.push(TrackListPage, {theme_id: theme_id});
    }

    public goEditTheme(themeId: any)
    {
        this.navCtrl.push(ThemeEditPage, {themeId: themeId});
    }

    public deleteTheme(theme){
        this.themeService.deleteTheme(theme.theme_id).then(data => {
            if (typeof(data) == 'object' && typeof(data.code) == 'string' && data.code == 'OK') {
                this.themes.splice(this.themes.indexOf(theme),1);
            } else {
                console.log('删除失败');
            }
        });
    }

}

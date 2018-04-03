import { Component } from '@angular/core';
import { NavController, ItemSliding, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
// import {UserInfoService} from "../../providers/UserInfoService";
import { ThemeService } from "../../providers/ThemeService";

import {TrackListPage} from "../track/track-list/track-list";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ThemeService]
})
export class HomePage {

  chats: any[];

  constructor(public navCtrl: NavController, private http:HttpClient, private themeService:ThemeService) {
    this.http
        .get("https://angular-http-guide.firebaseio.com/courses.json")
        .subscribe(console.log);
    this.themeService.themeList(10,1).then(data => {
        console.log(data);
        // this.user = data.Result;
        if (typeof(data) == 'object' && typeof(data.code) == 'string' && data.code == 'OK'){
          console.log(data);
          this.chats = [];
          for(let i in data.data){
            console.log(data.data[i]);
            this.chats[i] = {
              theme_id : data.data[i].theme_id,
              img : data.data[i].theme_icon_url,
              name : data.data[i].theme_name,
              message : data.data[i].theme_name,
              time : data.data[i].create_time
            }
          }
        }else{
            // alert('请先登录.');
          console.log('请先登录.');
        }
    });
    // this.chats = [
    //   {
    //     img: './assets/avatar-cher.png',
    //     name: 'Cher',
    //     message: 'Ugh. As if.',
    //     time: '9:38 pm'
    //   }, {
    //     img: './assets/avatar-dionne.png',
    //     name: 'Dionne',
    //     message: 'Mr. Hall was way harsh.',
    //     time: '8:59 pm'
    //   }, {
    //     img: './assets/avatar-murray.png',
    //     name: 'Murray',
    //     message: 'Excuse me, "Ms. Dione."',
    //     time: 'Wed'
    //   }];
  }

  public trackList(theme_id:any){
    console.log(theme_id);
    this.navCtrl.push(TrackListPage, { theme_id: theme_id });
  }

  public getData(){
      var url = 'www.baidu.com';
      this.http
          .get("https://angular-http-guide.firebaseio.com/courses.json")
          .subscribe(console.log);
  }

}

import { Component } from '@angular/core';
import { NavController, ItemSliding, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: any[];

  constructor(public navCtrl: NavController, private http:HttpClient) {
    this.chats = [
      {
        img: './assets/avatar-cher.png',
        name: 'Cher',
        message: 'Ugh. As if.',
        time: '9:38 pm'
      }, {
        img: './assets/avatar-dionne.png',
        name: 'Dionne',
        message: 'Mr. Hall was way harsh.',
        time: '8:59 pm'
      }, {
        img: './assets/avatar-murray.png',
        name: 'Murray',
        message: 'Excuse me, "Ms. Dione."',
        time: 'Wed'
      }];
  }

  public getData(){
      var url = 'www.baidu.com';
      this.http
          .get("https://angular-http-guide.firebaseio.com/courses.json")
          .subscribe(console.log);
  }

}

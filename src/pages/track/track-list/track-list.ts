import {Component} from '@angular/core';
import {
    NavController, NavParams, PopoverController, ActionSheetController, ViewController,
    Events
} from 'ionic-angular';

import {TrackService} from "../../../providers/TrackService";
import {TrackEditPage} from "../track-edit/track-edit";
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';


@Component({
    selector: 'page-track-list',
    templateUrl: 'track-list.html',
    providers: [TrackService]
})
export class TrackListPage {
    theme_id: any;// 用来接收上一个页面传递过来的参数
    limit = 10;
    page = 1;
    trackList: any[] = [];

    constructor(public navCtrl: NavController,
                navParams: NavParams,
                events: Events,
                public modalCtrl: ModalController,
                private trackService: TrackService,
                public actionSheetCtrl: ActionSheetController,
                private popoverCtrl: PopoverController) {
        this.theme_id = navParams.get('theme_id');//这个是通过页面跳转传过来的值
        this.page = 1;
        this.getTrackList();
        events.subscribe('track:created', (trackInfo, time) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            this.page = 1;
            this.trackList = [];
            this.getTrackList();
            // console.log(trackInfo);
            // this.trackList = [
            //     {
            //         time:'2018.05.03',
            //         content:'adfadfadfaf',
            //         img_1:'www.baidu.com',
            //         img_2:'www.baidu.com'
            //     }
            // ]
        });
    }

    getTrackList() {
        this.trackService.trackList(this.theme_id, this.limit, this.page).then(data => {
            // this.user = data.Result;
            if (typeof data == 'object' && typeof data.code == 'string' && data.code == 'OK') {
                console.log(data.data.track_list);
                for (let i in data.data.track_list) {
                    var temp_data = {
                        track_id: data.data.track_list[i].track_id,
                        time: data.data.track_list[i].track_time,
                        content: data.data.track_list[i].content,
                        track_img_list:data.data.track_list[i].track_img_list,
                        img_1:'',
                        img_2:''
                    };

                    if (data.data.track_list[i].track_img_list){
                        if (data.data.track_list[i].track_img_list[0]){
                            temp_data.img_1 = data.data.track_list[i].track_img_list[0].mini_img_url;
                        }
                        if (data.data.track_list[i].track_img_list[1]){
                            temp_data.img_2 = data.data.track_list[i].track_img_list[1].mini_img_url;
                        }
                    }
                    console.log(temp_data);
                    this.trackList.push(temp_data);
                }
            } else {
                alert('用户名或密码错误.');
            }
        });
    }

    doRefresh(refresher) {
        console.log("下拉刷新");
        setTimeout(() => {
            console.log('加载完成后，关闭刷新');
            refresher.complete();
            this.page = 1;
            this.trackList = [];
            this.getTrackList();
        }, 1000);
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            console.log('加载完成后，关闭刷新');
            infiniteScroll.complete();
            //增加index
            this.page ++;
            this.getTrackList();
        }, 1000);
    }

    ionViewDidLoad() {
        console.log('Hello Myinfo Page');
    }

    // 弹出选择框
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '提示',
            buttons: [
                {
                    text: '保存',
                    role: 'destructive',
                    handler: () => {
                        //this.saveImage(imgUrl);
                        alert('保存 clicked');
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        alert('取消 clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    goEditTrack(trackId) {
        this.navCtrl.push(TrackEditPage, {trackId: trackId, themeId: this.theme_id});
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

    photoViews(photoData,initialSlide = 0){
        let photos:Array<object> = [];
        let obj = {};
        console.log(photoData);
        // 多张图片时（photoData为图片地址字符串数组）
        if(photoData instanceof Array){
            console.log(photoData)
            photoData.forEach(function(item,index,array){
                obj = {};
                var key = 'img_url';
                // photoData 为字符串数组时（即key不存在时）
                if(item[key]){
                    obj['url'] = item[key];
                    photos.push(obj);
                }
            });
        }
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: initialSlide
        });
        modal.present();
    }

    photoViewsOld(photoData,key = '',initialSlide = 0){
        let photos:Array<object> = [];
        let obj = {};
        // 单张图片时（photoData为一个图片地址字符串且不为空）
        if(photoData && typeof photoData == "string"){
            obj = {};
            obj['url'] = photoData;
            photos.push(obj);
        }
        console.log(photoData)

        // 多张图片时（photoData为图片地址字符串数组）
        if(photoData instanceof Array){
            console.log(photoData)
            photoData.forEach(function(item,index,array){
                obj = {};
                // photoData 为字符串数组时（即key不存在时）
                if(key == '' && item){
                    obj['url'] = item;
                    photos.push(obj);
                }
                // photoData 为对象数组时（即key存在时）
                console.log(item[key])
                if(key != '' && item[key]){
                    obj['url'] = item[key];
                    photos.push(obj);
                }
            });
        }
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: initialSlide
        });
        modal.present();
    }
}

@Component({
    template: `
        <ion-list>
            <ion-list-header>Ionic</ion-list-header>
            <button ion-item (click)="close()">Learn Ionic</button>
            <button ion-item (click)="close()">Documentation</button>
            <button ion-item (click)="close()">Showcase</button>
        </ion-list>
    `
})
class PopoverPage {
    constructor(public viewCtrl: ViewController) {
    }

    close() {
        alert('closed');
        this.viewCtrl.dismiss();
    }
}


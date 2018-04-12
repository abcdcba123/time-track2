import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ActionSheetController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';

import {TrackService} from "./../../../providers/TrackService";
import {TrackListPage} from "../track-list/track-list";
import {Events} from 'ionic-angular';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {ImageService} from "../../../providers/ImageService";
import {File} from "@ionic-native/file";
import {HttpService} from "../../../providers/HttpService";
import {UploaderService} from "../../../providers/UploaderService";
import {FileUploader} from "ng2-file-upload";
import {StorageService} from "../../../providers/StorageService";
import {AppConfig} from "../../../app/app.config";


@Component({
    selector: 'page-track-edit',
    templateUrl: 'track-edit.html',
    providers: [TrackService]
})
export class TrackEditPage {
    public selectedImgUrl = [];

    public uploader:FileUploader;

    trackEditForm: any;

    constructor(public navCtrl: NavController,
                public events: Events,
                public navParams: NavParams,
                private trackService: TrackService,
                public actionSheetCtrl: ActionSheetController,
                private popoverCtrl: PopoverController,
                private formBuilder: FormBuilder,
                private transfer: FileTransfer,
                private imageService: ImageService,
                private httpService: HttpService,
                private uploaderService: UploaderService,
                private storageService: StorageService,
                private file: File) {
        this.uploader = new FileUploader({
            url: AppConfig.getProdBackAdminUrl() + "/index.php/core/UploadController/uploadTrackImg?token=" + this.storageService.read<string>('token'),
            method: "POST",
            itemAlias: "track_img"
        });
        var trackId = navParams.get('trackId');
        var themeId = navParams.get('themeId');
        this.trackEditForm = this.formBuilder.group({
            trackId: [''],
            themeId: [themeId, [Validators.required]],
            trackDate: [new Date()],
            trackDateTime: [new Date()],
            content: [''],
            style: [''],
        });
        console.log(trackId);
        if (trackId == null) {
            this.trackEditForm = this.formBuilder.group({
                trackId: [''],
                themeId: [themeId, [Validators.required]],
                trackDate: [new Date()],
                trackDateTime: [new Date()],
                content: [''],
                style: [''],
            });
        } else {
            this.getTrackInfo(trackId);
        }
        console.log(this.trackEditForm)
    }

    selectedFileOnChanged(event) {
        let self = this;
        for (var i in this.uploader.queue){
            this.uploader.queue[i].onSuccess = function (response, status, headers) {
                // 上传文件成功
                if (status == 200) {
                    var obj = JSON.parse(response);
                    if (obj.code == 'OK'){
                        //上传成功
                        console.log(self.selectedImgUrl);
                        self.selectedImgUrl.push({
                            img_url : '/track-admin/' + obj.data[0].img_url,
                            mini_img_url : '/track-admin/' + obj.data[0].mini_img_url
                        });
                        // document.querySelector('#preview1').innerHTML = obj.data[0].img_url;
                    }else {
                        //上传失败
                        alert('请重新登录');
                    }
                } else {
                    alert("上传错误");
                }
            };
            this.uploader.queue[i].upload(); // 开始上传
        }
        this.uploader = new FileUploader({
            url: AppConfig.getProdBackAdminUrl() + "/index.php/core/UploadController/uploadTrackImg?token=" + this.storageService.read<string>('token'),
            method: "POST",
            itemAlias: "track_img"
        });
    }

    removeImg(item){
        this.selectedImgUrl.splice(this.selectedImgUrl.indexOf(item),1);
    }

    getTrackInfo(trackId: any) {
        this.trackService.trackInfo(trackId).then(data => {
            if (typeof data == 'object' && typeof data.code == 'string' && data.code == 'OK') {
                console.log(data.data);
                this.trackEditForm = this.formBuilder.group({
                    trackId: [data.data.track_id],
                    themeId: [data.data.theme_id, [Validators.required]],
                    trackDate: [data.data.track_date],
                    trackDateTime: [data.data.track_date_time],
                    content: [data.data.content],
                    style: [data.data.style],
                });
                if (data.data.track_img_list){
                    for (var i in data.data.track_img_list){
                        this.selectedImgUrl.push({
                            img_url : data.data.track_img_list[i].img_url,
                            mini_img_url : data.data.track_img_list[i].mini_img_url
                        });
                    }
                }

            } else {
                alert('系统错误.');
            }
        });
    }

    saveTrackInfo(trackInfo) {
        if (this.selectedImgUrl.length > 0){
            for (var i in this.selectedImgUrl){
                var img_name = 'imgs[' + i + '][' + 'img_url]';
                var mini_img_name = 'imgs[' + i + '][' + 'mini_img_url]';
                trackInfo[img_name] = this.selectedImgUrl[i].img_url;
                trackInfo[mini_img_name] = this.selectedImgUrl[i].mini_img_url;
            }
        }
        this.trackService.editTrackInfo(trackInfo).then(data => {
            console.log(data);
            trackInfo.trackId = data.data.track_id;
            this.events.publish('track:created', trackInfo);
            this.navCtrl.popTo(TrackListPage);
        });
    }

    uploadTrackImg() {
        this.imageService.showPicActionSheet();
    }


    ionViewDidLoad() {
        console.log('Hello track-edit Page');
    }

}
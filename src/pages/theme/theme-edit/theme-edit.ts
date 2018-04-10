import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ActionSheetController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';

import {Events} from 'ionic-angular';
import {ImageService} from "../../../providers/ImageService";
import {HttpService} from "../../../providers/HttpService";
import {UploaderService} from "../../../providers/UploaderService";
import {FileUploader} from "ng2-file-upload";
import {StorageService} from "../../../providers/StorageService";
import {ThemeService} from "../../../providers/ThemeService";
import {HomePage} from "../../home/home";

@Component({
    selector: 'page-track-edit',
    templateUrl: 'theme-edit.html',
    providers: [ThemeService]
})
export class ThemeEditPage {
    public selectedImgUrl = null;

    public uploader: FileUploader;

    themeEditForm: any;

    constructor(public navCtrl: NavController,
                public events: Events,
                public navParams: NavParams,
                public themeService: ThemeService,
                public actionSheetCtrl: ActionSheetController,
                private popoverCtrl: PopoverController,
                private formBuilder: FormBuilder,
                private imageService: ImageService,
                private httpService: HttpService,
                private uploaderService: UploaderService,
                private storageService: StorageService) {
        this.uploader = new FileUploader({
            url: "/git/MY/ionic/back/time-track/index.php/core/UploadController/uploadTrackImg?token=" + this.storageService.read<string>('token'),
            method: "POST",
            itemAlias: "track_img"
        });
        var themeId = navParams.get('themeId');
        this.themeEditForm = this.formBuilder.group({
            themeId: [themeId],
            themeName: [''],
            sort: ['']
        });
        if (themeId == null) {
            this.themeEditForm = this.formBuilder.group({
                themeId: [''],
                themeName: [''],
                sort: ['']
            });
        } else {
            this.getThemeInfo(themeId);
        }
        console.log(this.themeEditForm)
    }

    selectedFileOnChanged(event) {
        let self = this;
        this.uploader.queue[0].onSuccess = function (response, status, headers) {
            // 上传文件成功
            if (status == 200) {
                var obj = JSON.parse(response);
                if (obj.code == 'OK') {
                    //上传成功
                    console.log(self.selectedImgUrl);
                    self.selectedImgUrl = '/git/MY/ionic/back/time-track/' + obj.data[0].mini_img_url;
                    // document.querySelector('#preview1').innerHTML = obj.data[0].img_url;
                } else {
                    //上传失败
                    alert('请重新登录');
                }
            } else {
                alert("上传错误");
            }
        };
        this.uploader.queue[0].upload(); // 开始上传
        this.uploader = new FileUploader({
            url: "/git/MY/ionic/back/time-track/index.php/core/UploadController/uploadTrackImg?token=" + this.storageService.read<string>('token'),
            method: "POST",
            itemAlias: "track_img"
        });
    }

    removeImg() {
        this.selectedImgUrl = null;
    }

    getThemeInfo(themeId: any) {
        this.themeService.themeInfo(themeId).then(data => {
            if (typeof(data) == 'object' && typeof(data.code) == 'string' && data.code == 'OK') {
                console.log(data.data);
                this.themeEditForm = this.formBuilder.group({
                    themeId: [data.data.theme_id],
                    themeName: [data.data.theme_name],
                    sort: [data.data.sort]
                });
                this.selectedImgUrl = data.data.theme_icon_url;
            } else {
                alert('系统错误.');
            }
        });
    }

    saveThemeInfo(themeInfo) {
        if (this.selectedImgUrl != null) {
            themeInfo.themeIconUrl = this.selectedImgUrl;
        }
        this.themeService.editThemeInfo(themeInfo).then(data => {
            if (typeof(data) == 'object' && typeof(data.code) == 'string') {
                if (data.code == 'OK') {
                    themeInfo.themeId = data.data.theme_id;
                    this.events.publish('theme:created', themeInfo);
                    this.navCtrl.popTo(HomePage);
                } else {
                    alert(data.data);
                }
            } else {
                alert('请先登录');
            }
        });
    }

    ionViewDidLoad() {
        console.log('Hello theme-edit Page');
    }

}
import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {UserInfoService} from "./../../providers/UserInfoService";
import {StorageService} from "./../../providers/StorageService";

import {MyinfoPage} from '../myinfo/myinfo';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [UserInfoService]
})
export class LoginPage {

    local: Storage;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                public toastCtrl: ToastController,
                private userInfoService: UserInfoService,
                private storageService: StorageService) {
    }

    loginForm = this.formBuilder.group({
        //'LoginID': ['admin@163.com', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.]*)((@[a-zA-Z0-9_.]*)\.([a-zA-Z]{2}|[a-zA-Z]{3}))$')]],// 第一个参数是默认值
        'phone': ['18817573163', [Validators.required, Validators.minLength(11)]],// 第一个参数是默认值
        'password': ['123456', [Validators.required, Validators.minLength(4)]]
    });

    ionViewDidLoad() {
        console.log('Hello Login Page');
    }

    login(user, _event) {
        var body = {phone: user.phone, password: user.password};
        _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
        this.userInfoService.login(body).then(data => {
            if (typeof(data) == 'object' && typeof(data.code) == 'string' && data.code == 'OK') {
                this.storageService.write('token', data.data.token);
                //测试写缓存
                let ss = this.storageService.read('token');
                //传参
                this.navCtrl.push(MyinfoPage, {token: data.data.token});
            } else {
                alert('用户名或密码错误.');
            }
            // if (typeof(data.token) == 'string')//登录成功
            // {
            //     console.log(1);
            //     console.log(data);
            //     this.storageService.write('UserInfo', data.token);
            //     //测试写缓存
            //     //let ss = this.storageService.read<UserInfoData>('UserInfo');
            //     //console.log(ss.UserToken);
            //     //传参
            //     this.navCtrl.push(MyinfoPage, { item: data.token });
            // }
            // else {
            //     console.log(2);
            //     let toast = this.toastCtrl.create({
            //         message: '用户名或密码错误.',
            //         duration: 3000,
            //         position: 'middle',
            //         showCloseButton: true,
            //         closeButtonText: '关闭'
            //     });
            //     toast.present();
            // }
        });
    }

}

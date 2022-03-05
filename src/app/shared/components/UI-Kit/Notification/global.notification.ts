import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'global-notify-info',
    styleUrls: ['./global.notification.scss'],
    template: `
        <div class="danger"><strong>Info:</strong> {{loadingStatus}}</div>
    `
})

export class GlogbalNotification implements OnInit{
    loadingStatus:string = 'Student Application System is currently under maintenance, Please try again tomorrow...';
    ngOnInit(){
    }
}
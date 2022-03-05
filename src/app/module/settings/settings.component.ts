
import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-setting-component',
    template: `
    
        <div>
            <router-outlet></router-outlet>
        </div>
    `
})
export class SettingsComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}
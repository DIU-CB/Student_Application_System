import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-protocol-process',
    template: `
        <div>
            <router-outlet></router-outlet>
        </div>
    `
})
export class ProcessProtocolsComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}
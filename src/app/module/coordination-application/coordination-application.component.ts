import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router } from "@angular/router";
import { LoadedRouterConfig } from "@angular/router/src/config";

@Component({
    template: `
    
    <div>
        <router-outlet></router-outlet>
    </div>

    `
})

export class CoordiantionApplicationComponent implements OnInit{
    pageTitle: string = 'Application Create';
    constructor(){}

    ngOnInit(){
        
    }
}

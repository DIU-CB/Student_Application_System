import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: 'app-process-protocol-details',
    templateUrl: './process-protocol-details.component.html'
})
export class ProcessProtocolDetailsComponent implements OnInit{
    @Input() detailsData;
    constructor(){}
    ngOnInit(){
    }
}
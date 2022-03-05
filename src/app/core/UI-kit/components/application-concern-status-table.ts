import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: 'app-application-concern-status-table',
    template: `
        <table class="table">
            <thead>
                <th>To</th>
                <th>App. Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Comment/Remarks</th>
            </thead>
            <tbody>
                <tr [ngClass]="{hide: item.applicationConcernType.id == 1 }" *ngFor="let item of dataSource; let i = index;">
                    <td>{{item?.concernedEmployee?.name}}</td>
                    <td>{{item?.applicationConcernType?.name}}</td>
                    <td>{{item?.applicationStatus?.name}}</td>
                    <td>{{item?.updatedOn | date: 'dd-MMM-yyyy' }}</td>
                    <td>{{item?.remarks}}</td>
                </tr>
            </tbody>
        </table>
    `
})
export class ApplicationConcernStatusTableComponent implements OnInit{
    @Input()dataSource:any;
    constructor(){}
    ngOnInit(){
    }
}


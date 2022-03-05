import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent extends ListComponent implements OnInit {

  ngOnInit() {
    this.Search({
      applicationStatusId: "",
      applicationTypeId: "",
      campusId: "",
      pageNumber: 1,
      pageSize: 10,
      programId: "",
      semesterId: "",
      shiftId: ""
    })
  }

  Search(_item){
    this.enableLoader = true;
    _item.pageSize = this.pageSize;
    this.subscribe$.add(
      this.aqService.GetPendingWithXPaging(_item)
        .subscribe(this.Success, (err)=>{
            this.enableLoader = true;
        })
    )
        this.searchOpen = false;
  }

}

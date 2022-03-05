import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IXPagination } from './IxPagination';



@Component({
  selector: 'app-x-pagination',
  templateUrl: './x-pagination.component.html',
  styleUrls: ['./x-pagination.component.scss']
})
export class XPaginationComponent implements OnInit {
  @Input() dataSource:IXPagination;
  @Output() pageSuccess = new EventEmitter()
  private loaderDisabled:boolean = true;
  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
  }

  private Success = (res) => {
    // debugger
    //setTimeout(() => {
      this.pageSuccess.emit(res);
      this.loaderDisabled = true;
    //}, 1000);
  }

 
  Next(){
    if (this.dataSource.NextPageLink) {
      return this.Navigation(this.dataSource.NextPageLink)
      .subscribe(this.Success)
    }
    
  }

  Prev(){
    if (this.dataSource.PreviousPageLink) {
      return this.Navigation(this.dataSource.PreviousPageLink)
      .subscribe(this.Success)  
    }
    
  }

  Navigation(url:string){
    this.loaderDisabled = false;
    return this._httpClient.get<HttpResponse<Object>>(url, { observe: 'response'}).pipe(
      tap((res)=>{
        return res;
      })
    );
  }

  Range(){
    // debugger
    let from = 1;
    let to = 0;
    if (this.dataSource) {
      to = this.dataSource.TotalCount < this.dataSource.PageSize ? this.dataSource.TotalCount : this.dataSource.PageSize;
      if (this.dataSource.CurrentPage != 1) {
        from = (this.dataSource.PageSize) * (this.dataSource.CurrentPage - 1) + 1

        if (this.dataSource.CurrentPage == this.dataSource.TotalPages) {
          to = from + (this.dataSource.TotalCount - from);
        } else {
          to = this.dataSource.PageSize * this.dataSource.CurrentPage;
        }
      }

    }
    return {
      from: from,
      to: to
    }
  }

}

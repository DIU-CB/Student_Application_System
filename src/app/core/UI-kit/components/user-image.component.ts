import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../serviceModule/service.config';

@Component({
  selector: 'app-user-image',
  template: `
  <div>
      <img class="image-circle" 
      src="{{GetSuccess(userId)}}" onerror=" this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2wn18dnC8OmX7Qx49epjgoHREUBHEviB10griBGemOmkYQoK5g' " />
    
  </div>
  `,
  styles: [`
    .image-circle {
      border-radius: 50%;
      width: 100%;
      box-shadow: 0px 1px 5px #000;
    }
  `]
  
  , providers: [ServerConfig]
})
export class UserImageComponent  {
  @Input()userId:string;
  constructor(private apiCdn: ServerConfig){}
  

  GetSuccess(_Id){
    let img = `${this.apiCdn.imageUrl}Documents/${_Id}/Photo/${_Id}.jpg`;
    // debugger
    return img;
  }

}

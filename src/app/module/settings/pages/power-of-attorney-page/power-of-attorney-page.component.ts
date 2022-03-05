import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PowerOfAttorneyService } from 'src/app/core/authentication/Services/powerOfAttorney.service';
import { ApplicationAuthQueryService } from 'src/app/core/authentication/Services/applications.Query.service';
import { PopNotificationService } from 'src/app/shared/service/pop.notification';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/service/unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-power-of-attorney-page',
  templateUrl: './power-of-attorney-page.component.html',
  styleUrls: ['./power-of-attorney-page.component.scss'],
  providers: [PowerOfAttorneyService]
})
export class PowerOfAttorneyPageComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  poaForm: FormGroup;
  applicationList: any = [];
  poaList: any = [];
  constructor(
    public fb: FormBuilder
    , public poaServie: PowerOfAttorneyService
    , public appServie: ApplicationAuthQueryService
    , public notify: PopNotificationService
    ) { super() }

  ngOnInit() {
    
    this.InitFormAndList()

    this.subscribe$.add(
      this.appServie.Get()
      .subscribe(res=>{
        this.applicationList = res;
      })
    )
  }


  InitFormAndList(){
    this.poaForm = this.fb.group({
      applicationId: new FormControl('4b0bbab5-5c12-4f24-84b5-004c33d79a90'),
      // powerOfAttorneyFromUserId: new FormControl(),
      // powerOfAttorneyFromUser: new FormControl(),
      userId: new FormControl(),
      user: new FormControl()
    })
    this.GetList();
  }

  GetList(){
    this.subscribe$.add(
      this.poaServie.GetPowerOfAttorneysTo()
      .subscribe(res=>{
        this.poaList = res;
      })
    )
  }

  Submit(){
    this.subscribe$.add(
      this.poaServie.Save(this.poaForm.value)
      .subscribe(res=>{
        this.notify.Success();
        this.InitFormAndList();
      }, (err)=>{
        this.notify.Error();
      })
    )
  }

  DeletePerson(_item){
    let obj = {
      applicationId: _item.application.id,
      userId: _item.powerOfAttorneyToUser.id
    }
    debugger
    const isDel = confirm('do you want to delete')
    if(isDel){
      this.subscribe$.add(
        this.poaServie.Delete(obj)
      .subscribe(res=>{
        this.notify.Success();
        this.GetList();
      }, (err)=>{
        this.notify.Error();
      })
      )
    }
    
  }
}

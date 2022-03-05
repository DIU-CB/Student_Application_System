import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  constructor() { }

  GetDefault():any{
    return {
      logo: null
      , name: 'DIU Student Application System'
      , shortName: 'DIU-SAS'
      , sidenav: {
        left: {
          //opened: true,
          slideStyle: 'side'//available: over, side, push
        }
        , right: {
          opened: false,
          slideStyle: 'over'//available: over, side, push
        }
      }
    }
  }

}

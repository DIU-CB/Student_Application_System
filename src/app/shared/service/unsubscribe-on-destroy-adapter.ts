import { SubSink } from "subsink";
import { OnDestroy } from "@angular/core";

export class UnsubscribeOnDestroyAdapter implements OnDestroy {
    /**The subscription sink object that stores all subscriptions */
    subscribe$ = new SubSink();
    /**
    * The lifecycle hook that unsubscribes all subscriptions 
    * when the component / object gets destroyed
    */
   
    ngOnDestroy(): void {
       this.subscribe$.unsubscribe();
    }
}

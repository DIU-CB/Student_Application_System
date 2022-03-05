import { FormGroup, FormArray, FormBuilder } from "@angular/forms";

export class ComplexForm{
    formGroup: FormGroup;
    formSubArray: string;

    constructor(private formbuilder: FormBuilder){}

    addItem(_formGroup:FormGroup):void{
        let mainControl = this.formGroup;
        let control = <FormArray>mainControl.controls[this.formSubArray]
        control.push(this.formbuilder.group(_formGroup));
    }

    onItemDeleted(index) {
        let control = <FormArray>this.formGroup.controls.purchaseOrderSub
        control.removeAt(index);
      }
}
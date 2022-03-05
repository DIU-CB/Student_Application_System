import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable()

export class PopNotificationService{
    
    constructor(private snackBar: MatSnackBar) {}

    config:MatSnackBarConfig<any> = {
        duration: 2000,
        horizontalPosition: 'left'
    }

    Success(msg?:string) {
        this.config.panelClass = ['success-snackbar']
        this.snackBar.open(msg || 'Success!!', '', this.config);
    }

    Open(message: string) {
        this.snackBar.open(message, '', this.config);
    }

    Error(msg?:string) {
        this.config.duration = 5000;
        this.config.panelClass = ['error-snackbar']
        this.snackBar.open(msg || 'Error!!', '', this.config);
    }
    
}
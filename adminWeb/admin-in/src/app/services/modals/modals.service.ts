import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  dialogConfig = new MatDialogConfig();
  constructor(
    public dialogRef:MatDialog,
    ) {
    //this.dialogConfig.panelClass=["clases-modal"]
    this.dialogConfig.width="40%"
    this.dialogConfig.height="81%"
    this.dialogConfig.panelClass="custom-container"
    this.dialogConfig.position = {
      'right': '0',
      'bottom':'0'
  };
    this.dialogConfig.disableClose = false
    this.dialogConfig.autoFocus = true;
   }


  
   getDialogConfig(){
    return this.dialogConfig
   }

  getDialogRef(){
    return this.dialogRef
   }
  
   async closeAllModals(){
      await this.dialogRef.closeAll()
   }
}

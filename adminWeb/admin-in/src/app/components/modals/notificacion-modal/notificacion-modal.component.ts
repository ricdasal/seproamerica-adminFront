import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalsService } from 'src/app/services/modals/modals.service';

@Component({
  selector: 'app-notificacion-modal',
  templateUrl: './notificacion-modal.component.html',
  styleUrls: ['./notificacion-modal.component.css']
})
export class NotificacionModalComponent implements OnInit {

  

  constructor(
    @Inject(MAT_DIALOG_DATA) public notificacion: any,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    
    let initializer = 0;
    // if(!this.dialogRef){
    //   this.onClickNO()
    // }
    
    

  }

  onClickNO(): void{
    this.dialogRef.close();
    }

}

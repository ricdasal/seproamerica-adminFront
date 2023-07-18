import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css']
})
export class MensajeConfirmacionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    let initializer = 0;
  }

  onClickNO(): void{
    this.dialogRef.close();
    
  }

}

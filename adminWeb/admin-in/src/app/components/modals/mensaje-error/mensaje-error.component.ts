import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.css']
})
export class MensajeErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public error: any,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    let initializar = 0;
    console.log(this.error)
  }

  onClickNo(){
    this.dialogRef.close();
  }

}

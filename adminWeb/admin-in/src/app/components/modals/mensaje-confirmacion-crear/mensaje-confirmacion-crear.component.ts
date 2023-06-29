import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion-crear',
  templateUrl: './mensaje-confirmacion-crear.component.html',
  styleUrls: ['./mensaje-confirmacion-crear.component.css']
})
export class MensajeConfirmacionCrearComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    let initializer = 0;
  }

}

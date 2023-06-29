import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion-eliminar',
  templateUrl: './mensaje-confirmacion-eliminar.component.html',
  styleUrls: ['./mensaje-confirmacion-eliminar.component.css']
})
export class MensajeConfirmacionEliminarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    let initializer
  }

}

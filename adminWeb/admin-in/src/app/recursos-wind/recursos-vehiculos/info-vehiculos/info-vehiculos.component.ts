import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-vehiculos',
  templateUrl: './info-vehiculos.component.html',
  styleUrls: ['./info-vehiculos.component.css']
})
export class InfoVehiculosComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public vehiculo: any
  ) { }

  ngOnInit(): void {
    let initializer = 0;
  }

}

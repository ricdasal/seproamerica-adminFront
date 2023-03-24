import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-cuenta',
  templateUrl: './info-cuenta.component.html',
  styleUrls: ['./info-cuenta.component.css']
})
export class InfoCuentaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public cuentaTelefono: any
  ) { }

  ngOnInit(): void {
  }

}

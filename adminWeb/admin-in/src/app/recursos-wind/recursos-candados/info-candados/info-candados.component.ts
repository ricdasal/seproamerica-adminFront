import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-candados',
  templateUrl: './info-candados.component.html',
  styleUrls: ['./info-candados.component.css']
})
export class InfoCandadosComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public candado: any
  ) { }

  ngOnInit(): void {
  }

}

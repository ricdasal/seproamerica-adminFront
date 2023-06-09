import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-clientes',
  templateUrl: './info-clientes.component.html',
  styleUrls: ['./info-clientes.component.css']
})
export class InfoClientesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: any
  ) { }

  ngOnInit(): void {
    const temp: number = 0
  }



}

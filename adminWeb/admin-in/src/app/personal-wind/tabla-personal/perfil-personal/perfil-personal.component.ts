import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-personal',
  templateUrl: './perfil-personal.component.html',
  styleUrls: ['./perfil-personal.component.css']
})
export class PerfilPersonalComponent implements OnInit {

  personal: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.personal = this.data
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-celular',
  templateUrl: './info-celular.component.html',
  styleUrls: ['./info-celular.component.css']
})
export class InfoCelularComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public celular: any
  ) { }

  ngOnInit(): void {
  }

}

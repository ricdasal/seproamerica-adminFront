import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-armas',
  templateUrl: './info-armas.component.html',
  styleUrls: ['./info-armas.component.css']
})
export class InfoArmasComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public arma: any
  ) { }

  ngOnInit(): void {
    console.log(this.arma)
  }

}

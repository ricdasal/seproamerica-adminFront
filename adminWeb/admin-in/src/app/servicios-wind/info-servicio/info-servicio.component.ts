import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-servicio',
  templateUrl: './info-servicio.component.html',
  styleUrls: ['./info-servicio.component.css']
})
export class InfoServicioComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public servicio: any
  ) { }

  info_servicio!: any;
  staff_group!: Array<any>;
  equipment_group!: Array<any>;

  ngOnInit(): void {
    console.log(this.servicio)

    this.formato_info_servicio();
  }


  formato_info_servicio(){

    this.info_servicio = {
      name: this.servicio.name,
      description: this.servicio.description,
      set_price: this.servicio.set_price,
      staff_group: new Array<any>,
      equipment_group: new Array<any>,
      requires_origin_and_destination: this.servicio.requires_origin_and_destination,
      base_price: this.servicio.base_price,
      price_range1: this.servicio.price_range1,
      price_range2: this.servicio.price_range2,
      price_range3:this.servicio.price_range3,
      lower_limit1: this.servicio.lower_limit1,
      upper_limit1: this.servicio.upper_limit1,
      lower_limit2: this.servicio.lower_limit2,
      upper_limit2: this.servicio.upper_limit2,
      lower_limit3: this.servicio.lower_limit3,
      upper_limit3: this.servicio.upper_limit3,   
    }

    for (let i = 0; i < this.servicio.staff.length; i++){

      console.log(this.servicio.staff)
      let staff = {
        staff:this.servicio.staff[i],
        staff_is_optional: this.servicio.staff_is_optional[i],
        staff_number_is_optional: this.servicio.staff_number_is_optional[i],
        staff_price_per_hour: this.servicio.staff_price_per_hour[i],
        staff_base_hours: this.servicio.staff_base_hours[i],
        
      }

      this.info_servicio.staff_group.push(staff);

    }

    for (let i = 0; i < this.servicio.equipment.length; i++){
      let equipment = {
        equipment:  this.servicio.equipment[i],
        equipment_is_optional:  this.servicio.equipment_is_optional[i],
        equipment_number_is_optional:  this.servicio.equipment_number_is_optional[i],
        equipment_price:  this.servicio.equipment_price[i],
  
      }

      this.info_servicio.equipment_group.push(equipment);

    }

    console.log(this.info_servicio)


  }

  

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {

  lista_opciones: Array<any> = [
    {title: 'Usuarios registrados', url: '../../../assets/Iconos/app-sepro-vectores-ma╠üs-usuario.png'},
    {title: 'Personal registrado', url: '../../../assets/Iconos/app-sepro-vectores-evento.png'},
    {title: 'Valores generados', url: '../../../assets/Iconos/app-sepro-vectores-sumar.png'},
    {title: 'Calificacion del personal', url: '../../../assets/img/calificacion2.png'},
    {title: 'Recontrataciones de personal', url: '../../../assets/img/recontrataciones_rojo.png'},
    {title: 'Servicio', url: '../../../assets/img/servicios_rojo.png'},
    
    
    
  ]

  constructor() { }

  ngOnInit(): void {
    let initializer;
  }


}

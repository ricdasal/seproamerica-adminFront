import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { MapWindComponent } from '../../servicio-en-curso/map-wind/map-wind.component';

@Component({
  selector: 'app-servicio-aceptado',
  templateUrl: './servicio-aceptado.component.html',
  styleUrls: ['./servicio-aceptado.component.css']
})

//Detalle del servicio aceptado

export class ServicioAceptadoComponent implements OnInit {

  pedido_asignado: any = {}
  datosCargados: boolean = false;
  nombre_servicio: any = {}

  constructor(
    private clienteWAservice: ClienteWAService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let initializer;
    this.obtenerInformaacionPedido()
  }

  obtenerInformaacionPedido(){
    this.clienteWAservice.obtenerPedidosPorId(localStorage.getItem("pedido_seleccionado"))
    .subscribe({
      next: (pedido: any) => {
        console.log(pedido)
        this.pedido_asignado = pedido;
        this.datosCargados = true;
      }
    })
  }

  abrirUbicacion(){
    this.clienteWAservice.obtenerPedidosPorId(this.pedido_asignado.id)
    .subscribe({
      next: (pedido: any) => {
        console.log(pedido)
        this.dialog.open(MapWindComponent, {
          width: '100vh',
          height: '80vh',
          data: pedido
        })

      }
    })
  }


  obtenerPersonal(id: any): any {
    let bandera =  false
    let personal_retorno = {};
    this.clienteWAservice.obtener_personalOp_especifico(id)
    .subscribe({
      next: (personal: any) => {
        console.log(personal);
        personal_retorno = personal


      }
    })
    if(bandera){
      return personal_retorno
    }
    
  }
  


}

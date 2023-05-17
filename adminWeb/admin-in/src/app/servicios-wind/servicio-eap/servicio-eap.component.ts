import { Component, OnInit } from '@angular/core';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-servicio-eap',
  templateUrl: './servicio-eap.component.html',
  styleUrls: ['./servicio-eap.component.css']
})
export class ServicioEapComponent implements OnInit {

  selectedValue: string | undefined;

  //Lista cedulas en string
  lista_cedulas: string[] = []

  tipos_pedidos: Array<any> = ['Todos los pedidos', 'Pedidos pagados', 'Pedidos aceptados', 'Pedidos Eliminados','Pedidos Finalizados', 'Pedidos Reembolsado']

  //cedula
  cedula_cliente_analizar: string | String = ""

  lista_pedidos_asignar: Array<any> = [];



  lista_pedidos_en_proceso: Array<any> = []
  columnas: string[] = ['Id','Fecha de solicitud','Fecha de servicio','Solicitante', 'Dni del solictante', 'Servicio','Opciones'];

  constructor(
    private clienteWAService: ClienteWAService,
  ) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosEAP()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
      }
    })

    this.obtenerPedidosFinalizados();
    this.obtenerPedidosReembolsados();
  }

  obtenerPedidosEliminados(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosEliminados()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
        
      }
    })
  }

  obtenerPedidosAceptados(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosAceptados()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
        
      }
    })

  }

  obtenerPedidosPagados(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosPagados()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
        
      }
    })

  }

  obtenerPedidosFinalizados(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosFinalizado()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
        
      }
    })

  }

  obtenerPedidosReembolsados(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosReembolsado()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
        
      }
    })

  }

  filtroPedidos(){
    if(this.selectedValue == 'Todos los pedidos'){
      this.obtenerPedidos();
    }
    else if(this.selectedValue == 'Pedidos Eliminados'){
      this.obtenerPedidosEliminados();
    }
    else if(this.selectedValue == 'Pedidos pagados'){
      this.obtenerPedidosPagados();
    }
    else if(this.selectedValue == 'Pedidos aceptados'){
      this.obtenerPedidosAceptados();
    }
    else if(this.selectedValue == 'Pedidos Finalizados'){
      this.obtenerPedidosFinalizados()

    }
    else if(this.selectedValue == 'Pedidos Reembolsado'){
      this.obtenerPedidosReembolsados()
      
    }
    
  }

  encontrar_pedido_especifico(id: any){
    localStorage.setItem("pedido_seleccionado", id);

  }


}

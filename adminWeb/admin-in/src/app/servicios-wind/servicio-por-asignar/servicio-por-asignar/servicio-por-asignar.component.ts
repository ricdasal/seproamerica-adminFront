import { Component, OnInit } from '@angular/core';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { PedidoModel } from 'src/app/models/pedido.model';
import { Router } from '@angular/router';
import { ComunicarComponentesService } from 'src/app/services/comunicar-componentes.service';

@Component({
  selector: 'app-servicio-por-asignar',
  templateUrl: './servicio-por-asignar.component.html',
  styleUrls: ['./servicio-por-asignar.component.css']
})
export class ServicioPorAsignarComponent implements OnInit {

  //Lista de pedidos
  lista_pedidos?: PedidoModel[];
  selectedValue: string | undefined;

  //Lista cedulas en string
  lista_cedulas: string[] = []

  tipos_pedidos: Array<any> = ['Todos los pedidos', 'Pedidos pagados', 'Pedidos aceptados', 'Pedidos Pendientes', 'Pedidos Eliminados']

  //cedula
  cedula_cliente_analizar: string | String = ""

  lista_pedidos_asignar: Array<any> = [];



  lista_pedidos_en_proceso: Array<any> = []
  columnas: string[] = ['Id','Fecha de solicitud','Fecha de servicio','Solicitante', 'Dni del solictante', 'Servicio','Opciones'];

  constructor(
    private clienteWAService: ClienteWAService,
    private router: Router,
    private comunicacion: ComunicarComponentesService
    ) { }

  ngOnInit(): void {
    //this.obtener_Pedidos_Request()
    this.obtenerPedidos()

  }

  obtenerPedidos(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosEAP()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
      }
    })

    this.clienteWAService.obtenerPedidosPendientes()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
      }
    })

    
    
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

  obtenerPedidosPendientes(){
    this.lista_pedidos_asignar = [];
    this.clienteWAService.obtenerPedidosPendientes()
    .subscribe({
      next: (data: any) => {
        this.lista_pedidos_asignar = this.lista_pedidos_asignar.concat(data);
        
      }
    })

  }

  detallesServicio(id: any) {
    
  }

  //Obtener pedidos desde un request
  obtener_Pedidos_Request(): void{
    this.clienteWAService.obtener_Pedidos()
    .subscribe({
      next: (data) => {
        this.lista_pedidos = data;
        console.log(data);

        //formateando date de solicitud
        for(let pedido of this.lista_pedidos!){
          this.obtener_cliente(pedido.cliente_solicitante)
          console.log("cedula temporal")
          console.log(this.cedula_cliente_analizar)
          //console.log(pedido.fecha_Solicitud.toString().slice(0, 10))
          console.log(pedido.fecha_Solicitud)
          console.log(pedido.fecha_Solicitud.toLocaleString().slice(0, 10))
          pedido.fecha_Solicitud = pedido.fecha_Solicitud.toLocaleString().slice(0, 10) + " " + pedido.fecha_Solicitud.toLocaleString().slice(11, 19)
        }
      },
      error: (e) => console.error(e)
    });

  }

  obtener_cliente(id: number | Number){
    this.clienteWAService.obtener_cliente_tabla_cliente(id)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.lista_cedulas.push(data.cedula.toString())
          console.log(this.lista_cedulas)
          this.cedula_cliente_analizar = data.cedula
        },
        error: (e) => console.log(e)
    });

  }

  encontrar_pedido_especifico(id: any){
    localStorage.setItem("pedido_seleccionado", id);

  }

  encontrar_cliente_tabla_usuarios(cedula: string){
    this.clienteWAService.obtener_cliente_tabla_usuario(cedula)
    .subscribe({
      next: (data) => {
        console.log(data)

      }
    })
  }


  //['Todos los pedidos', 'Pedidos pagados', 'Pedidos aceptados', 'Pedidos Pendientes', 'Pedidos Eliminados']
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
    else if(this.selectedValue == 'Pedidos Pendientes'){
      this.obtenerPedidosPendientes();
    }
  }


}

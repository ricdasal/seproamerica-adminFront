import { Component, OnInit } from '@angular/core';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { PedidoModel } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-servicio-por-asignar',
  templateUrl: './servicio-por-asignar.component.html',
  styleUrls: ['./servicio-por-asignar.component.css']
})
export class ServicioPorAsignarComponent implements OnInit {

  //Lista de pedidos
  lista_pedidos?: PedidoModel[];

  //Lista cedulas en string
  lista_cedulas: string[] = []

  //cedula
  cedula_cliente_analizar: string | String = ""

  constructor(private clienteWAService: ClienteWAService) { }

  ngOnInit(): void {
    this.obtener_Pedidos_Request()
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

  encontrar_pedido_especifico(id: Number){
    for(let pedido of this.lista_pedidos!){
      if(pedido.idPedido == id){
        console.log("El pedido seleccionado es: ")
        console.log(pedido)
        localStorage.setItem("pedido_seleccionado", JSON.stringify(pedido))
      }
    }

  }

  encontrar_cliente_tabla_usuarios(cedula: string){
    this.clienteWAService.obtener_cliente_tabla_usuario(cedula)
    .subscribe({
      next: (data) => {
        console.log(data)

      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-servicio-en-curso',
  templateUrl: './servicio-en-curso.component.html',
  styleUrls: ['./servicio-en-curso.component.css']
})
export class ServicioEnCursoComponent implements OnInit {

  constructor(
    private clienteWAservice: ClienteWAService
  ) { }

  /**
   * client_dni: "0917398563"
​​
client_first_name: "Leonardo"
​​
client_last_name: "Pincay Jaramillo"
​​
date_request: "2023-04-13"
​​
id: 3
​
service_name: "Chofer seguro"
​​
start_date: "2023-04-13"
​​
start_time: "19:48:00
​​
status: "en proceso"
   */

  lista_pedidos_en_proceso: Array<any> = []
  columnas: string[] = ['Id','Nombre','Apellidos','Servicio', 'Fecha de inicio', 'Hora de inicio','Opciones'];

  ngOnInit(): void {
    this.obtenerPedidosEnCurso()
  }

  obtenerPedidosEnCurso(){
    this.clienteWAservice.obtenerPedidosEnProceso()
    .subscribe({
      next: (pedidos: any) => {
        console.log(pedidos)
        this.lista_pedidos_en_proceso = this.lista_pedidos_en_proceso.concat(pedidos);

      }
    })


  }

}

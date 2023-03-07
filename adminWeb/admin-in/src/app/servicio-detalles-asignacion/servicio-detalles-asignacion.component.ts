import { Component, OnInit } from '@angular/core';
import { PedidoModel } from '../models/pedido.model';
import { PersonalOpModel } from '../models/personalOp.models';
import { VehiculoModel } from '../models/vehiculo.model';
import { ClienteWAService } from '../services/cliente-wa.service';
import {MatSelectModule} from '@angular/material/select';
import { CandadoModel } from '../models/candado.model';
import { ArmamentoModel } from '../models/armamento.model';
import { MobilModel } from '../models/mobil.model';
import { DATE_PIPE_DEFAULT_TIMEZONE, Time } from "@angular/common";


@Component({
  selector: 'app-servicio-detalles-asignacion',
  templateUrl: './servicio-detalles-asignacion.component.html',
  styleUrls: ['./servicio-detalles-asignacion.component.css']
})
export class ServicioDetallesAsignacionComponent implements OnInit {

  actualizado!:boolean | null

  pedido_a_asignar: PedidoModel = new PedidoModel();

  lista_personalOp?: PersonalOpModel[]

  lista_guardias: PersonalOpModel[] = []
  lista_guardaespaldas: PersonalOpModel[] = [];
  lista_conductor: PersonalOpModel[] = [];
  lista_motorizado: PersonalOpModel[] = [];

  lista_vehiculos: VehiculoModel[] = [];
  lista_candados: CandadoModel[] = [];
  lista_armamentos: ArmamentoModel[] = [];
  lista_moviles: MobilModel[] = [];

  lider_elegido: PersonalOpModel = new PersonalOpModel();

  detalles_asignados: string = "";

  guardias_escogidos: PersonalOpModel[] = [];
  guardaespaldas_escogidos: PersonalOpModel[] = [];
  conductores_escogidos: PersonalOpModel[] = [];
  motorizados_escogidos: PersonalOpModel[] = [];
  vehiculos_escogidos: VehiculoModel[] = [];
  candados_escogidos: CandadoModel[] = [];
  armamentos_escogidos: ArmamentoModel[] = [];
  moviles_escogidos: MobilModel[] = [];

  hora = {
    hours: 0,
    minutes: 0
  }

  //Variable que se usa para presentar los datos actualizados del pedido
  pedido_actualizar: PedidoModel = {
    idPedido: 0,
    nombre_Servicio: "",
    costo: 0,
    fecha_Solicitud: new Date(),
    fecha_Finalizacion: new Date(),
    fecha_Inicio: new Date(),
    hora_Inicio: this.hora,
    hora_Finalizacion: this.hora,
    latitud_Origen: 0,
    longitud_Origen: 0,
    latitud_Destino: 0,
    longitud_Destino: 0,
    cantidad_Empleados_Asignados: 0,
    cantidad_vehiculos: 0,
    detalle: "",
    estado: 0,
    metodo_Pago: 0,
    idServicio: 0,
    administrador_Encargado: 0,
    cliente_solicitante: 0
  }


  constructor(private clienteWAservice: ClienteWAService) { }

  ngOnInit(): void {
    this.presentar_detalles_pedido()
    this.obtener_todo_personalOp()
    this.obtener_todo_vehiculo()
    this.obtener_todo_candado()
    this.obtener_todo_armamento()
    this.obtener_todo_movil()
    console.log("Lista de guardia")
    console.log(this.lista_guardias)
    console.log("Lista de guardaespaldas")
    console.log(this.lista_guardaespaldas)
    console.log("Lista de conductores")
    console.log(this.lista_conductor)
    console.log("Lista de motorizados")
    console.log(this.lista_motorizado)
  }

  presentar_detalles_pedido(){
    let info_pedido = JSON.parse(localStorage.getItem('pedido_seleccionado')!)
    this.pedido_a_asignar.idPedido = info_pedido.idPedido
    this.pedido_a_asignar.nombre_Servicio = info_pedido.nombre_Servicio
    this.pedido_a_asignar.costo = info_pedido.costo
    this.pedido_a_asignar.fecha_Solicitud = info_pedido.fecha_Solicitud.toLocaleString().slice(0, 10) + " " + info_pedido.fecha_Solicitud.toLocaleString().slice(11, 19)
    this.pedido_a_asignar.fecha_Finalizacion = info_pedido.fecha_Finalizacion
    this.pedido_a_asignar.fecha_Inicio = info_pedido.fecha_Inicio
    this.pedido_a_asignar.hora_Inicio = info_pedido.hora_Inicio
    this.pedido_a_asignar.hora_Finalizacion = info_pedido.hora_Finalizacion
    this.pedido_a_asignar.latitud_Origen = info_pedido.latitud_Origen
    this.pedido_a_asignar.longitud_Origen = info_pedido.longitud_Origen 
    this.pedido_a_asignar.latitud_Destino = info_pedido.latitud_Destino
    this.pedido_a_asignar.longitud_Destino = info_pedido.longitud_Destino
    this.pedido_a_asignar.cantidad_Empleados_Asignados = info_pedido.cantidad_Empleados_Asignados
    this.pedido_a_asignar.cantidad_vehiculos = info_pedido.cantidad_vehiculos
    this.pedido_a_asignar.detalle = info_pedido.detalle 
    this.pedido_a_asignar.estado = info_pedido.estado
    this.pedido_a_asignar.metodo_Pago = info_pedido.metodo_Pago
    this.pedido_a_asignar.idServicio = info_pedido.idServicio
    this.pedido_a_asignar.administrador_Encargado = info_pedido.administrador_Encargado
    this.pedido_a_asignar.cliente_solicitante = info_pedido.cliente_solicitante

    let ar = this.pedido_a_asignar.detalle.split('|')
    console.log("Aqui empieza el split")
    console.log(ar)
    let lider = ar[0].toString()
    let guardias = ar[1]
    let guardaespaldas = ar[2]
    let conductores = ar[3]
    let motorizados = ar[4]
    let vehiculos = ar[5]
    let candados = ar[6]
    let armamento = ar[7]
    let movil = ar[8]

    console.log("Se ha asignado movil?")
    console.log(movil)

    let elem = document.getElementById("detalles")
    if(elem?.innerHTML != undefined && movil != undefined){
      elem.innerHTML = `
        <br>
        <p>${lider}</p>
        <p>${guardias}</p>
        <p>${guardaespaldas}</p>
        <p>${conductores}</p>
        <p>${motorizados}</p>
        <p>${vehiculos}</p>
        <p>${candados}</p>
        <p>${armamento}</p>
        <p>${movil}</p>

      `
    }else {
      elem!.innerHTML = `
        <h3>Porfavor seleccione al equipo y armamento para el pedido</h3>
      `
    }
  }

  presentar_detalles_asignados(){
    /*alert(
      "Lider elegido: " + this.lider_elegido.nombres + "\n"
      + "Guardias asignados: " + this.guardias_escogidos + "\n"
      + "Guardaespaldas asignados: " + this.guardaespaldas_escogidos + "\n"
      + "conductores asignados: " + this.conductores_escogidos + "\n"
      + "motorizados asignados: " + this.motorizados_escogidos + "\n"
      + "vehiculos asignados: " + this.vehiculos_escogidos + "\n"
      + "candados asignados: " + this.candados_escogidos + "\n"
      + "armamento asignado: " + this.armamentos_escogidos + "\n"
      + "movil asignado: " + this.moviles_escogidos + "\n"
    )*/

    let detalles = 
    "Lider elegido: " + this.lider_elegido.nombres + "|"
    + "Guardias asignados: " + this.guardias_escogidos + "|"
    + "Guardaespaldas asignados: " + this.guardaespaldas_escogidos + "|"
    + "conductores asignados: " + this.conductores_escogidos + "|"
    + "motorizados asignados: " + this.motorizados_escogidos + "|"
    + "vehiculos asignados: " + this.vehiculos_escogidos + "|"
    + "candados asignados: " + this.candados_escogidos + "|"
    + "armamento asignado: " + this.armamentos_escogidos + "|"
    + "movil asignado: " + this.moviles_escogidos + "|"

    //console.log(this.detalles_asignados)
    console.log("moviles")
    console.log(this.moviles_escogidos)
    console.log("Estos son los detalles")
    console.log(detalles)
    return detalles

  }

  //Funncion para actualizar los detalles del pedido
  actualizar_pedido(): void {
    const info_pedido_actualizar = {
      idPedido: this.pedido_a_asignar.idPedido,
      nombre_Servicio: this.pedido_a_asignar.nombre_Servicio,
      costo: this.pedido_a_asignar.costo,
      fecha_Solicitud: this.pedido_a_asignar.fecha_Solicitud,
      fecha_Finalizacion: this.pedido_a_asignar.fecha_Finalizacion,
      fecha_Inicio: this.pedido_a_asignar.fecha_Inicio,
      hora_Inicio: this.pedido_a_asignar.hora_Inicio,
      hora_Finalizacion: this.pedido_a_asignar.hora_Finalizacion,
      latitud_Origen: this.pedido_a_asignar.latitud_Origen,
      longitud_Origen: this.pedido_a_asignar.longitud_Origen,
      latitud_Destino: this.pedido_a_asignar.latitud_Destino,
      longitud_Destino: this.pedido_a_asignar.longitud_Destino,
      cantidad_Empleados_Asignados: this.pedido_a_asignar.cantidad_Empleados_Asignados,
      cantidad_vehiculos: this.pedido_a_asignar.cantidad_vehiculos,
      detalle: this.presentar_detalles_asignados(),
      //Se indica el dos porque ahora el pedidio cambia de estar "en espera" a "activo"
      estado: 1,
      metodo_Pago: this.pedido_a_asignar.metodo_Pago,
      idServicio: this.pedido_a_asignar.idServicio,
      //Aqui hay que poner el id del administrador que lo cambia a activo
      administrador_Encargado: this.pedido_a_asignar.administrador_Encargado,
      cliente_solicitante: this.pedido_a_asignar.cliente_solicitante
    }
    console.log("Info a actualizar")
    console.log(info_pedido_actualizar)
    this.clienteWAservice.actualizar_pedido(this.pedido_a_asignar.idPedido, info_pedido_actualizar)
    .subscribe({
      next: (res) => {
        console.log("Se ha actualizado el pedido")
        this.pedido_a_asignar.costo = res.costo
        this.pedido_a_asignar.fecha_Solicitud = res.fecha_Solicitud
        this.pedido_a_asignar.fecha_Finalizacion = res.fecha_Finalizacion
        this.pedido_a_asignar.fecha_Inicio = res.fecha_Inicio
        this.pedido_a_asignar.hora_Inicio = res.hora_Inicio
        this.pedido_a_asignar.hora_Finalizacion = res.hora_Finalizacion
        this.pedido_a_asignar.latitud_Origen = res.latitud_Origen
        this.pedido_a_asignar.longitud_Origen = res.longitud_Origen
        this.pedido_a_asignar.latitud_Destino = res.latitud_Destino
        this.pedido_a_asignar.longitud_Destino = res.longitud_Destino
        this.pedido_a_asignar.cantidad_Empleados_Asignados = res.cantidad_Empleados_Asignados
        this.pedido_a_asignar.cantidad_vehiculos = res.cantidad_vehiculos
        this.pedido_a_asignar.detalle = res.detalle
        this.pedido_a_asignar.estado = res.estado
        this.pedido_a_asignar.metodo_Pago = res.metodo_Pago
        this.pedido_a_asignar.idServicio= res.idServicio
        this.pedido_a_asignar.administrador_Encargado = res.administrador_Encargado
        this.pedido_a_asignar.cliente_solicitante = res.cliente_solicitante

        this.actualizado = true

        localStorage.setItem('pedido_seleccionado', JSON.stringify(res))

        window.location.reload()
        
      },
      error: (e) => {
        this.actualizado = false
        console.log(e)
      }
    });

  }

  obtener_todo_personalOp(){
    this.clienteWAservice.obtener_personalOp()
    .subscribe({
      next: (data) => {
        this.lista_personalOp = data;
        console.log(data)
        this.division_cargos()
      },
      error: (e) => console.error(e)
    })
  }

  //Metodo para obtener todos los vehiculos
  obtener_todo_vehiculo(){
    this.clienteWAservice.obtener_vehiculos()
    .subscribe({
      next: (data) => {
        this.lista_vehiculos = data;
        console.log(data)
      },
      error: (e) => console.error(e)
    });
  }

  //Metodo para obtener los candados
  obtener_todo_candado(){
    this.clienteWAservice.obtener_candados()
    .subscribe({
      next: (data) => {
        this.lista_candados = data;
      },
      error: (e) => console.error(e)
    });
  }

  //Metodo para obtener el armamento
  obtener_todo_armamento(){
    this.clienteWAservice.obtener_armamentos()
    .subscribe({
      next: (data) => {
        this.lista_armamentos = data;
      },
      error: (e) => console.error(e)
    });
  }

  //Meotodo para obtener moviles
  obtener_todo_movil(){
    this.clienteWAservice.obtener_mobiles()
    .subscribe({
      next: (data) => {
        this.lista_moviles = data;
      },
      error: (e) => console.error(e)
    });
  }

  division_cargos(){
    console.log("Funcion division cargos")
    this.lista_personalOp?.forEach( (personal) => {
      console.log(personal)
      let valores_cargo_trabajo = personal.cargo_trabajo.split("=>")[1]
      let arreglo_cargos = valores_cargo_trabajo.split('|')
      for(let indice in arreglo_cargos){
        //console.log(arreglo_cargos[indice].replaceAll(' ',''))
        arreglo_cargos[indice] = arreglo_cargos[indice].replaceAll(' ','')
        if(arreglo_cargos[indice] == "guardia"){
          this.lista_guardias.push(personal)
        }else if(arreglo_cargos[indice] == "guardaespaldas"){
          this.lista_guardaespaldas.push(personal)
        }else if(arreglo_cargos[indice] == "conductor"){
          this.lista_conductor.push(personal)
        }else if(arreglo_cargos[indice] == "motorizado"){
          this.lista_motorizado.push(personal)
        }
        
      }
    })
    console.log("Fin funcion division cargos")

  }

  imprimir_lider(){
    console.log(this.lider_elegido)
  }


}

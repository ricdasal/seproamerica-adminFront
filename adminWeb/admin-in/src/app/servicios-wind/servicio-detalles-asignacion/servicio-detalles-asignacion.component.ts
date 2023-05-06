import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PedidoModel } from '../../models/pedido.model';
import { PersonalOpModel } from '../../models/personalOp.models';
import { VehiculoModel } from '../../models/vehiculo.model';
import { ClienteWAService } from '../../services/cliente-wa.service';
import {MatSelectModule} from '@angular/material/select';
import { CandadoModel } from '../../models/candado.model';
import { ArmamentoModel } from '../../models/armamento.model';
import { MobilModel } from '../../models/mobil.model';
import { DATE_PIPE_DEFAULT_TIMEZONE, Time } from "@angular/common";
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RegistroComponent } from 'src/app/registro/registro.component';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunicarComponentesService } from 'src/app/services/comunicar-componentes.service';
import { maximoElementosValidator } from 'src/app/personal-wind/funciones-utiles';


@Component({
  selector: 'app-servicio-detalles-asignacion',
  templateUrl: './servicio-detalles-asignacion.component.html',
  styleUrls: ['./servicio-detalles-asignacion.component.css']
})
export class ServicioDetallesAsignacionComponent implements OnInit, AfterViewInit {

  actualizado!:boolean | null

  // pedido_a_asignar: PedidoModel = new PedidoModel();

  lista_personalOp: Array<any> = [];

  lista_guardias: Array<any> = []
  lista_guardaespaldas: Array<any> = [];
  lista_conductor: Array<any> = [];
  lista_motorizado: Array<any> = [];


  

  lista_vehiculos: Array<any> = [];
  lista_candados: Array<any> = [];
  lista_armamentos: Array<any> = [];
  lista_moviles:Array<any> = [];
  lista_cuentas_temp: Array<any> = [];
  lista_cuentas: Array<any> = [];

  lista_estados: Array<any> = ['pendiente', 'aceptado', 'pagado', 'en proceso', 'eliminado']
  
  lista_staff_object: Array<any> = []
  
  lista_equipment_object: Array<any> = []

  lider_elegido!: any
  cuenta_asignada!: any
  costo!: any;
  nombre_servicio: any = {} ;
  nombre_cliente: any = {};

  detalles_asignados: string = "";

  guardias_escogidos: Array<any> = [];
  guardaespaldas_escogidos: Array<any> = [];
  conductores_escogidos: Array<any> = [];
  motorizados_escogidos:Array<any> = [];
  vehiculos_escogidos: Array<any> = [];
  candados_escogidos: Array<any> = [];
  armamentos_escogidos: Array<any> = [];
  moviles_escogidos: Array<any> = [];

  hora = {
    hours: 0,
    minutes: 0
  }

  //Variable que se usa para presentar los datos actualizados del pedido
  pedido_a_asignar: any = {
    idPedido: 0,
    fecha_Solicitud: new Date(),
    fecha_Inicio: new Date(),
    hora_Inicio: this.hora,
    fecha_Finalizacion: new Date(),
    hora_Finalizacion: this.hora,
    duracion: this.hora,
    costo: 0,
    metodo_Pago: 0,
    estado: 0,
    latitud_Origen: 0,
    longitud_Origen: 0,
    latitud_Destino: 0,
    longitud_Destino: 0,
    cliente_solicitante: 0,
    idServicio: 0,
    cuenta_telefono: 0,
    staff: new Array<any>,
    staff_is_optional: new Array<any>,
    staff_number_is_optional: new Array<any>,
    staff_selected: new Array<any>,
    cantidad_Empleados_Asignados: new Array<any>,
    equipment: new Array<any>,
    equipment_id_optional: new Array<any>,
    equipment_number_id_optional: new Array<any>,
    equipment_selected: new Array<any>,
    equipment_number: new Array<any>,
    nombre_Servicio: "",
    administrador_Encargado: 0,
    
  }

  cantidadEmpleadosRequeridos= 0;
  registerForm!: FormGroup;

  guardiasBool: Boolean = false;
  guardaespaldasBool: Boolean = false;
  conductorBool: Boolean = false;
  motorizadosBool: Boolean = false;

  vehiculosBool: Boolean = false;
  candadosBool: Boolean = false;
  armamentoBool: Boolean = false;

  costoBoolean: Boolean = false;

  info_pedido!: any;
  asigned_staff!: FormGroup;
  asigned_equipment!: FormGroup;

  datos_cargados: Boolean = false;
  data: any;


  constructor(
    private clienteWAservice: ClienteWAService,
    private router: Router,
    private comunicador: ComunicarComponentesService
    ) {

     }

  ngOnInit(): void {


    this.registerForm = new FormGroup({
      start_date:  new FormControl(null),
      start_time: new FormControl(null),
      end_date: new FormControl(null),
      end_time: new FormControl(null),
      duration: new FormControl(null),
      total: new FormControl(null),
      payment_method: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      origin_lat: new FormControl(null),
      origin_lng: new FormControl(null),
      destination_lat: new FormControl(null),
      destination_lng: new FormControl(null),
      phone_account: new FormControl('', [Validators.required]),
      staff_selected: new FormControl(null),
      staff_number: new FormControl(null),
      equipment_selected: new FormControl(null),
      equipment_number: new FormControl(null),
      assigned_staff: new FormArray([], [Validators.required]),
      staff_leader: new FormControl('', [Validators.required]),
      assigned_equipment: new FormControl([], [Validators.required])

    })

    
    this.presentar_detalles_pedido();

    this.asigned_staff = new FormGroup({
      guardias: new FormControl([]),
      conductores: new FormControl([]),
      motorizados: new FormControl([]),
      guardaespaldas: new FormArray([])
    })

    this.asigned_equipment = new FormGroup({
      vehiculos: new FormControl([]),
      candados: new FormControl([]),
      armamentos: new FormControl([]),
      movil: new FormControl('')
    })


    this.obtenerNumeroPersonal()
    this.obtener_todo_personalOp()
    this.obtener_todo_vehiculo()
    this.obtener_todo_candado()
    this.obtener_todo_armamento()
    this.obtener_todo_movil()
    this.obtener_todo_cuentas()
  }


  ngAfterViewInit(){


  }

  verLista_guardias(){
    console.log(this.guardias_escogidos)
    console.log(this.data);
  }


  presentar_detalles_pedido(){
    this.clienteWAservice.obtenerPedidosPorId(localStorage.getItem("pedido_seleccionado"))
    .subscribe({
      next: (info_pedido: any) =>{
        console.log(info_pedido)
        this.pedido_a_asignar.idPedido = info_pedido.id;
        // this.pedido_a_asignar.nombre_Servicio = info_pedido.nombre_Servicio
        this.pedido_a_asignar.costo = info_pedido.total;
        this.pedido_a_asignar.fecha_Solicitud = info_pedido.date_request;
        this.pedido_a_asignar.fecha_Finalizacion = info_pedido.end_date;
        this.pedido_a_asignar.fecha_Inicio = info_pedido.start_date;
        this.pedido_a_asignar.hora_Inicio = info_pedido.start_time;
        this.pedido_a_asignar.hora_Finalizacion = info_pedido.end_time;
        this.pedido_a_asignar.duracion = info_pedido.duration
        this.pedido_a_asignar.costo = info_pedido.total
        this.pedido_a_asignar.latitud_Origen = info_pedido.origin_lat;
        this.pedido_a_asignar.longitud_Origen = info_pedido.origin_lng; 
        this.pedido_a_asignar.latitud_Destino = info_pedido.destination_lat;
        this.pedido_a_asignar.longitud_Destino = info_pedido.destination_lng;
        this.pedido_a_asignar.cantidad_Empleados_Asignados = this.pedido_a_asignar.cantidad_Empleados_Asignados.concat(info_pedido.staff_number)
        this.pedido_a_asignar.staff_selected = this.pedido_a_asignar.staff_selected.concat(info_pedido.staff_selected)
        this.pedido_a_asignar.equipment_selected = this.pedido_a_asignar.equipment_selected.concat(info_pedido.equipment_selected)
        this.pedido_a_asignar.equipment_number = this.pedido_a_asignar.equipment_number.concat(info_pedido.equipment_number)
        // this.pedido_a_asignar.cantidad_vehiculos = info_pedido.cantidad_vehiculos
        this.pedido_a_asignar.detalle = info_pedido.detalle 
        this.pedido_a_asignar.estado = info_pedido.status;
        this.pedido_a_asignar.metodo_Pago = info_pedido.payment_method;
        this.pedido_a_asignar.idServicio = info_pedido.service;
        // this.pedido_a_asignar.administrador_Encargado = info_pedido.administrador_Encargado
        this.pedido_a_asignar.cliente_solicitante = info_pedido.client;
        this.pedido_a_asignar.staff = this.pedido_a_asignar.staff.concat(info_pedido.staff);
        this.pedido_a_asignar.equipment = this.pedido_a_asignar.equipment.concat(info_pedido.equipment);
  
        for(let i in this.pedido_a_asignar.cantidad_Empleados_Asignados){
          console.log(this.pedido_a_asignar.cantidad_Empleados_Asignados[i])
          this.cantidadEmpleadosRequeridos = this.cantidadEmpleadosRequeridos +  Number(this.pedido_a_asignar.cantidad_Empleados_Asignados[i]);
        }
  
        this.ocultarCampos();  
        this.registerForm.patchValue({
          start_date:  info_pedido.start_date,
          start_time: info_pedido.start_time,
          end_date: info_pedido.end_date,
          end_time: info_pedido.end_time,
          duration:info_pedido.duration,
          total: info_pedido.total,
          payment_method: info_pedido.payment_method,
          status: info_pedido.status,
          origin_lat: info_pedido.origin_lat,
          origin_lng: info_pedido.origin_lng,
          destination_lat: info_pedido.destination_lat,
          destination_lng: info_pedido.destination_lng,
          staff_selected: info_pedido.staff_selected,
          staff_number: info_pedido.staff_number,
          equipment_selected: info_pedido.equipment_selected,
          equipment_number: info_pedido.equipment_number,
      
          
        })
        

        this.armarStaffObject();
        this. armarEquipmentObject();
        this.obtenerNombreServicio(info_pedido.service);
        this.obtenerNombreCliente(info_pedido.client);

        this.datos_cargados = true;

      }      
    })
  }

  armarStaffObject(){
    for(let index in this.pedido_a_asignar.staff){
      let staff = {
        nombre: this.pedido_a_asignar.staff[index],
        cantidad: this.pedido_a_asignar.cantidad_Empleados_Asignados[index]
      }
      this.lista_staff_object.push(staff);

    }
  }

  armarEquipmentObject(){
    for(let index in this.pedido_a_asignar.equipment){
      let equipment = {
        nombre: this.pedido_a_asignar.equipment[index],
        cantidad: this.pedido_a_asignar.equipment_number[index]
      }

      this.lista_equipment_object.push(equipment);
    }
  }

  obtenerNumeroPersonal(){
    for(let i in this.pedido_a_asignar.cantidad_Empleados_Asignados){
      this.cantidadEmpleadosRequeridos += Number(i);
    } 
    console.log(this.pedido_a_asignar.cantidad_Empleados_Asignados);
  }

  obtenerNombreServicio(id: any){
    this.clienteWAservice.obtenerServicioPorId(id)
    .subscribe({
      next: (data: any) => {
        this.nombre_servicio = data;
      }
    })
  }

  obtenerNombreCliente(id: any){
    this.clienteWAservice.obtenerClientePorID(id)
    .subscribe({
      next: (data: any) => {
        this.nombre_cliente =  data;

      }
    })
  }

  imprimirFormulario(){
    let lista = this.registerForm.value.assigned_staff
    if(this.asigned_staff.value.guardias.length != 0){
      for(let personal of this.asigned_staff.value.guardias){
        this.registerForm.value.assigned_staff.push(personal.split(';')[0])
      }
    }

    if(this.asigned_staff.value.conductores.length != 0){
      for(let personal of this.asigned_staff.value.conductores){
        this.registerForm.value.assigned_staff.push(personal.split(';')[0])
      }

    }

    if(this.asigned_staff.value.motorizados.length != 0){
      for(let personal of this.asigned_staff.value.motorizados){
        this.registerForm.value.assigned_staff.push(personal.split(';')[0])
      }

    }

    if(this.asigned_staff.value.guardaespaldas.length != 0){
      for(let personal of this.asigned_staff.value.guardaespaldas){
        this.registerForm.value.assigned_staff.push(personal.split(';')[0])
      }
      
    }

    if(this.asigned_equipment.value.vehiculos.length != 0){
      for(let equipamento of this.asigned_equipment.value.vehiculos){
        this.registerForm.value.assigned_equipment.push(equipamento.split(';')[0]);
      }
    }
    if(this.asigned_equipment.value.candados.length != 0){
      for(let equipamento of this.asigned_equipment.value.candados){
        this.registerForm.value.assigned_equipment.push(equipamento.split(';')[0]);
      }
    }
    if(this.asigned_equipment.value.armamentos.length != 0){
      for(let equipamento of this.asigned_equipment.value.armamentos){
        this.registerForm.value.assigned_equipment.push(equipamento.split(';')[0]);
      }
    }

    if(this.asigned_equipment.value.movil != ''){
      this.registerForm.value.assigned_equipment.push(this.asigned_equipment.value.movil.split(';')[0]);
    }

    let temp_leader = this.registerForm.value.staff_leader;
    this.registerForm.value.staff_leader = temp_leader.split(';')[0];

    let temp_account =  this.registerForm.value.phone_account
    this.registerForm.value.phone_account = temp_account.split(';')[0]

    console.log(this.registerForm.value)
    this.clienteWAservice.actualizarPedido(this.registerForm ,this.pedido_a_asignar.idPedido)
    .subscribe({
      next: (data:any) =>{
        console.log(data);
      }
    })
    

    
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
      next: (data: any) => {
        this.lista_personalOp = this.lista_personalOp.concat(data);
        this.division_cargos()
      },
      error: (e) => console.error(e)
    })
  }

  division_cargos(){

    this.lista_personalOp?.forEach( (personal: any) => {
      

      if(personal.charge == 'guardia'){
        this.lista_guardias.push(personal);
      }
      else if(personal.charge == 'guardaespaldas'){
        this.lista_guardaespaldas.push(personal);
      }
      else if(personal.charge == 'chofer'){
        this.lista_conductor.push(personal);
      }
      else if(personal.charge == 'motorizado'){
        this.lista_motorizado.push(personal);
      }


    })
    console.log(this.lista_motorizado)

  }
 
  obtener_todo_vehiculo(){
    this.clienteWAservice.obtener_vehiculos()
    .subscribe({
      next: (data: any) => {
        // console.log(data)
        this.lista_vehiculos = this.lista_vehiculos.concat(data);
      },
      error: (e) => console.error(e)
    });
  }

  //Metodo para obtener los candados
  obtener_todo_candado(){
    this.clienteWAservice.obtener_candados()
    .subscribe({
      next: (data: any) => {
        // console.log(data)
        this.lista_candados =  this.lista_candados.concat(data);
      },
      error: (e) => console.error(e)
    });
  }

  //Metodo para obtener el armamento
  obtener_todo_armamento(){
    this.clienteWAservice.obtener_armamentos()
    .subscribe({
      next: (data: any) => {
        this.lista_armamentos = this.lista_armamentos.concat(data);
      },
      error: (e) => console.error(e)
    });
  }

  //Meotodo para obtener moviles
  obtener_todo_movil(){
    this.clienteWAservice.obtener_mobiles()
    .subscribe({
      next: (data: any) => {
        this.lista_moviles = this.lista_moviles.concat(data);
      },
      error: (e) => console.error(e)
    });
  }

  obtener_todo_cuentas(){
    this.clienteWAservice.obtener_cuentas()
    .subscribe({
      next: (data: any) =>{
        this.lista_cuentas_temp =  this.lista_cuentas_temp.concat(data)
        this.lista_cuentas_temp.forEach((cuentas) =>{
          if(cuentas.is_active){
            this.lista_cuentas.push(cuentas)
          }

        })

      }
    })
  }

  ocultarCampos(){
    this.pedido_a_asignar.staff.forEach((staff : any) => {
      if(staff == 'guardia'){
        this.guardiasBool = true;
        
      }
      else if (staff == 'chofer'){
        this.conductorBool = true;
        

      }
      else if(staff  == 'motorizado'){
        this.motorizadosBool = true;
      }
      else if (staff == 'guardaespaldas' ){
        this.guardaespaldasBool = true;
        
      }
    })

    this.pedido_a_asignar.equipment.forEach((equipment: any) => {
      if(equipment == 'vehículo'){
        this.vehiculosBool = true;
        
      }
      else if(equipment == 'armamento'){
        this.armamentoBool = true;

      }
      else if(equipment == 'candado satelital'){
        this.candadosBool = true;
      }
    })

    if(this.pedido_a_asignar.costo == 0){
      this.costoBoolean = true;
    }

  }

  

  imprimir_lider(){
    console.log(this.lider_elegido)
  }

  concatenarListas(): Array<any>{
    let lista: Array<any> = [];

    lista =  lista.concat(this.asigned_staff.value.guardias);
    lista = lista.concat(this.asigned_staff.value.guardaespaldas);
    lista = lista.concat(this.asigned_staff.value.motorizados);
    lista = lista.concat(this.asigned_staff.value.conductores);

    return lista;

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

    // let detalles = 
    // "Lider elegido: " + this.lider_elegido.nombres + "|"
    // + "Guardias asignados: " + this.guardias_escogidos + "|"
    // + "Guardaespaldas asignados: " + this.guardaespaldas_escogidos + "|"
    // + "conductores asignados: " + this.conductores_escogidos + "|"
    // + "motorizados asignados: " + this.motorizados_escogidos + "|"
    // + "vehiculos asignados: " + this.vehiculos_escogidos + "|"
    // + "candados asignados: " + this.candados_escogidos + "|"
    // + "armamento asignado: " + this.armamentos_escogidos + "|"
    // + "movil asignado: " + this.moviles_escogidos + "|"

    // //console.log(this.detalles_asignados)
    // console.log("moviles")
    // console.log(this.moviles_escogidos)
    // console.log("Estos son los detalles")
    // console.log(detalles)
    // return detalles

  }



}




// let info_pedido = JSON.parse(localStorage.getItem('pedido_seleccionado')!)
    // this.pedido_a_asignar.idPedido = info_pedido.idPedido
    // this.pedido_a_asignar.nombre_Servicio = info_pedido.nombre_Servicio
    // this.pedido_a_asignar.costo = info_pedido.costo
    // this.pedido_a_asignar.fecha_Solicitud = info_pedido.fecha_Solicitud.toLocaleString().slice(0, 10) + " " + info_pedido.fecha_Solicitud.toLocaleString().slice(11, 19)
    // this.pedido_a_asignar.fecha_Finalizacion = info_pedido.fecha_Finalizacion
    // this.pedido_a_asignar.fecha_Inicio = info_pedido.fecha_Inicio
    // this.pedido_a_asignar.hora_Inicio = info_pedido.hora_Inicio
    // this.pedido_a_asignar.hora_Finalizacion = info_pedido.hora_Finalizacion
    // this.pedido_a_asignar.latitud_Origen = info_pedido.latitud_Origen
    // this.pedido_a_asignar.longitud_Origen = info_pedido.longitud_Origen 
    // this.pedido_a_asignar.latitud_Destino = info_pedido.latitud_Destino
    // this.pedido_a_asignar.longitud_Destino = info_pedido.longitud_Destino
    // this.pedido_a_asignar.cantidad_Empleados_Asignados = info_pedido.cantidad_Empleados_Asignados
    // this.pedido_a_asignar.cantidad_vehiculos = info_pedido.cantidad_vehiculos
    // this.pedido_a_asignar.detalle = info_pedido.detalle 
    // this.pedido_a_asignar.estado = info_pedido.estado
    // this.pedido_a_asignar.metodo_Pago = info_pedido.metodo_Pago
    // this.pedido_a_asignar.idServicio = info_pedido.idServicio
    // this.pedido_a_asignar.administrador_Encargado = info_pedido.administrador_Encargado
    // this.pedido_a_asignar.cliente_solicitante = info_pedido.cliente_solicitante

    // let ar = this.pedido_a_asignar.detalle.split('|')
    // console.log("Aqui empieza el split")
    // console.log(ar)
    // let lider = ar[0].toString()
    // let guardias = ar[1]
    // let guardaespaldas = ar[2]
    // let conductores = ar[3]
    // let motorizados = ar[4]
    // let vehiculos = ar[5]
    // let candados = ar[6]
    // let armamento = ar[7]
    // let movil = ar[8]

    // console.log("Se ha asignado movil?")
    // console.log(movil)

    // let elem = document.getElementById("detalles")
    // if(elem?.innerHTML != undefined && movil != undefined){
    //   elem.innerHTML = `
    //     <br>
    //     <p>${lider}</p>
    //     <p>${guardias}</p>
    //     <p>${guardaespaldas}</p>
    //     <p>${conductores}</p>
    //     <p>${motorizados}</p>
    //     <p>${vehiculos}</p>
    //     <p>${candados}</p>
    //     <p>${armamento}</p>
    //     <p>${movil}</p>

    //   `
    // }else {
    //   elem!.innerHTML = `
    //     <h3>Porfavor seleccione al equipo y armamento para el pedido</h3>
    //   `
    // }
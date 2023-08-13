import { AfterViewInit, Component, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ClienteWAService } from '../../services/cliente-wa.service';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunicarComponentesService } from 'src/app/services/comunicar-componentes.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapWindComponent } from '../servicio-en-curso/map-wind/map-wind.component';
import { MensajeConfirmacionComponent } from 'src/app/components/modals/mensaje-confirmacion/mensaje-confirmacion.component';


@Component({
  selector: 'app-servicio-detalles-asignacion',
  templateUrl: './servicio-detalles-asignacion.component.html',
  styleUrls: ['./servicio-detalles-asignacion.component.css']
})
export class ServicioDetallesAsignacionComponent implements OnInit, OnChanges {

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
    distancia_en_km: 0,
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

  cantidad_guardias = 0;
  cantidad_conductores = 0;
  cantidad_guardaespaldas = 0;
  cantidad_motorizados = 0;

  cantidad_vehiculos = 0;
  cantidad_candados = 0;
  cantidad_armamentos = 0;


  boton_deshabilitado_guardia: boolean = false;
  boton_deshabilitado_conductor: boolean = false;
  boton_deshabilitado_guardaespalda: boolean = false;
  boton_deshabilitado_motorizado: boolean = false;

  boton_deshabilitado_empleado_lider: boolean = true;
  boton_deshabilitado_vehiculo: boolean = false;
  boton_deshabilitado_candados: boolean = false;
  boton_deshabilitado_armamento: boolean = false;
  boton_deshabilitado_movil: boolean = true;
  boton_deshabilitado_cuenta_asignada: boolean = true;
  boton_deshabilitado_estado: boolean = true ;

/*
console.log(boton_deshabilitado_guardia)
console.log(boton_deshabilitado_conductor)
console.log(boton_deshabilitado_guardaespalda)
console.log(boton_deshabilitado_motorizado)
console.log(boton_deshabilitado_empleado_lider)
console.log(boton_deshabilitado_vehiculo)
console.log(boton_deshabilitado_candados)
console.log(boton_deshabilitado_armamento)
console.log(boton_deshabilitado_movil)
console.log(boton_deshabilitado_cuenta_asignada)
console.log(boton_deshabilitado_estado)
console.log(--------------------------------------------)
*/ 
  






  constructor(
    private clienteWAservice: ClienteWAService,
    private router: Router,
    private comunicador: ComunicarComponentesService,
    public dialog: MatDialog
    ) {

     }

  ngOnInit(): void {

/** */
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
      guardaespaldas: new FormControl([]),
    })

    this.asigned_equipment = new FormGroup({
      vehiculos: new FormControl([]),
      candados: new FormControl([]),
      armamentos: new FormControl([]),
      movil: new FormControl('')
    })



    this.obtener_todo_personalOp()
    this.obtener_todo_vehiculo()
    this.obtener_todo_candado()
    this.obtener_todo_armamento()
    this.obtener_todo_movil()
    this.obtener_todo_cuentas()
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  controlButtonGuardia(event: any){
  

    if (this.asigned_staff.value.guardias.length == this.cantidad_guardias) {
      this.boton_deshabilitado_guardia = false;
    }
    else{
      this.boton_deshabilitado_guardia = true;
    }
    
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")

  }

  controlButtonGuardaespalda(event: any){
    if (this.asigned_staff.value.guardaespaldas.length == this.cantidad_guardaespaldas) {
      this.boton_deshabilitado_guardaespalda = false;
    }
    else{
      this.boton_deshabilitado_guardaespalda = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")

  }

  controlButtonConductor(event: any){
    if (this.asigned_staff.value.conductores.length == this.cantidad_conductores) {
      this.boton_deshabilitado_conductor = false;
    }
    else{
      this.boton_deshabilitado_conductor = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")
    

  }

  controlButtonMotorizado(event: any){
    if (this.asigned_staff.value.motorizados.length == this.cantidad_motorizados) {
      this.boton_deshabilitado_motorizado = false;
    }
    else{
      this.boton_deshabilitado_motorizado = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")

  }


  controlButtonEmpleadoLider(event: any){
    if(this.registerForm.value.staff_leader != null){
      this.boton_deshabilitado_empleado_lider = false;
    }
    else{
      this.boton_deshabilitado_empleado_lider = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")

  }

  controlButtonVehiculos(event: any){
    if(this.asigned_equipment.value.vehiculos.length == this.cantidad_vehiculos){
      this.boton_deshabilitado_vehiculo = false;
    }
    else{
      this.boton_deshabilitado_vehiculo = true;

    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")

  }
  controlButtonCandados(event: any){
    if(this.asigned_equipment.value.candados.length == this.cantidad_candados){
      this.boton_deshabilitado_candados = false;
    }
    else{
      this.boton_deshabilitado_candados = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")
  }
  controlButtonArmamento(event: any){
    if(this.asigned_equipment.value.armamentos.length == this.cantidad_armamentos){
      this.boton_deshabilitado_armamento = false;
    }
    else{
      this.boton_deshabilitado_armamento = true;

    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")
  }
  controlButtonMovil(event: any){
    if(this.asigned_equipment.value.movil != null){
      this.boton_deshabilitado_movil = false;
    }
    else{
      this.boton_deshabilitado_movil = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")

  }

  controlButtonControlCuenta(event: any){
    if(this.registerForm.value.phone_account != null){
      this.boton_deshabilitado_cuenta_asignada = false;
    }
    else{
      this.boton_deshabilitado_cuenta_asignada = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")
  }

  controlButtonStatus(event: any){
    if(this.registerForm.value.status != null){
      this.boton_deshabilitado_estado = false;
    }
    else{
      this.boton_deshabilitado_estado = true;
    }
    console.log(this.boton_deshabilitado_guardia)
    console.log(this.boton_deshabilitado_conductor)
    console.log(this.boton_deshabilitado_guardaespalda)
    console.log(this.boton_deshabilitado_motorizado)
    console.log(this.boton_deshabilitado_empleado_lider)
    console.log(this.boton_deshabilitado_vehiculo)
    console.log(this.boton_deshabilitado_candados)
    console.log(this.boton_deshabilitado_armamento)
    console.log(this.boton_deshabilitado_movil)
    console.log(this.boton_deshabilitado_cuenta_asignada)
    console.log(this.boton_deshabilitado_estado)
    console.log("--------------------------------------------")
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
        this.pedido_a_asignar.distancia_en_km = info_pedido.km_distance;
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

        for(let i in info_pedido.staff){
          console.log(info_pedido.staff[i])
          if(info_pedido.staff[i] == 'guardia'){
            this.cantidad_guardias = info_pedido.staff_number[i];
            this.boton_deshabilitado_guardia = true

          }
          if(info_pedido.staff[i] == 'chofer'){
            this.cantidad_conductores = info_pedido.staff_number[i];
            this.boton_deshabilitado_conductor = true;
          }

          if(info_pedido.staff[i] == 'chofer guardaespaldas'){
            this.cantidad_guardaespaldas = info_pedido.staff_number[i];
            this.boton_deshabilitado_guardaespalda = true;
          }

          if(info_pedido.staff[i] == 'motorizado'){
            this.cantidad_motorizados = info_pedido.staff_number[i];
            this.boton_deshabilitado_motorizado = true;
          }

        }


        for(let i in info_pedido.equipment){
          console.log(info_pedido.equipment[i])
          if(info_pedido.equipment[i] == 'vehículo'){
            this.cantidad_vehiculos = info_pedido.equipment_number[i]
            this.boton_deshabilitado_vehiculo = true;
          }
          if(info_pedido.equipment[i] == 'armamento'){
            this.cantidad_armamentos = info_pedido.equipment_number[i];
            this.boton_deshabilitado_armamento = true;
          }
          if(info_pedido.equipment[i] == 'candado satelital'){
            this.cantidad_candados = info_pedido.equipment_number[i];
            this.boton_deshabilitado_candados = true;
          }
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

        //lista_estados: Array<any> = ['pendiente', 'aceptado', 'pagado', 'en proceso', 'eliminado']
        //this.pedido_a_asignar.estado

        if(this.pedido_a_asignar.estado == 'pendiente'){
          this.lista_estados = ['aceptado', 'eliminado'];
        }
        else if(this.pedido_a_asignar.estado == 'pagado'){
          this.lista_estados = ['reembolsado']
        }
        else{
          this.lista_estados = ['eliminado'];
        }

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
    console.log(this.registerForm.value)
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
    console.log(temp_account);
    this.registerForm.value.phone_account = null;
    this.registerForm.value.phone_account = temp_account.split(';')[0]
    console.log( this.registerForm.value.phone_account)

    console.log(this.registerForm.value)

    
    
    this.clienteWAservice.actualizarPedido(this.registerForm, this.pedido_a_asignar.idPedido)
    .subscribe({
      next: (data:any) =>{
        console.log(data);
   
        this.dialog.open(MensajeConfirmacionComponent, {
          width: '70vh',
          height: '50vh',
          data: 'Pedido'
          
        })
        this.router.navigate(['serviciosVentana/serviciosPorAsignar']);

        
      }
      
    })  

    
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
      else if(personal.charge == 'chofer guardaespaldas'){
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
      else if (staff == 'chofer guardaespaldas' ){
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

  

  abrirUbicacion(){
    this.clienteWAservice.obtenerPedidosPorId(this.pedido_a_asignar.idPedido)
    .subscribe({
      next: (pedido: any) => {
        console.log(pedido)
        const ventanaGrupos =  this.dialog.open(MapWindComponent, {
          width: '100vh',
          height: '80vh',
          data: pedido
        })

      }
    })
  }

  enviarNotificacionAlCliente(){
    /**
     * title":"Servicio <nombre> aceptado",
      "message":"su servicio de <nombre> ha sido aceptado",
      "user":16
     */

      let notificacion = {
        title: "Servicio " + this.nombre_servicio.name + " aceptado." ,
        message: "Su servicio de " + this.nombre_servicio.name + " ha sido aceptado",
        user: this.pedido_a_asignar.cliente_solicitante
      }

      console.log(notificacion)
      this.clienteWAservice.enviarNotificacionCliente(notificacion)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  


}



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'asignacion-confirmacion-dialog',
  templateUrl: 'asignacion-confirmacion.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AsignacionConfirmacion {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public message: any,
    private clientWAservice: ClienteWAService,
    private router:Router
  ){

  }

  // asignarPedido(form: any, id: any){
  //   this.clientWAservice.actualizarPedido(form ,id)
  //   .subscribe({
  //     next: (data:any) =>{
  //       console.log(data);
  //     }
  //   })
  // }

  onClickNO(): void{
    this.dialogRef.close();
    this.router.navigate(['serviciosVentana/serviciosPorAsignar'])
  }
}


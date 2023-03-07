import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ServiceModel } from '../models/servicio';
import { TiposServiciosModel } from '../models/tipoServicio.model';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


export interface TablaElemento {
  kilometro: string;
  precio: number;
}

var DATA_TABLA : TablaElemento[] = [
  
];

const ESQUEMA_COLUMNAS = [
  {
    key: 'kilometro_inicial',
    type: 'number',
    label: 'Kilometro Inicial',
    required: true,
    pattern: '^[0-9]+(\.[0-9]{1,2})?$',
  },
  {
    key: 'kilometro_destino',
    type: 'number',
    label: 'Kilometro destino',
    required: true,
    pattern: '^[0-9]*\.[0-9]*',
  },
  {
    key: "precio",
    type: "number",
    label: "Precio",
    required: true,
    pattern: '^[0-9]*\.[0-9]*',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: ''
  }
]


@Component({
  selector: 'app-servicio-editar-eliminar',
  templateUrl: './servicio-editar-eliminar.component.html',
  styleUrls: ['./servicio-editar-eliminar.component.css']
})
export class ServicioEditarEliminarComponent implements OnInit {

  valid: any = {}

  //Mensaje de error
  mensajeError = "";
  mensajeErrorCorreo = "";
  editable:boolean=false
  actualizado!:boolean | null

  //Variable que confirma eliminacion del servicio
  eliminado!:boolean | null

  //Variable para indicar que no existe servicio a editar y muestra boton de regresar a pagina principal
  inexistente!: boolean | null

  registerForm!: FormGroup;

  //Variable para guardar nombre inicial
  nombre_temporal!: string | String

  servicio: ServiceModel = new ServiceModel();

  //Lista para guardar los servicios ya creados
  lista_Servicio?: ServiceModel[];

  //Variable para el modal
  display = 'none';

  //Variable de fecha de creacion
  fecha_Creacion_Servicio = new Date();

  //Diccionario inventario requerido seleccionado
  inventario_Requerido = new Map();

  //Diccionario tipo de personal requerido
  tipo_Personal_Requerido = new Map();

  //Cedula a usar para encontrar id del admin
  cedula_Admin = 0

  //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
  camposCompletos: boolean = false;

  //Lista de tipos de servicios a presentar
  lista_Tipos_Servicios?: TiposServiciosModel[];
  
  id_Tipo_Servicio_Seleccionado = 0

  //Indicador si registro fue guardado en la base de datos o no
  submitted = false;

  //Variable que indica que se está editando una fila
  editando_fila = false;

  //Bandera creada para indicar que la cuenta fue creada y así cambiar el mensaje de retroalimentacion
  exito = false;

  //Variable para setear checks por default para inventario
  check_vehiculo = false
  check_armamento = false
  check_candado = false

  //Variable para setear checks por default para tipo personal
  check_guardia = false
  check_guardaespaldas = false
  check_conductor_chofer = false

  //Variable que se usara para presentar los datos del servicio
  servicio_actualizar: ServiceModel = {
    idServicio: 0,
    nombreServicio: '',
    costo: 0,
    detalles: '',
    fecha_Creacion: new Date(),
    tipo_Servicio: 0,
    administrador_Creador: 0,
    icono: new URL("https://cdn-icons-png.flaticon.com/512/263/263100.png")
  }

  //Variable que presenta si hay nombre de servicio ta creado
  servicio_diferente = false

  //Variable para que solo borre el nombre del servicio de la lista una sola vez
  entrada = 1

  //Dato booleano para mostrar tabla
  mostrar_tabla!:boolean

    //Columnas para tabla de Kilometro y precio
  columnas_tabla: string[] = ESQUEMA_COLUMNAS.map((col) => col.key)

  //Lista de datos como fuente de la tabla
  lista_tabla = new MatTableDataSource(DATA_TABLA)


  //Esquema de columnas
  esquema_columnas: any = ESQUEMA_COLUMNAS
  
  data_tabla_source: any = DATA_TABLA

  //Variable para poder guardar ultimo km anterior
  km_temporal = 0

  //Variables de validacion de tabla
  rango_no_valido = false
  km_inicial_no_valido = false
  km_destino_no_valido = false
  tres_digitos_no_valido = false


  constructor(
    private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.obtener_info_servicio()
    let lista_inventario: string[] = [];
    let lista_tipo_personal: string[] = [];
    let lista_kilometro_precio: any[] = [];

    this.nombre_temporal = localStorage.getItem("nombre_servicio_editar")!

    //if(localStorage.getItem("detalles_servicio")){
      const info_servicio = JSON.parse(localStorage.getItem("detalles_servicio")!)
      this.servicio.nombreServicio = info_servicio.nombreServicio!.replaceAll('_', ' ')
      this.servicio.costo = info_servicio.costo
      this.servicio.detalles = info_servicio.detalles
      this.servicio.fecha_Creacion = info_servicio.fecha_Creacion
      this.servicio.tipo_Servicio = info_servicio.tipo_Servicio
      this.servicio.administrador_Creador = info_servicio.administrador_Creador
      this.servicio.icono = info_servicio.icono

    //}
    console.log("dato despues del get del localS")
    console.log(this.servicio.nombreServicio)


    //console.log(this.servicio.detalles)
    let lista_reporte: [string[]] = [[]]
    //if(this.servicio.detalles){
      lista_reporte = this.parsear_detalles(this.servicio.detalles.toString())
    //}
    console.log("lista reporte")
    console.log(lista_reporte)
    lista_inventario = lista_reporte.at(1)!
    //console.log(lista_inventario)
    lista_tipo_personal = lista_reporte.at(2)!
    //console.log(lista_tipo_personal)
    lista_kilometro_precio = lista_reporte.at(3)!
    lista_kilometro_precio.pop()
    console.log("Lista kilometro precio")
    console.log(lista_kilometro_precio)
    this.data_tabla_source = lista_kilometro_precio

    this.check_valores_estandar(lista_inventario, lista_tipo_personal);
    console.log("Esta " + this.check_vehiculo)

    console.log("Los datos a poner en el form son:")
    console.log(this.servicio)

    this.obtener_servicios()
    
    this.registerForm = this.formBuilder.group({
      'nombreServicio': {value:[this.servicio.nombreServicio, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]], disabled:!this.editable}, 
      'costo': {value:[this.servicio.costo, [Validators.required, Validators.pattern('^[0-9]*\.[0-9]*$')]], disabled:!this.editable},
      //'detalles': [this.servicio.detalles, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'tipo_Servicio': {value:[this.servicio.tipo_Servicio, [Validators.required]], disabled:!this.editable},
      //'icono' : ['']
    });
    
    this.inventario_Requerido.set('vehiculo', this.check_vehiculo);
    this.inventario_Requerido.set('armamento', this.check_armamento);
    this.inventario_Requerido.set('candado_satelital', this.check_candado);

    this.tipo_Personal_Requerido.set('guardia', this.check_guardia)
    this.tipo_Personal_Requerido.set('guardaespaldas', this.check_guardaespaldas)
    this.tipo_Personal_Requerido.set('conductor_chofer', this.check_conductor_chofer)

    console.log(this.inventario_Requerido)
    console.log(this.tipo_Personal_Requerido)


    this.obtener_Tipo_Servicios_Request()


  }

  //Metodo para actualizar servicio
  actualizar_Servicio(){
    console.log("Checkboxes que estan seleccionadas")
    console.log("vehi: " + this.check_vehiculo + "\n"
                + "armamento: " + this.check_armamento + "\n"
                + "candado: " + this.check_candado + "\n"
                + "guardia: " + this.check_guardia + "\n"
                + "guardaespaldas: " + this.check_guardaespaldas + "\n"
                + "conductor/chofer: " + this.check_conductor_chofer + "\n"
    )
    let reporte_precio_kilometro = this.convertir_reporte_kilometro(this.data_tabla_source)


    var checkbox_vehiculo = document.getElementById("flexRadioDefault1") as HTMLInputElement;
    console.log("esta checkeado: " + checkbox_vehiculo.checked)

    this.validar_inventario_requerido(this.inventario_Requerido);
    console.log("Inventario luego de validar los checks")
    console.log(this.inventario_Requerido)
    this.validar_tipo_personal_requerido(this.tipo_Personal_Requerido)
    let reporte_inventario = this.convertir_reporte_inventario(this.inventario_Requerido)
    console.log("reporte inventtttt")
    console.log(reporte_inventario)
    let reporte_tipo_personal = this.convertir_reporte_tipo_personal(this.tipo_Personal_Requerido)
    let reporte = reporte_inventario + '; ' + reporte_tipo_personal + '; ' + reporte_precio_kilometro//
    this.guardar()
    this.camposCompletos = !this.registerForm.invalid
    const info_servicio_actualizar = {
      nombreServicio: this.servicio.nombreServicio.replaceAll(' ', '_'),
      costo: this.servicio.costo,
      tipo_Servicio: this.servicio.tipo_Servicio,
      detalles: reporte,
      fecha_Creacion: this.fecha_Creacion_Servicio,
      administrador_Creador: this.servicio.administrador_Creador,
      icono: new URL("https://cdn-icons-png.flaticon.com/512/263/263100.png")
    }
    this.quitar_servicio_lista()
    this.servicio_diferente = this.validar_nombre_servicio(info_servicio_actualizar.nombreServicio)
    if(this.camposCompletos && !this.editando_fila && this.servicio_diferente == false){
      console.log("se puede actualizar")
      console.log("Informacion del servicio para actualizar")
      console.log(info_servicio_actualizar)
      this.clienteWAService.actualizar_servicio(JSON.parse(localStorage.getItem("detalles_servicio")!).nombreServicio, info_servicio_actualizar)
      .subscribe({
        next: (res) => {
          console.log("Se han guardado los datos")
          this.servicio.nombreServicio = res.nombreServicio!.replaceAll('_', ' ')
          this.servicio.costo = res.costo
          this.servicio.tipo_Servicio = res.tipo_Servicio
          this.servicio.detalles = reporte
          this.actualizado = true

          localStorage.setItem('detalles_servicio', JSON.stringify(res))

        },
        error: (e) => {
          this.actualizado = false
          console.log(e)
        }
      });
    } else{
      this.actualizado = false
      this.exito = false
      this.servicio_diferente = true
      this.cuentaCreada(this.exito, this.servicio_diferente)
      console.log("no se puede actualizar")
      //alert("Servicio no actualizado")
    }
  }

  obtener_servicios(): void{
    this.clienteWAService.obtener_servicios_creados()
    .subscribe({
      next: (data) => {
        this.lista_Servicio = data;
      },
      error: (e) => console.error(e)
    })
  }

  quitar_servicio_lista(){
    let nombre_servicio_actualizar = localStorage.getItem("nombre_servicio_editar")!
    console.log("nombre de servicio del localS: " + nombre_servicio_actualizar)
    console.log("Estos son todos los servicios")
    console.log(this.lista_Servicio)
    for(let i = 0; i < this.lista_Servicio!.length; i++){
      if(nombre_servicio_actualizar == this.lista_Servicio![i].nombreServicio && this.entrada == 1){
        let indice_eliminar = i
        console.log("indice a eliminar: " + indice_eliminar)
        this.lista_Servicio!.splice(indice_eliminar, 1)
        this.entrada = 0
      }
    }
    console.log("Lista de servicios luego de haber aplicado el quitar servicio")
    console.log(this.lista_Servicio)
  }

  validar_nombre_servicio(nombre_a_crear: string | String){
    //borrar el nombre del servicio que se esta actualizando
    for(let i = 0; i < this.lista_Servicio!.length; i++){
      if(nombre_a_crear == this.lista_Servicio![i].nombreServicio){
        console.log("entra para que sea true")
        console.log(nombre_a_crear)
        console.log(this.lista_Servicio![i].nombreServicio)
        console.log("Ya existe un servicio con ese nombre")
        console.log("--------------------------------")
        return true
      }
    }
    return false

  }


  //Metodo para habilitar el modo de edicion
  editar_Servicio(){
    this.editable = !this.editable
    this.registerForm.enable()

    console.log(this.check_vehiculo)
    console.log(this.check_armamento)
    console.log(this.check_candado)
    console.log(this.check_guardia)
    console.log(this.check_guardaespaldas)
    console.log(this.check_conductor_chofer)

    console.log("se puede editar?")
    console.log(this.editable)
    console.log("El registro esta:")
    console.log(!this.registerForm.valid)


    let lista_inventario: string[] = [];
    let lista_tipo_personal: string[] = [];
    let detalles_reporte = this.parsear_detalles(JSON.parse(localStorage.getItem("detalles_servicio")!).detalles.toString())
    lista_inventario = detalles_reporte.at(1)!
    lista_tipo_personal = detalles_reporte.at(2)!
    console.log(lista_inventario)
    this.check_valores_estandar(lista_inventario, lista_tipo_personal);



  }

  //Metodo para actualizar la informacion del servicio
  guardar(){
    this.editable = false
    this.registerForm.disable()
  }


  eliminar_Servicio(){
    this.eliminado = true
    let x = document.getElementById('btnEliminarConfirmacion') as HTMLInputElement;
    x.hidden = true
    this.clienteWAService.eliminar_servicio(JSON.parse(localStorage.getItem("detalles_servicio")!).nombreServicio)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.registerForm.reset()
        this.inexistente = true
        localStorage.removeItem('nombre_servicio_editar')
        localStorage.removeItem('detalles_servicio')
        //this.router.navigate(['/serviciosVentana'])
      }
    });
  }

  //Obtener informacion sobre el servicio que se quiere actualizar
  obtener_info_servicio(){
    this.clienteWAService.seleccionar_servicio(localStorage.getItem('nombre_servicio_editar')?.toString()!)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.servicio_actualizar.nombreServicio = data.nombreServicio
        this.servicio_actualizar.costo = data.costo
        this.servicio_actualizar.administrador_Creador = Number(JSON.parse(localStorage.getItem("detalles_servicio")!).administrador_Creador)
        this.servicio_actualizar.fecha_Creacion = data.fecha_Creacion
        this.servicio_actualizar.tipo_Servicio = data.tipo_Servicio
        this.servicio_actualizar.icono = data.icono
      },
      error: (e) => console.log(e)
    })
  }

  //-------------------------------------------------------- Change de checks ----------------------------------------------
  cambio_check_vehiculo(event: any){
    console.log("Se ha cambiado el check a: " + event.target.checked)
    if(event.target.checked == true){
      this.check_vehiculo = true
    } else{
      this.check_vehiculo = false
    }
  } 

  cambio_check_armamento(event: any){
    console.log("Se ha cambiado el check a: " + event.target.checked)

    if(event.target.checked == true){
      this.check_armamento = true
    } else{
      this.check_armamento = false
    }
  }

  cambio_check_candado(event: any){
    if(event.target.checked == true){
      this.check_candado = true
    } else{
      this.check_candado = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  cambio_check_guardia(event: any){
    if(event.target.checked == true){
      this.check_guardia = true
    } else{
      this.check_guardia = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  cambio_check_guardaespaldas(event: any){
    if(event.target.checked == true){
      this.check_guardaespaldas = true
    } else{
      this.check_guardaespaldas = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  cambio_check_conductor_chofer(event: any){
    if(event.target.checked == true){
      this.check_conductor_chofer = true
    } else{
      this.check_conductor_chofer = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  //----------------------------------------------------------------------------------------------------------------------


  //Metodo para verificar el inventario requerido seleccionado
  validar_inventario_requerido(diccionario_inventario: Map<string, boolean>){
    var checkbox_vehiculo = document.getElementById("flexRadioDefault1") as HTMLInputElement;
    var checkbox_armamento = document.getElementById("flexRadioDefault2") as HTMLInputElement;
    var checkbox_candado = document.getElementById("flexRadioDefault3") as HTMLInputElement;

    console.log("entra a las validacionessss:")
    console.log("Inventario antes de la validacion")
    console.log(diccionario_inventario)

    /*for(let [key, value] of diccionario_inventario){
      if(key == "vehiculo" && value == true){
        this.check_vehiculo = true
        checkbox_vehiculo.checked = true
        console.log("vehiculo seleccionado")
      }
      if(key == "armamento" && value == true){
        this.check_armamento = true
      }
      if(key == "candado_satelital" && value == true){
        this.check_candado = true
      }
    }*/

    if(this.check_vehiculo == true){
      diccionario_inventario.set('vehiculo', true);
    }

    if(this.check_vehiculo == false){
      diccionario_inventario.set('vehiculo', false);
    }

    if(this.check_armamento == true){
      diccionario_inventario.set('armamento', true);
    }

    if(this.check_armamento == false){
      diccionario_inventario.set('armamento', false);
    }

    if(this.check_candado == true){
      diccionario_inventario.set('candado_satelital', true)
    }

    if(this.check_candado == false){
      diccionario_inventario.set('candado_satelital', false)
    }

  }

  //Metodo para reporte de inventario
  convertir_reporte_inventario(diccionario_inventario: Map<string, boolean>){
    console.log("entra a funcion de convertir a reporte")
    console.log(diccionario_inventario)
    var reporte_detalles: string = "Inventario requerido" + " => "
    for(let [key, value] of diccionario_inventario){
      console.log(key + " " + value)
      if(value == true){
        reporte_detalles += key + " | "
      }
    }
    console.log(reporte_detalles)
    return reporte_detalles
  }


  //Metodo para verificar el tipo de personal requerido
  validar_tipo_personal_requerido(diccionario_tipo_personal: Map<string, boolean>){
    var checkbox_guardia = document.getElementById("check_Guardia") as HTMLInputElement | null;
    var checkbox_guardaespaldas = document.getElementById("check_Guardaespaldas") as HTMLInputElement | null;
    var checkbox_chofer_conductor = document.getElementById("check_Conductor_Chofer") as HTMLInputElement | null;

    /*for(let [key, value] of diccionario_tipo_personal){
      if(key == "guardia" && value == true){
        this.check_guardia = true
      }
      if(key == "guardaespaldas" && value == true){
        this.check_guardaespaldas = true
      }
      if(key == "conductor_chofer" && value == true){
        this.check_conductor_chofer = true
      }
    }*/

    if(this.check_guardia == true){
      diccionario_tipo_personal.set('guardia', true);
    }

    if(this.check_guardia == false){
      diccionario_tipo_personal.set('guardia', false);
    }

    if(this.check_guardaespaldas == true){
      diccionario_tipo_personal.set('guardaespaldas', true);
    }

    if(this.check_guardaespaldas == false){
      diccionario_tipo_personal.set('guardaespaldas', false);
    }

    if(this.check_conductor_chofer == true){
      diccionario_tipo_personal.set('conductor_chofer', true)
    }

    if(this.check_conductor_chofer == false){
      diccionario_tipo_personal.set('conductor_chofer', false)
    }

  }

  //Metodo para reporte de tipo de personal
  convertir_reporte_tipo_personal(diccionario_tipo_personal: Map<string, boolean>){
    console.log(diccionario_tipo_personal)
    var reporte_detalles: string = "Tipo de personal requerido" + " => "
    for(let [key, value] of diccionario_tipo_personal){
      console.log(key + " " + value)
      if(value == true){
        reporte_detalles += key + " | "
      }
    }
    console.log(reporte_detalles)
    return reporte_detalles
  }

  //Funcion para convertir diccionario de precios por kilometro
  convertir_reporte_kilometro(arreglo_diccionario_kilometro: [Map<string, any>]){
    var reporte_detalles: string = "Precio por kilometro" + " => "
    for(let dic of arreglo_diccionario_kilometro){
      console.log(dic)
      console.log(Object.values(dic))
      console.log(Object.values(dic)[0])
      console.log(Object.values(dic)[1])
      console.log(Object.values(dic)[2])
      console.log(Object.values(dic)[3])
      reporte_detalles += Object.values(dic)[0] + " - " + Object.values(dic)[1] + " - " + Object.values(dic)[2] + " - " + Object.values(dic)[3] + " / "
    }
    console.log(reporte_detalles)
    return reporte_detalles
  }

  //Funcion para guardar los tipos de servicios
  obtener_Tipo_Servicios_Request(): void{
    this.clienteWAService.obtener_Tipos_Servicios()
    .subscribe({
      next: (data) => {
        this.lista_Tipos_Servicios = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  cuentaCreada(exito: boolean, servicioDiferente: boolean){
    let element = document.getElementById("mensajeDeConfirmacion");
    //let hidden = element?.getAttribute("hidden");

    if(exito){
      element?.setAttribute("mensajeDeConfirmacion", "hidden")
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "El servicio se ha creado exitosamente"
      }
    } else if(servicioDiferente){
      console.log("Existe un servicio diferente entra al elif")
      let elemento_Dos = document.getElementById("Mensaje_Error") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "Ya existe otro servicio con este nombre"
      }
      this.servicio.nombreServicio = this.nombre_temporal.replaceAll('_',' ')
    }else{
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "La cuenta no se ha creado"
      }
    }
  }

  parsear_detalles(reporte: string){
    let lista_general: [string[]] = [[]];
    let lista_inventario: string[] = [];
    let lista_tipo_personal: string[] = [];
    let lista_kilometro_con_precio: any[] = [];

    //Separacion general
    let separacion_requerimientos = reporte.split(';')

    let inventario_requerido = separacion_requerimientos[0]
    let valor_inventario = inventario_requerido.split("=>")[1]//
    valor_inventario.split('|').forEach(function(obj_inventario){
      lista_inventario.push(obj_inventario.replaceAll(' ', ''))
    });

    let tipo_personal_requerido = separacion_requerimientos[1]
    let valor_tipo_personal = tipo_personal_requerido.split("=>")[1]
    valor_tipo_personal.split('|').forEach(function(obj_tipo_personal){
      lista_tipo_personal.push(obj_tipo_personal.replaceAll(' ', ''))
    })

    let kilometro_precio = separacion_requerimientos[2]
    let valor_kilometro = kilometro_precio.split("=>")[1]
    console.log("Kilometro antes de hacer el split")
    console.log(valor_kilometro)
    console.log("For de detalle de tabla")
    valor_kilometro.split('/').forEach(function(obj_row){
      let arreglo = obj_row.split('-')
      console.log(arreglo[0].replaceAll(' ', ''))
      console.log(arreglo[1])
      console.log(arreglo[2])
      console.log(arreglo[3])
      let objeto_kilometro_precio = {
        "id" : arreglo[0].replaceAll(' ', ''),
        "kilometro_inicial" : Number(arreglo[1]),
        "kilometro_destino" : Number(arreglo[2]),
        "precio" : Number(arreglo[3]),
        isEdit : false
      }
      console.log("objeto kilometro precio")
      console.log("kilometro inicial")
      console.log( typeof objeto_kilometro_precio.kilometro_inicial)
      console.log("precio")
      console.log(typeof objeto_kilometro_precio.precio)
      console.log(objeto_kilometro_precio)
      lista_kilometro_con_precio.push(objeto_kilometro_precio)
    })


    lista_general.push(lista_inventario)
    lista_general.push(lista_tipo_personal)
    lista_general.push(lista_kilometro_con_precio)


    console.log(lista_inventario);
    console.log(lista_tipo_personal);
    console.log(lista_kilometro_con_precio)
    console.log("A".toLowerCase())

    return lista_general


  }

  //Metodo para agregar checked a aquellos campos de inventario y tipo de personal que esten seleccionados 
  check_valores_estandar(lista_inv: string[], lista_tpersonal: string[]){
    
    if(lista_inv){
      for(let i=0; i < lista_inv.length; i++){
        if(lista_inv[i] == "vehiculo"){
          this.check_vehiculo = true
        }
        if(lista_inv[i] == "armamento"){
          this.check_armamento = true
        }
        if(lista_inv[i] == "candado_satelital"){
          this.check_candado = true
        }
      }
    }
    
    if(lista_tpersonal){
      for(let i=0; i < lista_tpersonal.length; i++){
        if(lista_tpersonal[i] == "guardia"){
          this.check_guardia = true
        }
        if(lista_tpersonal[i] == "guardaespaldas"){
          this.check_guardaespaldas = true
        }
        if(lista_tpersonal[i] == "conductor_chofer" || lista_tpersonal[i] == "chofer/conductor"){
          this.check_conductor_chofer = true
        }
      }
    }

    
  }

  //Metodo para cancelar edicion de servicio
  refrescar(){
    window.location.reload()
  }

  volver_principal(){
    //this.router.navigate(['/serviciosVentana'])
  }

  tipo_servicio_s2(event: any, tarifa: any){
    if(event.target.checked == true && tarifa == "Por km/distancia recorrida"){
      this.mostrar_tabla = true
      console.log("Funcion 2: " + this.servicio.tipo_Servicio)
    } else {
      this.mostrar_tabla = false
    }
  }

  addRow(){
    this.editando_fila = true;
    const newRow = {"id": Date.now(),"kilometro_inicial": 0, "kilometro_destino": 0 , "precio": 0, isEdit: true}
    this.data_tabla_source = [...this.data_tabla_source, newRow]
    console.log("Se agrega una nueva fila")
  }

  removeRow(id: number){
    this.data_tabla_source = this.data_tabla_source.filter((u: { id: number; }) => u.id !== id)
  }

  inputHandler(e: any, id: number, key: string){
    if(!this.valid[id]){
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }


  disableSubmit(id: number){
    if(this.valid[id]){
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }



  esta_listo(ed: boolean, km_i: number, km_d: number, km_id: number){
    this.editando_fila = true
    let cont = 0
    let cont_dos = 0
    let indice_temp = 0
    //alert("Lista de datos: \n" + this.data_tabla_source.toString() + "\n" + "dato temporal: \n" + this.km_temporal)
    console.log("El id a editar es: " + km_id)

    this.rango_no_valido = false
    this.km_inicial_no_valido = false
    this.km_destino_no_valido = false
    this.tres_digitos_no_valido = false


    indice_temp = this.data_tabla_source[0].id
    console.log("Indice inicial: " + indice_temp)
    
    console.log(this.data_tabla_source)

    console.log("tamaños")
    //Separarlos
    if(km_i.toString().includes('.')){
      if(km_i.toString().split('.')[1].length > 2){
        this.tres_digitos_no_valido = true
        return true
      }
    }
    if(km_d.toString().includes('.')){
      if(km_d.toString().split('.')[1].length > 2){
        this.tres_digitos_no_valido = true
        return true
      }
    }

    while(indice_temp < km_id){
      console.log("-----------------------------------")
      //console.log("Km destino anterior: " + Math.ceil(this.data_tabla_source[cont].kilometro_destino))
      //console.log("km inicial actual: " + Math.ceil(km_i))

      console.log("Km destino anterior: " + this.data_tabla_source[cont].kilometro_destino)
      console.log("km inicial actual: " + km_i)


      let entero_decimal_kmD: string[] = []
      let entero_decimal_kmia: string[] = []
      
      console.log("-----------------------------------")
      if(Math.ceil(km_i) <= this.data_tabla_source[cont].kilometro_destino){
        this.editando_fila = true;
        console.log("entra a inicial no valido")
        this.km_inicial_no_valido = true
        return true
      //Condicion para comprobar si con decimales km inicial y destinof inal son iguales (punto)
      }else if(this.data_tabla_source[cont + 1].kilometro_inicial == km_i &&  km_i.toString().split('.').length > 1 && this.data_tabla_source[cont].kilometro_destino.toString().split('.').length > 1) {
        console.log("Ambos son decimales")
        entero_decimal_kmD = this.data_tabla_source[cont].kilometro_destino.toString().split('.')
        let entero_kmD = entero_decimal_kmD[0]
        let decimal_kmD = entero_decimal_kmD[1]
        console.log(entero_kmD + "-" + decimal_kmD)


        console.log("tamaño: " + km_i.toString().split('.').length)
        entero_decimal_kmia = km_i.toString().split('.')
        let entero_kmia = entero_decimal_kmia[0]
        let decimal_kmia = entero_decimal_kmia[1]
        console.log(entero_kmia + "-" + decimal_kmia)

        if(parseInt(decimal_kmD) > parseInt(decimal_kmia)){
          console.log("El decimal de km destino es mayor que el decimal de km inicial actual")
          this.editando_fila = true;
          this.km_inicial_no_valido = true
          return true
        }

        if(parseInt(entero_kmD) == parseInt(entero_kmia) && parseInt(decimal_kmD) == parseInt(decimal_kmia)){
          console.log("SOn iguales estos dos numeros decimales")
          this.editando_fila = true;
          this.km_inicial_no_valido = true
          return true
        }
      //Condicion para comprobar si con decimales km inicial y destinof inal son iguales (coma)
      }else if(km_i.toString().split(',').length > 1 && this.data_tabla_source[cont].kilometro_destino.toString().split(',').length > 1) {
        console.log("Ambos son decimales")
        entero_decimal_kmD = this.data_tabla_source[cont].kilometro_destino.toString().split(',')
        let entero_kmD = entero_decimal_kmD[0]
        let decimal_kmD = entero_decimal_kmD[1]
        console.log(entero_kmD + "-" + decimal_kmD)


        console.log("tamaño: " + km_i.toString().split(',').length)
        entero_decimal_kmia = km_i.toString().split(',')
        let entero_kmia = entero_decimal_kmia[0]
        let decimal_kmia = entero_decimal_kmia[1]
        console.log(entero_kmia + "-" + decimal_kmia)

        if(parseInt(decimal_kmD) > parseInt(decimal_kmia)){
          console.log("El decimal de km destino es mayor que el decimal de km inicial actual")
          this.editando_fila = true;
          this.km_inicial_no_valido = true
          return true
        }

        if(parseInt(entero_kmD) == parseInt(entero_kmia) && parseInt(decimal_kmD) == parseInt(decimal_kmia)){
          console.log("SOn iguales estos dos numeros decimales")
          this.editando_fila = true;
          this.km_inicial_no_valido = true
          return true
        }
      }
      cont ++
      indice_temp = this.data_tabla_source[cont].id
    }

    for(let i = 0; i < this.data_tabla_source.length; i++){
      if(this.data_tabla_source[i + 1] && this.data_tabla_source[i].id == km_id){
        console.log("km puesto: " + km_d)
        console.log("km inicial siguiente: " + this.data_tabla_source[i + 1].kilometro_inicial)
        if(Number(km_d) >= Number(this.data_tabla_source[i + 1].kilometro_inicial)){
          console.log("entra a destino no valido")
          this.editando_fila = true;
          this.km_destino_no_valido = true
          return true
        }
      }
    }

    console.log("La cantidad de rangos es de: " + this.data_tabla_source.length)
    console.log("inicial: " + km_i + "--" + "destino: " + km_d)
    console.log(km_i)
    //console.log(km_i * 10)
    console.log(km_d)
    if(Number(km_i) >= Number(km_d)){
      //alert("Entra segundo caso" + km_i + "--" + km_d)
      console.log("entra a rango no valido")
      console.log( km_i + "--" + km_d)
      this.editando_fila = true
      this.rango_no_valido = true
      return true
    }else{
      //alert("Entra tercer caso")
      this.editando_fila = false;
      return !ed
    }

  }


  fila_en_edicion(){
    this.editando_fila = true;
  }

  fila_en_no_edicion(){
    this.editando_fila = false;
  }
  

}

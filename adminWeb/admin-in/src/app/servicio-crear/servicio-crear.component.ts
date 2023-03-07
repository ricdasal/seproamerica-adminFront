import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { map } from 'rxjs';
import { ServiceModel } from '../models/servicio';
import { TiposServiciosModel } from '../models/tipoServicio.model';
import { ClienteWAService } from '../services/cliente-wa.service';
import { ElementoTablaModel } from '../models/elementoTabla';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';

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
    pattern: '^[0-9]+(\.[0-9]{1,2})?$',
  },
  {
    key: "precio",
    type: "number",
    label: "Precio",
    required: true,
    pattern: '^[0-9]+(\.[0-9]{1,2})?$',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: ''
  }
]


@Component({
  selector: 'app-servicio-crear',
  templateUrl: './servicio-crear.component.html',
  styleUrls: ['./servicio-crear.component.css']
})
export class ServicioCrearComponent implements OnInit {

  valid: any = {}

  registerForm!: FormGroup;

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

  //Bandera creada para indicar que la cuenta fue creada y así cambiar el mensaje de retroalimentacion
  exito = false;

  //Dato booleano para mostrar tabla
  mostrar_tabla!:boolean

  //Variable que indica que se está editando una fila
  editando_fila = false;

  //Variable que presenta si hay nombre de servicio ta creado
  nombre_repetido = false

  //Elemento
  elemento_tabla  = {
    kilometro: "",
    precio: 0
  };

  x!: string

  data_ingresada: ElementoTablaModel = new ElementoTablaModel();


  //Columnas para tabla de Kilometro y precio
  //columnas_tabla: string[] = ['kilometro', 'precio']
  columnas_tabla: string[] = ESQUEMA_COLUMNAS.map((col) => col.key)

  //Lista de datos como fuente de la tabla
  //lista_tabla!: ElementoTablaModel[]
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
    private clienteWAService: ClienteWAService
  ) { }

  ngOnInit(): void {
    this.obtener_servicios()
    const datosUsuario=JSON.parse(localStorage.getItem("datoUsuario")!)
    this.cedula_Admin=datosUsuario.cedula
    this.obtener_idAdmin(this.cedula_Admin.toString())
    this.registerForm = this.formBuilder.group({
      'nombreServicio': [this.servicio.nombreServicio, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'costo': [this.servicio.costo, [Validators.required, Validators.pattern('^[0-9]*\.[0-9]*$')]],
      'tipo_Servicio': [this.servicio.tipo_Servicio, [Validators.required]],
    });

    this.inventario_Requerido.set('vehiculo', false);
    this.inventario_Requerido.set('armamento', false);
    this.inventario_Requerido.set('candado_satelital', false);

    this.tipo_Personal_Requerido.set('guardia', false)
    this.tipo_Personal_Requerido.set('guardaespaldas', false)
    this.tipo_Personal_Requerido.set('conductor_chofer', false)

    this.obtener_Tipo_Servicios_Request()

  }

 

  //Metodo para crear servicio
  crear_Servicio(){
    console.log("Estos son los detalles de los precios por kilometro")
    console.log(this.data_tabla_source)
    let reporte_precio_kilometro = this.convertir_reporte_kilometro(this.data_tabla_source)

    this.validar_inventario_requerido(this.inventario_Requerido);
    this.validar_tipo_personal_requerido(this.tipo_Personal_Requerido)
    let reporte_inventario = this.convertir_reporte_inventario(this.inventario_Requerido)
    let reporte_tipo_personal = this.convertir_reporte_tipo_personal(this.tipo_Personal_Requerido)
    let reporte = reporte_inventario + '; ' + reporte_tipo_personal + '; ' + reporte_precio_kilometro//
    console.log("Reporte inventario")
    console.log(reporte_inventario)
    this.camposCompletos = !this.registerForm.invalid;
    console.log("Datos completos " + this.camposCompletos)
    if(this.servicio.nombreServicio == undefined){
      this.cuentaCreada(false)
    }
    const data = {
      nombreServicio : this.servicio.nombreServicio.replaceAll(' ', '_'),
      costo : this.servicio.costo,
      detalles : reporte,
      fecha_Creacion : this.fecha_Creacion_Servicio,
      tipo_Servicio : this.servicio.tipo_Servicio,
      administrador_Creador : Number(localStorage.getItem("idAdmin")),
      icono : "https://cdn-icons-png.flaticon.com/512/263/263100.png"
    };
    console.log("Datos del servicio a crear: ")
    console.log(data)
    console.log("variable de fila editando editar: " + this.editando_fila)
    this.nombre_repetido = this.validar_nombre_servicio(data.nombreServicio)
    console.log(this.nombre_repetido)
    if(this.camposCompletos && !this.editando_fila && !this.nombre_repetido){
      this.clienteWAService.crear_Servicio(data)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.submitted = true
          this.exito = true
          this.cuentaCreada(this.exito)
          this.registerForm.reset()
        },
        error : (e) => console.log(e)
      });
    } else {
      console.log("entra el else")
      this.exito = false
      this.cuentaCreada(this.exito)
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

  validar_nombre_servicio(nombre_a_crear: string | String){
    console.log("Estos son todos los servicios")
    console.log(this.lista_Servicio)
    console.log(nombre_a_crear)
    for(let i = 0; i < this.lista_Servicio!.length; i++){
      console.log(this.lista_Servicio![i])
      if(nombre_a_crear == this.lista_Servicio![i].nombreServicio){
        return true
      }
    }
    return false

  }


  //Metodo para el icono
  setImagen(event: any){
    this.servicio.icono = event.target.files[0];
    this.registerForm.get('icono')?.setValue(this.servicio.icono);
  }

  //Metodo para obtener id del administrador
  obtener_idAdmin(cedula_Administrador: String){
    this.clienteWAService.obtener_admin_especifico(cedula_Administrador)
    .subscribe({
      next: (data) => {
        console.log(data)
        console.log(data.idPersonal)
        localStorage.setItem("idAdmin", JSON.stringify(data.idPersonal))
      },
      error : (e) => console.log(e)
    })
  }


  //Metodo para verificar el inventario requerido seleccionado
  validar_inventario_requerido(diccionario_inventario: Map<string, boolean>){
    var checkbox_vehiculo = document.getElementById("flexRadioDefault1") as HTMLInputElement | null;
    var checkbox_armamento = document.getElementById("flexRadioDefault2") as HTMLInputElement | null;
    var checkbox_candado = document.getElementById("flexRadioDefault3") as HTMLInputElement | null;

    if(checkbox_vehiculo?.checked == true){
      diccionario_inventario.set('vehiculo', true);
    }

    if(checkbox_vehiculo?.checked == false){
      diccionario_inventario.set('vehiculo', false);
    }

    if(checkbox_armamento?.checked == true){
      diccionario_inventario.set('armamento', true);
    }

    if(checkbox_armamento?.checked == false){
      diccionario_inventario.set('armamento', false);
    }

    if(checkbox_candado?.checked == true){
      diccionario_inventario.set('candado_satelital', true)
    }

    if(checkbox_candado?.checked == false){
      diccionario_inventario.set('candado_satelital', false)
    }

  }

  //Metodo para reporte de inventario
  convertir_reporte_inventario(diccionario_inventario: Map<string, boolean>){
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

    if(checkbox_guardia?.checked == true){
      diccionario_tipo_personal.set('guardia', true);
    }

    if(checkbox_guardia?.checked == false){
      diccionario_tipo_personal.set('guardia', false);
    }

    if(checkbox_guardaespaldas?.checked == true){
      diccionario_tipo_personal.set('guardaespaldas', true);
    }

    if(checkbox_guardaespaldas?.checked == false){
      diccionario_tipo_personal.set('guardaespaldas', false);
    }

    if(checkbox_chofer_conductor?.checked == true){
      diccionario_tipo_personal.set('chofer/conductor', true)
    }

    if(checkbox_chofer_conductor?.checked == false){
      diccionario_tipo_personal.set('chofer/conductor', false)
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
      //for(let [key, value] of dic){
      //  console.log(key + " " + value)
     // }
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

  cuentaCreada(exito: boolean){
    let element = document.getElementById("mensajeDeConfirmacion");
    //let hidden = element?.getAttribute("hidden");

    if(exito){
      element?.setAttribute("mensajeDeConfirmacion", "hidden")
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "El servicio se ha creado exitosamente"
      }
    }else if (this.nombre_repetido){
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "El servicio no se ha creado, ya existe servicio con este nombre"
      }
    }else{
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "El servicio no se ha creado, complete los campos"
      }
    }
  }

  tipo_servicio_seleccionado(tipo: number | Number){
    console.log(tipo)
    if(tipo == 2){
      console.log(true)
      
    } else {
      
    }
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
    console.log("Inician validaciones ------------------------------------")
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
        console.log("entra a inicial no valido")
        this.editando_fila = true;
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
    console.log(km_i * 10)
    console.log(km_d)
    /*if(){

    }*/
    if(Number(km_i) >= Number(km_d)){
      //alert("Entra segundo caso" + km_i + "--" + km_d)
      console.log("entra a rango no valido")
      console.log( km_i + "--" + km_d)
      this.rango_no_valido = true
      this.editando_fila = true
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

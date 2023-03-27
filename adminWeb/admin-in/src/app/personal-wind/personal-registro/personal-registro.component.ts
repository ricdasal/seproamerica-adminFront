import { Component, OnInit } from '@angular/core';
import { PersonalOpModel } from 'src/app/models/personalOp.models';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import * as moment from "moment";
import { InfPersonalService } from 'src/app/services/inf-personal.service';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CrearGruposComponent } from './crear-grupos/crear-grupos.component';

@Component({
  selector: 'app-personal-registro',
  templateUrl: './personal-registro.component.html',
  styleUrls: ['./personal-registro.component.css']
})
export class PersonalRegistroComponent implements OnInit {
  //Variable para el modal
  display = 'none';

  //Lista de sucursales para el registro
  lista_Sucursales?: SucursalModel[];

  sucursal_De_Personal = ""

  lista_generos = [
    {genero: 'masculino', identificador: 'M'},
    {genero: 'femenino', identificador: 'F'},
    {genero: 'no definir', identificador: 'Nd'}

   ];

   lista_datos_cargo = [
    {tipo_dato: 'conduccion'},
    {tipo_dato: 'Uso de armamento'}
   ];

   lista_sucursales: Array<any> = [
   ]

   lista_cargos: any = [
 
   ]

   lista_grupos: any = [

   ]
   
  //Mensaje de error
  mensajeError = "";
  mensajeErrorCorreo = "";

  title = 'email-validation-tutorial';
  userEmail = new FormControl({
    correo: new FormControl('',[
      Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      secondaryEmail: new FormControl('',[
        Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  
  user: PersonalOpModel = new PersonalOpModel();
  fechaRegistro = new Date();
  rol: string ='2';

  //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
  camposCompletos: boolean = false;
  ppp: boolean = false;
  //varComb: boolean = this.varPUno && this.varPDos;

  registerForm!: FormGroup;
  hide = true;
  //Indicador si registro fue guardado en la base de datos o no
  submitted = false;

  //Bandera creada para indicar que la cuenta fue creada y así cambiar el mensaje de retroalimentacion
  exito = false;

  //Diccionario cargos de trabajo seleccionados
  cargos_trabajo_seleccionado = new Map();

  esMayorEdad: boolean = false;
  p: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private _infPersonalService: InfPersonalService,
    private router:Router,
    private clienteWAService: ClienteWAService,
    private http: HttpClient,
    public dialog: MatDialog
    ) { 
      console.log(router.url)
    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'first_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]],
      'phone_number': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$')]],
      'dni': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^(09|125)[0-9]*$')]],
      'birthdate': [null, [Validators.required]],
      'gender': [null, [Validators.required]],
      'address': [null, [Validators.required]],
      'charge':[null, [Validators.required ]],
      'branch' : [null,  [Validators.required]],     
    });
    
    this.cargos_trabajo_seleccionado.set('guardia', false)
    this.cargos_trabajo_seleccionado.set('guardaespaldas', false)
    this.cargos_trabajo_seleccionado.set('conductor', false)
    this.cargos_trabajo_seleccionado.set('motorizado', false)

    console.log(this.lista_Sucursales);
    this.validar_licencia_armamento();
    this.validar_licencia_conduccion()
    this.obtenerCargos();
    this.obtenerSucursales();
  }


  guardar_Personal_Operativo(form: any): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    console.log(form.value);

    this.http.post(`${this.clienteWAService.DJANGO_SERRVER_REGISTRAR_PERSONAL_OPERATIVO}`, form.value, {headers}).subscribe(
      (res: any) => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  
  obtenerCargos(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.request('GET',"https://seproamerica2022.pythonanywhere.com/users/operationalGroupList/", {headers})
    .subscribe({
      next: (data: any) => {
        console.log(data)
        this.lista_cargos = this.lista_cargos.concat(data['groups']);
        this.lista_grupos = this.lista_grupos.concat(data['groups']);
        
      }
    })
     
  }

  crearGrupos(){
    const ventanaGrupos =  this.dialog.open(CrearGruposComponent, {
      width: '100vh',
      height: '50vh',
    })
  }


  obtenerSucursales(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.get(this.clienteWAService.DJANGO_SERVER_OBTENER_SUCURSALES, {headers})
    .subscribe({
      next: (res:any)=>{
        this.lista_sucursales = this.lista_sucursales.concat(res);
      }
    })
  }



  //Metodo para verificar los cargos de trabajo del personal


  //Metodo para reporte de tipo de personal
  convertir_reporte_cargos_trabajo(diccionario_cargos_trabajo: Map<string, boolean>){
    console.log(diccionario_cargos_trabajo)
    var reporte_detalles: string = "Cargos de trabajo del personal" + " => "
    for(let [key, value] of diccionario_cargos_trabajo){
      console.log(key + " " + value)
      if(value == true){
        reporte_detalles += key + " | "
      }
    }
    console.log(reporte_detalles)
    return reporte_detalles
  }

   /*validar si fecha escogida indica si usuario es mayor de edad */
  validacionFecha(control: any){

    
    if(control){
      const date = moment(control).format('DD-MM-YYYY')
      //console.log("Fecha introducida: " + date)
      //this.user.fechaNac=date.replace("-","/").toString()
      const diaEscogido: number = parseInt(date.split('-')[0])
      const mesEscogido: number = parseInt(date.split('-')[1])
      const anioEscogido: number = parseInt(date.split('-')[2])
      const today = moment().format('DD-MM-YYYY')
      //console.log("Fecha de hoy: " + today)
      const diaActual: number = parseInt(today.split('-')[0])
      const mesActual: number = parseInt(today.split('-')[1])
      const anioActual: number = parseInt(today.split('-')[2])
      const restaAnio = anioActual - anioEscogido
      const restaMes = mesActual - mesEscogido
      const restaDia = diaActual - diaEscogido
      if(restaAnio > 18){
        console.log("Es mayor de edad")
        this.esMayorEdad=true
        //console.log("conf",this.esMayorEdad)
        return null
      }
      if ((restaAnio == 18) && (restaMes >= 0) && (restaDia >= 0)){
        //console.log("Es mayor de edad")
        this.esMayorEdad=true
        //console.log("conf",this.esMayorEdad)

        return null/*{ 'validDate': true}*/
      }
      this.esMayorEdad=false
    }
    this.esMayorEdad=false
    //console.log("conf",this.esMayorEdad)

    let mensajeError = "Debe ser mayor de edad"
    //console.log("No es mayor de edad")
    //this.esMayorEdad=false
    return mensajeError/*{'validDate': false};*/
  }


  //Encontrar sucursal seleccionada de la lista de sucursales
  encontrar_Sucursal(direccion_seleccionada: any){
    let info_Sucursal
    this.lista_Sucursales?.forEach( (sucursal) => {
      if(sucursal.direccion == direccion_seleccionada){
        info_Sucursal = sucursal
      }
    })
    return info_Sucursal
  }


  //Hacer funcion para obtener los checkbox seleccionados de licencias mediante el id de los checkboxs
  
  validar_licencia_conduccion(){
    var checkBox_Conduccion = document.getElementById("flexRadioDefault1") as HTMLInputElement | null;

    if(checkBox_Conduccion?.checked == true){
      return true;
    }  
    return false;
  }

  validar_licencia_armamento(){
    var checkBox_Armamento = document.getElementById("flexRadioDefault2") as HTMLInputElement | null;

    if(checkBox_Armamento?.checked == true){
      return true;
    }  
    return false;
  }

  cuentaCreada(exito: boolean){
    let element = document.getElementById("mensajeDeConfirmacion");
    //let hidden = element?.getAttribute("hidden");

    if(exito){
      element?.setAttribute("mensajeDeConfirmacion", "hidden")
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "La cuenta se ha creado exitosamente"
      }
    }else{
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "La cuenta no se ha creado"
      }
    }
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate() + 1),
      ].join('-')
    );
  }

  //
  setImagen(event: any){
    /*this.user.fotoOp = event.target.files[0];
    this.registerForm.get('fotoOp')?.setValue(this.user.fotoOp);*/
  }

}
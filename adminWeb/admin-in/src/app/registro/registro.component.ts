import { Component, OnInit } from '@angular/core';
import { from, VirtualTimeScheduler } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ClienteWAService } from '../services/cliente-wa.service';
import * as moment from "moment";
import { SucursalModel } from '../models/sucursal.model';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Lista de sucursales para el registro
  lista_Sucursales?: SucursalModel[];

  sucursal_De_Admin = ""

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
  
  user: RegisterModel = new RegisterModel();
  direccion: string = 'a@a.com';
  fechaRegistro: string = '2000-09-01';
  rol: string ='1';

  //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
  camposCompletos: boolean = false;
  terminosAceptados: boolean = false;
  ppp: boolean = false;
  //varComb: boolean = this.varPUno && this.varPDos;

  terminosValidados: boolean = false;

  registerForm!: FormGroup;
  hide = true;
  //Indicador si registro fue guardado en la base de datos o no
  submitted = false;

  //Bandera creada para indicar que la cuenta fue creada y así cambiar el mensaje de retroalimentacion
  exito = false;

  esMayorEdad: boolean = false;
  p: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'apellidos': [this.user.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'nombres': [this.user.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'cedula': [this.user.cedula, [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
      'fechaNac': [this.user.fechaNac, []],
      'sexo': [this.user.sexo, [Validators.required]],
      'correo': [this.user.correo, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')/*, Validators.email*/]],
      'telefono': [this.user.telefono, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$')]],
      'contrasenha': [this.user.contrasenia, [Validators.required, Validators.minLength(8)]],
    });
    this.validarTerminosyCondiciones();
    this.permitirRegistro();
    this.obtener_Sucursales_Request();
  }

  onRegisterSubmit(){
    /*alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user + ' ' + 
    this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenia + ' ' +  this.direccion + ' ' +
    this.fechaRegistro + ' ' + this.rol);*/
  }

  /*Función para guardar usuario nuevo que se registre */
  guardarUsuario(): void {
    let elem = document.getElementById("mensajeDeConfirmacionDos") 
    if(elem?.innerHTML != undefined){
      elem.innerHTML = " ";
    }
    this.camposCompletos = !this.registerForm.invalid;
    const data = {
      apellidos : this.user.apellidos,
      nombres : this.user.nombres,
      cedula : this.user.cedula,
      fechaNac : this.user.fechaNac,
      sexo : this.user.sexo,
      correo : this.user.correo,
      telefono : this.user.telefono,
      contrasenia : this.user.contrasenia,

      direccion : this.user.correo,
      rol : '1'
    };
    console.log("entra")
    console.log(data)
    console.log("Sucursal escogida")
    console.log(this.sucursal_De_Admin)
    console.log("Fecha valida:" )
    console.log("Campos completos: "+this.camposCompletos)
    console.log("Terminos aceptados:")
    this.validarAceptacionDeTerminos();
    //Se han completado los campos y se han aceptado los términos de la empresa
    if(this.camposCompletos && this.terminosAceptados){
      console.log(data+"prueba")
      this.clienteWAService.create(data)

        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            this.exito = true;
            this.cuentaCreada(this.exito)
           
            this.registerForm.reset()
          },
          error: (e) => {
            console.error(e.error.cedula)
            console.error(e)
            console.error(e.error)
            
            this.mensajeError = e.error.cedula
            this.mensajeErrorCorreo = e.error.correo
            if(this.mensajeError != undefined){
              let elemento_Error_Cedula = document.getElementById("mensajeDeConfirmacionDos") 
              if(elemento_Error_Cedula?.innerHTML != undefined){
                elemento_Error_Cedula!.innerHTML = this.mensajeError
              }
              //console.log(this.mensajeError)
              //alert(this.mensajeError)
            }
            if(this.mensajeErrorCorreo != undefined){
              let elemento_Error_Correo = document.getElementById("mensajeDeConfirmacionDos") 
              if(elemento_Error_Correo?.innerHTML != undefined){
                elemento_Error_Correo!.innerHTML = this.mensajeErrorCorreo
              }
              //console.log(this.mensajeErrorCorreo)
              //alert(this.mensajeErrorCorreo)
            }
          }
        });
    } else{
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "Debe completar los campos y aceptar los términos y condiciones"
      }
    }
    if(this.submitted){
      console.log("Datos guardados")
    } else {
      console.log("Datos no guardados")
      
    }
  }




  validarTerminosyCondiciones(): void{
    var checkBox = document.getElementById("invalidCheck") as HTMLInputElement | null;
    if(checkBox?.checked == true){
      console.log("checkeado")
      this.terminosValidados = true;
    }  
    if(!checkBox?.checked == true){
      console.log("no checkeado")
      this.terminosValidados = false;
    } 
  }

  permitirRegistro(): void{
    console.log("entra a fucnion")
    var botonRegistro = document.querySelector("#botonRegistro") as HTMLInputElement | null;
    /*Caso en el que se deba habilitar el boton */
    if(!this.registerForm  && !this.terminosValidados){
      if(botonRegistro != undefined){
        console.log("se ha habilitado el boton")
        botonRegistro.disabled = false;
      }
    } else{
      if(botonRegistro != undefined){
        console.log("boton deshabilitado")
        console.log(this.registerForm)
        console.log(this.terminosValidados)
        botonRegistro.disabled = false;
      }
    }
  }

  validarAceptacionDeTerminos(){
    const varValid = document.querySelector('#invalidCheck') as HTMLInputElement | null;
    if(varValid != null){
      this.terminosAceptados = varValid.checked
      console.log(varValid.checked);
    }
  }
  

  /*validar si fecha escogida indica si usuario es mayor de edad */
  validacionFecha(control: any){

    console.log(control)
    if(control){
      const date = moment(control).format('DD-MM-YYYY')
      console.log("Fecha introducida: " + date)
      const diaEscogido: number = parseInt(date.split('-')[0])
      const mesEscogido: number = parseInt(date.split('-')[1])
      const anioEscogido: number = parseInt(date.split('-')[2])
      const today = moment().format('DD-MM-YYYY')
      console.log("Fecha de hoy: " + today)
      const diaActual: number = parseInt(today.split('-')[0])
      const mesActual: number = parseInt(today.split('-')[1])
      const anioActual: number = parseInt(today.split('-')[2])
      const restaAnio = anioActual - anioEscogido
      const restaMes = mesActual - mesEscogido
      const restaDia = diaActual - diaEscogido
      if(restaAnio > 18){
        console.log("Es mayor de edad")
        this.esMayorEdad=true
        console.log("conf",this.esMayorEdad)
        return null
      }
      if ((restaAnio == 18) && (restaMes >= 0) && (restaDia >= 0)){
        console.log("Es mayor de edad")
        this.esMayorEdad=true
        console.log("conf",this.esMayorEdad)

        return null/*{ 'validDate': true}*/
      }
      this.esMayorEdad=false
    }
    this.esMayorEdad=false
    console.log("conf",this.esMayorEdad)

    let mensajeError = "Debe ser mayor de edad"
    console.log("No es mayor de edad")
    //this.esMayorEdad=false
    return mensajeError/*{'validDate': false};*/
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

  //Obtener sucursales desde un request
  obtener_Sucursales_Request(): void{
    this.clienteWAService.obtener_Sucursales()
    .subscribe({
      next: (data) => {
        this.lista_Sucursales = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
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


}



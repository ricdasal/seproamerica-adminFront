import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SucursalModel } from '../../models/sucursal.model';
import { PersonalOpModel } from '../../models/personalOp.models';
import { FormGroup } from '@angular/forms';
import * as moment from "moment";
import { ClienteWAService } from '../../services/cliente-wa.service';
import { FormBuilder } from '@angular/forms';
import { InfPersonalService } from '../../services/inf-personal.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-personal-admin-registro',
  templateUrl: './personal-admin-registro.component.html',
  styleUrls: ['./personal-admin-registro.component.css']
})
export class PersonalAdminRegistroComponent implements OnInit {

  //Variable para el modal
  display = 'none';

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

  //Variables para crear a administrador en tabla PersonalAdministrativo
  var_inicioOperaciones = new Date();
  var_fechaModificacion = new Date();

  lista_sucursales = ['norte', 'sur'];
  lista_cargos = ['administrador'];
  lista_grupos = [];
  lista_generos = ['masculino', 'femenino', 'No definido'];

  constructor(private formBuilder: FormBuilder, 
    private _infPersonalService: InfPersonalService,
    private router:Router,
    private clienteWAService: ClienteWAService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'first_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')/*, Validators.email*/]],
      'password': [null, [Validators.required, Validators.minLength(8)]],
      'phone_number': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(13), Validators.pattern(/^(09|\+5939)([0-9]){8}$/)]], //Validators.pattern('^(0){1}(9){1}[0-9]{8}$')
      'dni': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), Validators.pattern(/^([0-9]{10})$/)]],
      'birthdate': [null, [Validators.required]],
      'gender': [null, [Validators.required]],
      'address': [null, [Validators.required]],
      'charge' : ["administrador", ],
      'branch' : [null, [Validators.required]],
      'group' : ["administrador", ],
      
      


    });

    this.obtenerGrupos();
  }

  guardarUsuario(form:any): void {
    console.log(form.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.post(`${this.clienteWAService.DJANGO_SERVER_CREAR_PERSONAL_ADMINISTRADOR}`, form.value, {headers})
    .subscribe( (res: any) => {
      console.log(res);
      
    })
  }

  obtenerGrupos(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_GRUPOS}`, {headers}).subscribe({
      next: (data: any) => {
        this.lista_grupos = this.lista_grupos.concat(data['groups']);
      }
    })
  }


  //Funcion para crear administrador en tabla personal administrativo si aun no existe
  crear_Admin_En_Tabla(inicio_Operaciones_Admin: Date, cedula_Admin: String, fecha_Modificacion_Admin: Date, sucursal_elegida: number){
    let existe_admin = 0

    let data_Admin = {
      inicio_Operaciones : inicio_Operaciones_Admin,
      sucursal : sucursal_elegida,
      cedula : cedula_Admin,
      cargo: 1,
      estado : 1,
      fecha_Modificacion : fecha_Modificacion_Admin
    };

    this.clienteWAService.obtener_Administrador(cedula_Admin)
    .subscribe({
      next: (data) => {
        console.log(data)
        console.log("Administrador ya existe en tabla Personal Administrativo")
        existe_admin = 1
        console.log(existe_admin)
      },
      error: (e) => {
        console.error(e)
        console.log("Administrador no ha sido registrado, por ende se procede a registrarlo en la tabla de Personal Administrativo")
        this.clienteWAService.registrar_administrador(data_Admin)
        .subscribe({
          next: (res) => {
            console.log(res)
          },
          error: (e) => console.error(e)
        });
      }
    });
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

  //Obtener sucursales desde un request
  obtener_Sucursales_Request(): void{
    /*this.clienteWAService.obtener_Sucursales()
    .subscribe({
      next: (data) => {
        this.lista_Sucursales = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });*/
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





   /*validar si fecha escogida indica si usuario es mayor de edad */
   validacionFecha(control: any){

    console.log(control)
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

  //
  setImagen(event: any){
    /*this.user.fotoOp = event.target.files[0];
    this.registerForm.get('fotoOp')?.setValue(this.user.fotoOp);*/
  }

}


/*codigo legacy rescatado*/

/*Funcion guardar usuario legacy: */
    /*let elem = document.getElementById("mensajeDeConfirmacionDos") 
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
    //Se han completado los campos y se han aceptado los términos de la empresa
    if(this.camposCompletos){
      console.log(data+"prueba")
      this.clienteWAService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            this.exito = true;
            this.cuentaCreada(this.exito)
           
            this.registerForm.reset()

            let elem_confirmacion_registro = document.getElementById("mensajeDeConfirmacionDos")
            if(elem_confirmacion_registro?.innerHTML != undefined){
              elem_confirmacion_registro!.innerHTML = "Personal Administrativo registrado exitosamente"
            }

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
        this.crear_Admin_En_Tabla(this.var_inicioOperaciones, this.user.cedula.toString(), this.var_fechaModificacion, Number(this.sucursal_De_Admin))
    } else{
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "Llene correctamente los campos solicitados"
      }
    }
    if(this.submitted){
      console.log("Datos guardados")
    } else {
      console.log("Datos no guardados")
      
    }*/


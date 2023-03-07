import { Component, OnInit } from '@angular/core';
import { from, VirtualTimeScheduler } from 'rxjs';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ClienteWAService } from '../services/cliente-wa.service';
import * as moment from "moment";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  //Mensaje de error
  mensajeError = "";
  mensajeErrorCorreo = "";
  editable:boolean=false
  actualizado!:boolean | null


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

  esMayorEdad: boolean = false;
  p: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router:Router
    ) { }

    ngOnInit(): void {
      const datosUsuario=JSON.parse(localStorage.getItem("datoUsuario")!)
      this.user.apellidos=datosUsuario.apellidos
      this.user.nombres=datosUsuario.nombres
      this.user.cedula=datosUsuario.cedula
      this.user.fechaNac=datosUsuario.fechaNac
      this.user.sexo=datosUsuario.sexo
      this.user.correo=datosUsuario.correo
      this.user.telefono=datosUsuario.telefono
      this.user.contrasenia=datosUsuario.contrasenia
     
      
      this.registerForm = this.formBuilder.group({
        'apellidos': {value:[this.user.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],disabled:!this.editable},
        'nombres': {value:[this.user.nombres, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],disabled:!this.editable},
        'cedula': {value:[this.user.cedula, [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]],disabled:!this.editable},
        'fechaNac': {value:[this.user.fechaNac, []],disabled:!this.editable},
        'sexo': {value:[this.user.sexo, [Validators.required]],disabled:!this.editable},
        'correo': {value:[this.user.correo, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')/*, Validators.email*/]],disabled:!this.editable},
        'telefono': {value:[this.user.telefono, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$')]],disabled:!this.editable},
        'contrasenha': {value:[this.user.contrasenia, [Validators.required, Validators.minLength(8)]],disabled:!this.editable},
  
      });
      
  
      //this.registerForm.disable()
    }

 
  /*Función para guardar usuario nuevo que se registre */
  
  actualizarDatos(): void {
    this.guardar()
    console.log(this.registerForm.valid)
    this.camposCompletos = !this.registerForm.invalid;
    console.log(this.camposCompletos)
    //Informacion actualizada a enviar 
    const usuarioInfoActualizada  = {
      apellidos: this.user.apellidos,
      nombres: this.user.nombres,
      cedula: this.user.cedula,
      fechaNac: this.user.fechaNac,
      sexo: this.user.sexo,
      correo: this.user.correo,
      telefono: this.user.telefono,
      contrasenia: this.user.contrasenia,
      direccion : this.user.correo,
      rol : '1'
    };

    if(this.camposCompletos){
      //this.camposCompletos = false
      this.clienteWAService.update(this.user.correo, usuarioInfoActualizada)
      .subscribe({//Esto me devuelve el objeto cambiado
        next: (res) => {
          console.log("Se han guardado los datos")
          console.log("Info actualizada: "+ res);
          /*Actualizar datos a mostrar en la pagina de perfil*/
          this.user.apellidos = res.apellidos
          this.user.nombres = res.nombres
          this.user.cedula = res.cedula
          this.user.fechaNac = res.fechaNac
          this.user.sexo = res.sexo
          this.user.telefono = res.telefono
          this.user.contrasenia = res.contrasenia
          res.rol = 2
          this.actualizado=true

          //alert("Datos actualizados exitosamente")
          localStorage.setItem("datoUsuario", JSON.stringify(usuarioInfoActualizada))
          this.authService.infoPutUsuario(usuarioInfoActualizada)
           
        },
        error: (e) => {
          this.actualizado=false
          console.log(e)
        }
      })
    } else{
      this.actualizado=false
      alert("Datos no válidos o campos incorrectos")
    }
  }

/*Funcion que habilita el modo para editar*/
editar(){
  this.editable=!this.editable
  this.registerForm.enable()
  //this.registerForm.get("apellidos")!.disabled
}

guardar(){
  this.editable=false
  this.registerForm.disable()
}

reset(){
  this.actualizado=null
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

  logout(){
    localStorage.clear()
    this.cookieService.deleteAll()
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}



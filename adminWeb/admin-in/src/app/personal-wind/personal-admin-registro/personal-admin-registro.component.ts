import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SucursalModel } from '../../models/sucursal.model';
import { FormGroup } from '@angular/forms';
import { ClienteWAService } from '../../services/cliente-wa.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from '../../models/register.model';
import { CedulaLongitud, CedulaValidator, ageValidator, telefonoCelularValidator } from '../funciones-utiles';
import { MatDialogRef } from '@angular/material/dialog';

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

  lista_sucursales: Array<any> = [];
  lista_cargos = ['administrador'];
  lista_grupos = [];
  lista_generos = ['masculino', 'femenino', 'No definido'];

  constructor(
    private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    private http: HttpClient,
    public matDialogRef: MatDialogRef<any>
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'first_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')/*, Validators.email*/]],
      'password': [null, [Validators.required, Validators.minLength(8)]],
      'phone_number': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(13),telefonoCelularValidator]], //Validators.pattern('^(0){1}(9){1}[0-9]{8}$')
      'dni': [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.pattern(/^([0-9]{10})$/), CedulaValidator,  CedulaLongitud]],
      'birthdate': [null, [Validators.required, ageValidator(18)]],
      'gender': [null, [Validators.required]],
      'address': [null, [Validators.required]],
      'charge' : ["administrador", ],
      'branch' : [null, [Validators.required]],
      'group' : ["administrador", ],
      'url_img': [""]
    });

    this.obtenerGrupos();
    this.obtenerSucursales();
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
    /*const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_GRUPOS}`, {headers}).subscribe({
      next: (data: any) => {
        this.lista_grupos = this.lista_grupos.concat(data['groups']);
      }
    })*/
  }

  obtenerSucursales(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.get(this.clienteWAService.DJANGO_SERVER_OBTENER_SUCURSALES, {headers})
    .subscribe({
      next: (res: any)=>{
        this.lista_sucursales = this.lista_sucursales.concat(res);
      }
    })
  }

    setImagen(event: any){
    /*this.user.fotoOp = event.target.files[0];
    this.registerForm.get('fotoOp')?.setValue(this.user.fotoOp);*/

    if (event.target !== null) {
      let file = event.target.files[0];
      console.log(file)
      let reader = new FileReader();
      
      reader.onload = () => {
        let dataUrl = reader.result as string;
        let base64String = dataUrl.split(',')[1];
  
        // Determinar el prefijo en función del tipo de contenido del archivo
        let prefix;
        if (file.type === 'image/jpeg') {
          prefix = 'data:image/jpeg;base64,';
        } else if (file.type === 'image/png') {
          prefix = 'data:image/png;base64,';
        } else {
          console.error('Formato de imagen no válido');
          return;
        }
  
        // Agregar el prefijo a la imagen en base64
        let imageBase64 = prefix + base64String;
        console.log(imageBase64);
        
        // this.registerForm.value["url_img"].setValue(imageBase64);
        // this.registerForm.value["url_img"] = imageBase64;
        this.registerForm.get('url_img')?.setValue(imageBase64);

        
      }
      reader.onerror = (event) => {
        if (event.target !== null) {
          console.error('Error al leer el archivo:', event.target.error);
        }
      }
      reader.readAsDataURL(file);
    }
  }

  onClickNo(){
    this.matDialogRef.close();
  }

}

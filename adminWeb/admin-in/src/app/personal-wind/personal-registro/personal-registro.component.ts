import { Component, OnInit } from '@angular/core';
import { PersonalOpModel } from 'src/app/models/personalOp.models';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import * as moment from "moment";
import { InfPersonalService } from 'src/app/services/inf-personal.service';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearGruposComponent } from '../../configuraciones-wind/crear-grupos/crear-grupos.component';
import { CedulaValidator, CedulaLongitud, ageValidator, telefonoCelularValidator } from '../funciones-utiles';
import { MensajeConfirmacionCrearComponent } from 'src/app/components/modals/mensaje-confirmacion-crear/mensaje-confirmacion-crear.component';
import { MensajeErrorComponent } from 'src/app/components/modals/mensaje-error/mensaje-error.component';

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
    public dialog: MatDialog,
    public matDialogRef: MatDialogRef<any>
    ) { 
      console.log(router.url)
    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'first_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]],
      'phone_number': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), telefonoCelularValidator]],
      'dni': [null, [Validators.required, CedulaValidator,  CedulaLongitud]],
      'birthdate': [null, [Validators.required,  ageValidator(18)]],
      'gender': [null, [Validators.required]],
      'address': [null, [Validators.required]],
      'charge':[null, [Validators.required ]],
      'branch' : [null,  [Validators.required]],
      'url_img': [""]     
    });
    
    this.cargos_trabajo_seleccionado.set('guardia', false)
    this.cargos_trabajo_seleccionado.set('guardaespaldas', false)
    this.cargos_trabajo_seleccionado.set('conductor', false)
    this.cargos_trabajo_seleccionado.set('motorizado', false)

    console.log(this.lista_Sucursales);
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
        const ventanaConfirmacion = this.dialog.open(MensajeConfirmacionCrearComponent,{
          data: "Personal",
          width: '70vh',
          height: '50vh',
        })
        this.onClickNo()

      },
      error => {
        console.log(error);
        const ventanaError = this.dialog.open(MensajeErrorComponent, {
          data: error,
          width: '80vh',
          height: '50vh',
        })
      }
    )
  }

  
  obtenerCargos(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.request('GET',"https://seproamerica2022.pythonanywhere.com/users/chargeList/", {headers})
    .subscribe({
      next: (data: any) => {
        console.log(data)
        this.lista_cargos = this.lista_cargos.concat(data);
        this.lista_grupos = this.lista_grupos.concat(data);
        
      }
    })
     
  }

  crearGrupos(){
    const ventanaGrupos =  this.dialog.open(CrearGruposComponent, {
      width: '150vh',
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




  //
  setImagen(event: any){
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
  
        // Aquí va el endpoint (POST)
        // this.registerForm.value["url_img"].setValue(imageBase64);
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
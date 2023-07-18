import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { CedulaValidator, CedulaLongitud, ageValidator, telefonoCelularValidator } from '../../funciones-utiles';
import { MensajeConfirmacionComponent } from 'src/app/components/modals/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  lista_sucursales: Array<any> = [];
  lista_cargos: Array<any> = [];

  registerForm!: FormGroup;
  hide = true;
  lista_generos: Array<any> = ['masculino', 'femenino', 'No definido'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public admin: any,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    private http: HttpClient,
    public dialog: MatDialog
    
  ) { }


  ngOnInit(): void {
    console.log(this.admin);
    this.obtenerSucursales();
    this.registerForm = new FormGroup({
      id: new FormControl(this.admin.id),
      first_name: new FormControl(this.admin.first_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      last_name: new FormControl(this.admin.last_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl(this.admin.email, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]),
      password: new FormControl(this.admin.password, [Validators.required, Validators.minLength(8)]),
      phone_number: new FormControl(this.admin.phone_number, [Validators.required, Validators.minLength(9), Validators.maxLength(13), Validators.pattern(/^(09|\+5939)([0-9]){8}$/), telefonoCelularValidator]),
      dni: new FormControl(this.admin.dni, [Validators.required, Validators.pattern('^(09|125)[0-9]*$'), CedulaValidator,  CedulaLongitud]),
      birthdate: new FormControl(this.admin.birthdate, [Validators.required, ageValidator(18)]),
      gender: new FormControl(this.admin.gender, [Validators.required]),
      address: new FormControl(this.admin.address, [Validators.required]),
      charge: new FormControl("administrador"),
      branch: new FormControl(this.admin.branch, [Validators.required]),
      group: new FormControl("administrador"),
      url_img: new FormControl(this.admin.url_img)



    })

    
  }

  editarAdmin(registerForm: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_ADMINISTRADOR}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
        this.dialog.open(MensajeConfirmacionComponent, {
          data: "Administrador",
          width: '70vh',
          height: '50vh',
        });
      }
    })

    this.onClickNO()
  }

  onClickNO(): void{
    this.dialogRef.close();
    
  }

  obtenerSucursales(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.get(this.clienteWAService.DJANGO_SERVER_OBTENER_SUCURSALES, {headers})
    .subscribe({
      next: (res)=>{
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

  


}


@Component({
  selector: 'app-dialogo-confirmacion-dialog',
  templateUrl: '../../personal-confirmacion.html',
})
export class DialogoConfirmacionComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public message: any,
  ){

  }

  onClickNO(): void{
    this.dialogRef.close();
    
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { CedulaLongitud, CedulaValidator, ageValidator, telefonoCelularValidator } from '../../funciones-utiles';
import { DialogoConfirmacionComponent } from '../edit-admin/edit-admin.component';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.css']
})
export class EditPersonalComponent implements OnInit {

  lista_sucursales: Array<any> = [
  ]

  lista_generos = ['masculino', 'femenino', 'No definido'];

  lista_cargos: any = [

  ]

  lista_grupos: any = [

  ]

   registerForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public personal: any,
    private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    public dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.personal);
    
    this.obtenerCargos();
    this.obtenerSucursales();
    this.registerForm = this.formBuilder.group({
      'id': [this.personal.id],
      'first_name': [this.personal.first_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [this.personal.last_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [this.personal.email, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]],
      'phone_number': [this.personal.phone_number, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$'), telefonoCelularValidator]],
      'dni': [this.personal.dni, [Validators.required, Validators.pattern('^(09|125)[0-9]*$'), CedulaValidator,  CedulaLongitud]],
      'birthdate': [this.personal.birthdate, [Validators.required, ageValidator(18)]],
      'gender': [this.personal.gender, [Validators.required]],
      'address': [this.personal.address, [Validators.required]],
      'charge':[this.personal.charge, [Validators.required ]],
      'branch' : [this.personal.branch,  [Validators.required]],  
      'url_img' : [this.personal.url_img]   
    });
  }

  editarPersonal(registerForm: any){
    
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_PERSONAL_OPERATIVO}`, registerForm.value, {headers})
    .subscribe({
      next: (res: any) =>{
        console.log(res);
        this.dialog.open(DialogoConfirmacionComponent, {
          data: res.message
        });
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

}

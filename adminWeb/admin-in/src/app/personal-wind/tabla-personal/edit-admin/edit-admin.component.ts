import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

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
    
  ) { }

  ngOnInit(): void {
    this.obtenerSucursales();

    this.registerForm = this.formBuilder.group({
      'id': [this.admin.id],
      'first_name': [this.admin.first_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [this.admin.last_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [this.admin.email, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')/*, Validators.email*/]],
      'password': [this.admin.password, [Validators.required, Validators.minLength(8)]],
      'phone_number': [this.admin.phone_number, [Validators.required, Validators.minLength(9), Validators.maxLength(13), Validators.pattern(/^(09|\+5939)([0-9]){8}$/)]], //Validators.pattern('^(0){1}(9){1}[0-9]{8}$')
      'dni': [this.admin.dni, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), Validators.pattern(/^([0-9]{10})$/)]],
      'birthdate': [this.admin.birthdate, [Validators.required]],
      'gender': [this.admin.gender, [Validators.required]],
      'address': [this.admin.address, [Validators.required]],
      'charge' : ["administrador", ],
      'branch' : [this.admin.branch, [Validators.required]],
      'group' : ["administrador", ],
    })
  }

  editarAdmin(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_ADMINISTRADOR}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
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

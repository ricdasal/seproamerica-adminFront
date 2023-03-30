import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

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
    this.registerForm = this.formBuilder.group({
      'id': [this.personal.id],
      'first_name': [this.personal.first_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'last_name': [this.personal.last_name, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'email': [this.personal.email, [Validators.required, Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]],
      'phone_number': [this.personal.phone_number, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$')]],
      'dni': [this.personal.dni, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^(09|125)[0-9]*$')]],
      'birthdate': [this.personal.birthdate, [Validators.required]],
      'gender': [this.personal.gender, [Validators.required]],
      'address': [this.personal.address, [Validators.required]],
      'charge':[this.personal.charge, [Validators.required ]],
      'branch' : [this.personal.branch,  [Validators.required]],     
    });
    this.obtenerCargos();
    this.obtenerSucursales();
  }

  editarPersonal(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_PERSONAL_OPERATIVO}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
      }
    })

  }

  setImagen(event: any){
    /*this.user.fotoOp = event.target.files[0];
    this.registerForm.get('fotoOp')?.setValue(this.user.fotoOp);*/
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

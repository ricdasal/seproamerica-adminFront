import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public cuentaTelefono: any,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
  ) { }

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'id': [this.cuentaTelefono.id],
      'first_name': [this.cuentaTelefono.first_name, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'email': [this.cuentaTelefono.email, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'password': [this.cuentaTelefono.password, [Validators.required,Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]],
    });
  }

  editarCuenta(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_CUENTAS}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
      }
    })
  }

  onClickNO(): void{
    this.dialogRef.close();
  }

 
}

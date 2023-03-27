import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    private clienteWAService: ClienteWAService, 
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'email': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'password': [null, [Validators.required,Validators.pattern('^([a-zA-Z0-9_\.-]+)@([a-z0-9]+)\\.([a-z\.]{2,6})$')]],
      
         
    });
  }

  registrarCuenta(registerForm: any): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.post(`${this.clienteWAService.DJANGO_SERVER_CREAR_CLIENTE_CELULAR}`, registerForm.value, {headers})
    .subscribe({
      next: (response) =>{
        console.log(response);
      }
    })
   
  }

  
  onClickNO(): void{
    this.dialogRef.close();
  }

}

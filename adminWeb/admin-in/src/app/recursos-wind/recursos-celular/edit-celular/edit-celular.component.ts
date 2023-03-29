import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-edit-celular',
  templateUrl: './edit-celular.component.html',
  styleUrls: ['./edit-celular.component.css']
})
export class EditCelularComponent implements OnInit {

  lista_sucursales: Array<any> = [];
  registerForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public celular: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'id': [this.celular.id],
      'brand': [this.celular.brand, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'model': [this.celular.model, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'phone_number':[this.celular.phone_number, [Validators.required]],
      'color': [this.celular.color, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'purchase_date': [this.celular.purchase_date, [Validators.required,Validators.pattern('^[0-9]*$')]],
      'branch': [this.celular.branch, Validators.required]
         
    });
    this.obtenerSucursales()
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

  onClickNO(): void{
    this.dialogRef.close();
    }

  editarCelular(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_CELULAR}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
      }
    })

  }

}

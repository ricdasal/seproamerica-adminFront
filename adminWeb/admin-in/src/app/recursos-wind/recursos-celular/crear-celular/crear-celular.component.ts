import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CandadoModel } from 'src/app/models/candado.model';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-crear-celular',
  templateUrl: './crear-celular.component.html',
  styleUrls: ['./crear-celular.component.css']
})
export class CrearCelularComponent implements OnInit {
  lista_sucursales = ['norte', 'sur'];
  registerForm!: FormGroup;
  hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;
    candado: CandadoModel = new CandadoModel();
    p: boolean = false;
    camposCompletos: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _inventarioService: InventarioService,
    public dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'brand': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'model': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'phone_number':[null, [Validators.required]],
      'color': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'purchase_date': [null, [Validators.required,Validators.pattern('^[0-9]*$')]],
      'branch': [null, Validators.required]
         
    });
  }




onClickNO(): void{
this.dialogRef.close();
}

crearCelular(registerForm: any){
  console.log(registerForm.value)
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  });

  this.http.post(`${this.clienteWAService.DJANGO_SERVER_CREAR_CELULAR}`, registerForm.value, {headers})
  .subscribe({
    next: (data)=>{
      console.log(data);
    }
  })

}


}

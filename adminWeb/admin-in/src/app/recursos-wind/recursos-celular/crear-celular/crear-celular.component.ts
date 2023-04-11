import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CandadoModel } from 'src/app/models/candado.model';
import { telefonoCelularValidator } from 'src/app/personal-wind/funciones-utiles';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-crear-celular',
  templateUrl: './crear-celular.component.html',
  styleUrls: ['./crear-celular.component.css']
})
export class CrearCelularComponent implements OnInit {
  lista_sucursales: Array<any> = [];
  lista_marcas: Array<any> = [];
  lista_colors: Array<any> = [];
  registerForm!: FormGroup;
  hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;
    candado: CandadoModel = new CandadoModel();
    p: boolean = false;
    camposCompletos: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'brand': [null, [Validators.required, ]],
      'model': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'phone_number':[null, [Validators.required, telefonoCelularValidator]],
      'color': [null, [Validators.required,]],
      'purchase_date': [null, [Validators.required,Validators.pattern('^[0-9]*$')]],
      'branch': [null, Validators.required]
         
    });
    this.obtenerColores();
    this.obtenerMarca();
    this.obtenerSucursales();
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

obtenerMarca(){
  this.clienteWAService.obtenerMarcaTelefono()
  .subscribe({
   next: (res: any) => {
     this.lista_marcas = this.lista_marcas.concat(res.brands)
   }
  })
}

obtenerColores(){
 this.clienteWAService.obtenerColoresEquipamento()
 .subscribe({
   next: (res: any) => {
     this.lista_colors = this.lista_colors.concat(res.colors)
   }
 })
}


}

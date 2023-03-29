import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-edit-vehiculos',
  templateUrl: './edit-vehiculos.component.html',
  styleUrls: ['./edit-vehiculos.component.css']
})
export class EditVehiculosComponent implements OnInit {

  disableSelect = new FormControl(false);
  disableField: boolean = false;
  nameFormControl = new FormControl('', [Validators.required, Validators.email]);
  registerForm!: FormGroup;
  lista_sucursales: Array<any> = [];


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public vehiculo: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
  ) { }

  ngOnInit(): void {
    this.obtenerSucursales();
    this.registerForm = this.formBuilder.group({

      'id': [this.vehiculo.id],
      'plate': [this.vehiculo.plate, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'brand': [this.vehiculo.brand, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'model': [this.vehiculo.model, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'color': [this.vehiculo.color, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'year': [this.vehiculo.year, [Validators.required, Validators.minLength(4),Validators.pattern('^[0-9]*$')]],
      'branch': [this.vehiculo.branch, [Validators.required]],
      'category': [this.vehiculo.category, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'engine': [this.vehiculo.engine, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'gas_tank_capacity': [this.vehiculo.gas_tank_capacity, [Validators.required, ]],

         
    });
    
  }

  editarVehiculo(registerForm: any){
    console.log(registerForm.value);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_VEHICULO}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
      }
    })
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

  onClickNO(): void{
    this.dialogRef.close();
  }

}

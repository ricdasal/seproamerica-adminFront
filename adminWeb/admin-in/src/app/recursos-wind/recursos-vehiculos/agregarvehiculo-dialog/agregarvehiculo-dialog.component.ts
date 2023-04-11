import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { InventarioService } from '../../../services/inventario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-agregarvehiculo-dialog',
  templateUrl: './agregarvehiculo-dialog.component.html',
  styleUrls: ['./agregarvehiculo-dialog.component.css']
})
export class AgregarvehiculoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AgregarvehiculoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private formBuilder: FormBuilder,
    private _inventarioService: InventarioService,
    private http: HttpClient,
    private clienteWAService: ClienteWAService
    ) { }

    camposCompletos: boolean = false;
    lista_sucursales: Array<any> = [];
    lista_colores: Array<any> = [];
    lista_categoria: Array<any> = [];
    lista_marcas: Array<any> = [];
    lista_motor: Array<any> = [];

    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;

    p: boolean = false;
  
    ngOnInit(): void {
      this.obtenerSucursales();
      this.obtenerCategoria();
      this.obtenerColores();
      this.obtenerMarcas();
      this.obtenerMotor();
      this.registerForm = this.formBuilder.group({

        'plate': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'brand': [null, [Validators.required, ]],
        'model': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [null, [Validators.required, ]],
        'year': [null, [Validators.required, Validators.minLength(4),Validators.pattern('^[0-9]*$')]],
        'branch': [null, [Validators.required]],
        'category': [null, [Validators.required, ]],
        'engine': [null, [Validators.required, ]],
        'gas_tank_capacity': [null, [Validators.required, ]],

           
      });
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

    registrarVehiculo(registerForm: any){
      console.log(registerForm.value)
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.post(`${this.clienteWAService.DJANGO_SERVER_CREAR_VEHICULO}`, registerForm.value, {headers})
      .subscribe({
        next: (data)=>{
          console.log(data);
        }
      })
    }

    
  obtenerColores(){
    this.clienteWAService.obtenerColoresEquipamento()
    .subscribe({
      next: (res: any) => {
        this.lista_colores = this.lista_colores.concat(res.colors);
      }
    })
  }

  obtenerCategoria(){
    this.clienteWAService.obtenerCategoriaVehiculos()
    .subscribe({
      next: (res: any) => {
        this.lista_categoria = this.lista_categoria.concat(res.categories);
      }
    })
  }

  obtenerMarcas(){
    this.clienteWAService.obtenerMarcasVehiculos()
    .subscribe({
      next: (res: any) => {
        this.lista_marcas = this.lista_marcas.concat(res.brands)
      }
    })
  }

  obtenerMotor(){
    this.clienteWAService.obtenerMotorVehiculo()
    .subscribe({
      next: (res: any) => {
        this.lista_motor =  this.lista_motor.concat(res.engines);
      }
    })
  }
}

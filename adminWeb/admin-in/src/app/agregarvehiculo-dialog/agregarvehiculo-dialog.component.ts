import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { VehiculoModel } from '../models/vehiculo.model';
import { InventarioService } from '../services/inventario.service';

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
    private _inventarioService: InventarioService) { }

    camposCompletos: boolean = false;

    vehiculo: VehiculoModel = new VehiculoModel();
    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;

    p: boolean = false;
  
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        'placa': [this.vehiculo.placa, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'marca': [this.vehiculo.marca, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'modelo': [this.vehiculo.modelo, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [this.vehiculo.color, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'anio': [this.vehiculo.anio, [Validators.required, Validators.minLength(4),Validators.pattern('^[0-9]*$')]],
           
      });
    }
    onRegisterSubmit(){
      /*alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user + ' ' + 
      this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenia + ' ' +  this.direccion + ' ' +
      this.fechaRegistro + ' ' + this.rol);*/
    }
    guardarVehiculo(): void {
      //this.camposCompletos = !this.registerForm.invalid;
      const data = {
        placa : this.vehiculo.placa,
        marca : this.vehiculo.marca,
        modelo : this.vehiculo.modelo,
        color : this.vehiculo.color,
        anio : this.vehiculo.anio,
        idEquipamiento : 1,
      };
      this.camposCompletos = true;
      console.log(data)
      console.log("Campos completos: "+this.camposCompletos)
      //Se han completado los campos y se han aceptado los términos de la empresa
      if(this.camposCompletos){
        this._inventarioService.createVehiculo(data)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.submitted = true;
              alert("Cuenta creada exitosamente")
              this.registerForm.reset()
            },
          });
      } else{
  
        alert("Debe completar los campos")
      }
      if(this.submitted){
        console.log("Datos guardados")
      } else {
        console.log("Datos no guardados")
      }
    }
  

onClickNO(): void{
  this.dialogRef.close();
}
}

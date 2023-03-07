import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { EditCandadosComponent } from '../edit-candados/edit-candados.component';
import { CandadoModel } from '../models/candado.model';

import { InventarioService } from '../services/inventario.service';
@Component({
  selector: 'app-agregarcandados-dialog',
  templateUrl: './agregarcandados-dialog.component.html',
  styleUrls: ['./agregarcandados-dialog.component.css']
})
export class AgregarcandadosDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AgregarcandadosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private formBuilder: FormBuilder,
    private _inventarioService: InventarioService) { }

    camposCompletos: boolean = false;

    candado: CandadoModel = new CandadoModel();
    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;

    p: boolean = false;
  
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        'numSerie': [this.candado.numSerie, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'marca': [this.candado.marca, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'modelo': [this.candado.modelo, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [this.candado.color, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'anio': [this.candado.anio, [Validators.required, Validators.minLength(4),Validators.pattern('^[0-9]*$')]],
           
      });
    }
    onRegisterSubmit(){
      /*alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user + ' ' + 
      this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenia + ' ' +  this.direccion + ' ' +
      this.fechaRegistro + ' ' + this.rol);*/
    }
    guardarCandado(): void {
      //this.camposCompletos = !this.registerForm.invalid;
      const data = {
        numSerie : this.candado.numSerie,
        marca : this.candado.marca,
        modelo : this.candado.modelo,
        color : this.candado.color,
        anio : this.candado.anio,
        idEquipamiento : 1,
      };
      this.camposCompletos = true;
      console.log(data)
      console.log("Campos completos: "+this.camposCompletos)
      //Se han completado los campos y se han aceptado los términos de la empresa
      if(this.camposCompletos){
        this._inventarioService.createCandado(data)
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

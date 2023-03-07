import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { EditCandadosComponent } from '../edit-candados/edit-candados.component';
import { ArmamentoModel } from '../models/armamento.model';
import { InventarioService } from '../services/inventario.service';


@Component({
  selector: 'app-agregararmamento-dialog',
  templateUrl: './agregararmamento-dialog.component.html',
  styleUrls: ['./agregararmamento-dialog.component.css']
})
export class AgregararmamentoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AgregararmamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private formBuilder: FormBuilder,
    private _inventarioService: InventarioService) { }

    camposCompletos: boolean = false;

    armamento: ArmamentoModel = new ArmamentoModel();
    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;

    p: boolean = false;
  
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        'numSerie': [this.armamento.numSerie, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'marca': [this.armamento.marca, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'clase': [this.armamento.clase, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
                   
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
        numSerie : this.armamento.numSerie,
        marca : this.armamento.marca,
        clase : this.armamento.clase,
        idEquipamiento : 2,
      };
      this.camposCompletos = true;
      console.log(data)
      console.log("Campos completos: "+this.camposCompletos)
      //Se han completado los campos y se han aceptado los términos de la empresa
      if(this.camposCompletos){
        this._inventarioService.createArmamento(data)
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

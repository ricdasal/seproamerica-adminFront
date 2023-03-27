import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.css']
})
export class CrearClientesComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>
  ) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'placa': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'marca': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'modelo': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'color': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'anio': [null, [Validators.required, Validators.minLength(4),Validators.pattern('^[0-9]*$')]],
         
    });
  }


  registrarCliente(registerForm: any): void {
   
  }


onClickNO(): void{
this.dialogRef.close();
}
}



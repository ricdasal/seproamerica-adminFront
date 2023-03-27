import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ArmamentoModel } from '../../../models/armamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';


@Component({
  selector: 'app-agregararmamento-dialog',
  templateUrl: './agregararmamento-dialog.component.html',
  styleUrls: ['./agregararmamento-dialog.component.css']
})
export class AgregararmamentoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AgregararmamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    ) { }

    camposCompletos: boolean = false;
    lista_sucursales: Array<any> = []
    armamento: ArmamentoModel = new ArmamentoModel();
    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;

    p: boolean = false;
  
    ngOnInit(): void {

      this.obtenerSucursales();
      this.registerForm = this.formBuilder.group({
        'serial_number': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'brand': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'category': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'model': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'branch': [null, [Validators.required, ]],
        'ammo': [null, [Validators.required,]],
        'year': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]]
                   
      });
    }
  


  onClickNO(): void{
    this.dialogRef.close();
  }

  registrarCandado(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.post(`${this.clienteWAService.DJANGO_SERVER_CREAR_ARMA}`, registerForm.value, {headers})
    .subscribe({
      next: (data)=>{
        console.log(data);
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

}

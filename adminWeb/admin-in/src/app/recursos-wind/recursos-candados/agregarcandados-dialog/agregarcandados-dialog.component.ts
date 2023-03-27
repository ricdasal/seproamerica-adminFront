import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { EditCandadosComponent } from '../edit-candados/edit-candados.component';
import { CandadoModel } from '../../../models/candado.model';

import { InventarioService } from '../../../services/inventario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
@Component({
  selector: 'app-agregarcandados-dialog',
  templateUrl: './agregarcandados-dialog.component.html',
  styleUrls: ['./agregarcandados-dialog.component.css']
})
export class AgregarcandadosDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private formBuilder: FormBuilder,
    private _inventarioService: InventarioService,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    ) { }

    lista_sucursales: Array<any> = []
    camposCompletos: boolean = false;

    candado: CandadoModel = new CandadoModel();
    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;

    p: boolean = false;
  
    ngOnInit(): void {
      this.obtenerSucursales()
      this.registerForm = this.formBuilder.group({
        'serial_number': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'brand': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'model': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'branch':[null, [Validators.required]],
        'provider': [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]]
      });
    }
    
    registrarCandado(registerForm: any): void {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });
  
      this.http.post(`${this.clienteWAService.DJANGO_SERVER_CREAR_CANDADO}`, registerForm.value, {headers})
      .subscribe({
        next: (data)=>{
          console.log(data);
        }
      })
      
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

}

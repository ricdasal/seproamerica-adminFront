import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-edit-armas',
  templateUrl: './edit-armas.component.html',
  styleUrls: ['./edit-armas.component.css']
})
export class EditArmasComponent implements OnInit {

  lista_sucursales: Array<any> = [];
  registerForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public arma: any,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
  ) { }

  ngOnInit(): void {
    this.obtenerSucursales();
      this.registerForm = this.formBuilder.group({
        'id': [this.arma.id],
        'serial_number': [this.arma.serial_number, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'brand': [this.arma.brand, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'category': [this.arma.category, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'model': [this.arma.model, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'branch': [this.arma.branch, [Validators.required, ]],
        'ammo': [this.arma.ammo, [Validators.required,]],
        'year': [this.arma.year, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [this.arma.color, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]]
                   
      });
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

  editarArma(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_ARMA}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
      }
    })

  }

}

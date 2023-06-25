import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { telefonoCelularValidator } from 'src/app/personal-wind/funciones-utiles';
import { DialogoConfirmacionComponent } from 'src/app/personal-wind/tabla-personal/edit-admin/edit-admin.component';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-edit-celular',
  templateUrl: './edit-celular.component.html',
  styleUrls: ['./edit-celular.component.css']
})
export class EditCelularComponent implements OnInit {

  lista_sucursales: Array<any> = [];
  lista_marcas: Array<any> = [];
  lista_colors: Array<any> = [];
  registerForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public celular: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'id': [this.celular.id],
      'brand': [this.celular.brand, [Validators.required, ]],
      'model': [this.celular.model, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      'phone_number':[this.celular.phone_number, [Validators.required, telefonoCelularValidator]],
      'color': [this.celular.color, [Validators.required, ]],
      'purchase_date': [this.celular.purchase_date, [Validators.required,Validators.pattern('^[0-9]*$')]],
      'branch': [this.celular.branch, Validators.required]
         
    });
    this.obtenerSucursales();
    this.obtenerColores();
    this.obtenerMarca();
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

  editarCelular(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_CELULAR}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
        this.dialog.open(DialogoConfirmacionComponent, {
          data: res.message
        });
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/personal-wind/tabla-personal/edit-admin/edit-admin.component';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-edit-candados',
  templateUrl: './edit-candados.component.html',
  styleUrls: ['./edit-candados.component.css']
})
export class EditCandadosComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public candado: any,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    public dialog: MatDialog
  ) { }

  lista_sucursales: Array<any> = [];
  lista_colores: Array<any> = [];
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.obtenerSucursales();
    this.obtenerColores();
      this.registerForm = this.formBuilder.group({
        'id': [this.candado.id],
        'serial_number': [this.candado.serial_number, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'brand': [this.candado.brand, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        'model': [this.candado.model, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
        'color': [this.candado.color, [Validators.required, ]],
        'branch':[this.candado.branch, [Validators.required]],
        'provider': [this.candado.provider, [ Validators.pattern('^[a-zA-Z0-9-]+$')]]
      });
  }

  editarCandado(registerForm: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_CANDADO}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
        this.dialog.open(DialogoConfirmacionComponent, {
          data: res.message
        });
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

  obtenerColores(){
    this.clienteWAService.obtenerColoresEquipamento()
    .subscribe({
      next: (res: any) => {
        this.lista_colores = this.lista_colores.concat(res.colors)

      }
    })
  }

}

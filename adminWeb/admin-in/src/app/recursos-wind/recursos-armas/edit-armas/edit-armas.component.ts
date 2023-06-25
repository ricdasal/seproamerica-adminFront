import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/personal-wind/tabla-personal/edit-admin/edit-admin.component';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-edit-armas',
  templateUrl: './edit-armas.component.html',
  styleUrls: ['./edit-armas.component.css']
})
export class EditArmasComponent implements OnInit {

  lista_sucursales: Array<any> = [];
  lista_colores: Array<any> = [];
  lista_marcas: Array<any> = [];
  lista_categoria: Array<any> = [];
  lista_municion: Array<any> = [];
  registerForm!: FormGroup


  constructor(
    @Inject(MAT_DIALOG_DATA) public arma: any,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerSucursales();
    this.obtenerColoresArma();
    this.obtenerMarcasArma();
    this.obtenerCategoriasArma();
    this.obtenerMunicion();
    
    console.log(this.arma);
    this.registerForm = new FormGroup({
      id: new FormControl(this.arma.id),
      serial_number: new FormControl(this.arma.serial_number, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]),
      brand: new FormControl(this.arma.brand, [Validators.required, ]),
      category: new FormControl(this.arma.category, [Validators.required,]),
      model: new FormControl(this.arma.model, [Validators.required, ]),
      branch: new FormControl(this.arma.branch, [Validators.required, ]),
      ammo: new FormControl(this.arma.ammo, [Validators.required,]),
      year: new FormControl(this.arma.year, [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]),
      color: new FormControl(this.arma.color, [Validators.required]),

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

  editarArma(registerForm: any){
    console.log(registerForm.value)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.put(`${this.clienteWAService.DJANGO_SERVER_EDITAR_ARMA}`, registerForm.value, {headers})//
    .subscribe({
      next: (res: any) =>{
        console.log(res);
        this.dialog.open(DialogoConfirmacionComponent, {
          data: res.message
        });
        
      }
    })

  }

 obtenerColoresArma(){
  this.clienteWAService.obtenerColoresEquipamento()
  .subscribe({
    next: (res: any) =>{
      console.log(res); 
      this.lista_colores = this.lista_colores.concat(res.colors);
    }
  })
 }

 obtenerMarcasArma(){
  this.clienteWAService.obtenerMarcasArma()
  .subscribe({
    next: (res: any) =>{
      this.lista_marcas = this.lista_marcas.concat(res.brands );
    }
    
  })
 }

 obtenerCategoriasArma(){
  this.clienteWAService.obtenerCategoriaArmas()
  .subscribe({
    next: (res: any) => {
      this.lista_categoria = this.lista_categoria.concat(res.weapon_type);

    }
  })
 }

 obtenerMunicion(){
  this.clienteWAService.obtenerMunicion()
  .subscribe({
    next: (res: any) => {
      this.lista_municion = this.lista_municion.concat(res);
    }
  })
 }

}

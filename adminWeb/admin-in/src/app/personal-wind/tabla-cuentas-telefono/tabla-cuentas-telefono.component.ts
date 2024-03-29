import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { EditarCuentaComponent } from './editar-cuenta/editar-cuenta.component';
import { EliminarCuentaComponent } from './eliminar-cuenta/eliminar-cuenta.component';
import { InfoCuentaComponent } from './info-cuenta/info-cuenta.component';

@Component({
  selector: 'app-tabla-cuentas-telefono',
  templateUrl: './tabla-cuentas-telefono.component.html',
  styleUrls: ['./tabla-cuentas-telefono.component.css']
})
export class TablaCuentasTelefonoComponent implements OnInit {

  lista_cuentas: Array<any>= []
  columnas: string[] = ['Id','Email','Password', 'Opciones'];
   dataSource!: MatTableDataSource<any>;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private clienteWAService: ClienteWAService, 
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerCuentas();
  }

  obtenerCuentas(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CUENTAS_TELEFONO}`, {headers})
    .subscribe({
      next: (data)=>{
        this.lista_cuentas = this.lista_cuentas.concat(data);
        console.log(this.lista_cuentas);
        this.dataSource = new MatTableDataSource<any>(this.lista_cuentas);
        this.dataSource.paginator = this.paginator;
      } 
    })
  }


  verCuenta(id: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CUENTA_TELEFONO}${id}`, {headers})
      .subscribe({
        next: (cuentaTelefono: any) => {
          console.log(cuentaTelefono);
          const ventanaGrupos =  this.dialog.open(InfoCuentaComponent, {
            width: '75vh',
            height: '45vh',
            data: cuentaTelefono
          })
        }
      })

  }


  crearCuenta(){
    const ventanaGrupos =  this.dialog.open(CrearCuentaComponent, {
      width: '80vh',
      height: '80vh',
    })

  }

  eliminarCuenta(id: any){
    this.dialog.open(EliminarCuentaComponent, {
      width: '70vh',
      height: '50vh',
      data: id
    })
  }

  editarCuenta(id: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CUENTA_TELEFONO}${id}`, {headers})
      .subscribe({
        next: (cuentaTelefono: any) => {
          console.log(cuentaTelefono);
          const ventanaGrupos =  this.dialog.open(EditarCuentaComponent, {
            width: '70vh',
            height: '80vh',
            data: cuentaTelefono
          })
        }
      })

  }



}

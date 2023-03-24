import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
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
            width: '100vh',
            height: '50vh',
            data: cuentaTelefono
          })
        }
      })

  }



}

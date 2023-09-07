import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { CrearCelularComponent } from './crear-celular/crear-celular.component';
import { EditCelularComponent } from './edit-celular/edit-celular.component';
import { EliminarCelularComponent } from './eliminar-celular/eliminar-celular.component';
import { InfoCelularComponent } from './info-celular/info-celular.component';


@Component({
  selector: 'app-recursos-celular',
  templateUrl: './recursos-celular.component.html',
  styleUrls: ['./recursos-celular.component.css']
})


export class RecursosCelularComponent implements OnInit {

  lista_celulares: Array<any> = [];

  columnas: string[] = ['id','brand','model','phone_number','Opciones'];
   dataSource!: MatTableDataSource<any>;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private clienteWAService: ClienteWAService, 
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  
    ngOnInit(): void {
      this.obtenerCelulares();
    }

    obtenerCelulares(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_MOVIL}`, {headers})
      .subscribe({
        next: (data)=>{
          this.lista_celulares = this.lista_celulares.concat(data);
          this.dataSource = new MatTableDataSource<any>(this.lista_celulares);
          this.dataSource.paginator = this.paginator;
        }
      })
  
    }

    verCelular(id: any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CELULAR}${id}`, {headers})
      .subscribe({
        next: (celular: any) => {
          console.log(celular);
          const ventanaGrupos =  this.dialog.open(InfoCelularComponent, {
            width: '100vh',
            height: '50vh',
            data: celular
          })
        }
      })
    }

    crearCelulares(){
      const ventanaGrupos =  this.dialog.open(CrearCelularComponent, {
        width: '80vh',
        height: '70vh',
      })

    }

    eliminarCelular(id: any){
      const ventanaGrupos =  this.dialog.open(EliminarCelularComponent, {
        width: '70vh',
        height: '50vh',
        data: id
      })
    }
    
    editarCelular(id: any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CELULAR}${id}`, {headers})
      .subscribe({
        next: (celular: any) => {
          console.log(celular);
          const ventanaGrupos =  this.dialog.open(EditCelularComponent, {
            width: '80vh',
            height: '70vh',
            data: celular
          })
        }
      })
    }
  
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';


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
        }
      })
  
    }
  
}

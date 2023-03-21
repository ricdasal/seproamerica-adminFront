import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';


@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent implements OnInit {

  lista_clientes:  Array<any> = [];
  columnas: string[] = ['Nombres','Apellidos','Contacto','Correo','Opciones'];
   dataSource!: MatTableDataSource<any>;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

   
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private clienteWAService: ClienteWAService, 
   
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
    
  }


  obtenerClientes(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CLIENTES}`, {headers})
    .subscribe({
      next: (data) => {
        this.lista_clientes = this.lista_clientes.concat(data);
        console.log(this.lista_clientes);


      }
    })
  }

  

  
}

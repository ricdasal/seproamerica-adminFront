import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { MapWindComponent } from '../map-wind/map-wind.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-servicio-en-curso',
  templateUrl: './servicio-en-curso.component.html',
  styleUrls: ['./servicio-en-curso.component.css']
})
export class ServicioEnCursoComponent implements OnInit {

  constructor(
    private clienteWAservice: ClienteWAService,
    public dialog: MatDialog
  ) { }



  lista_pedidos_en_proceso: Array<any> = []
  columnas: string[] = ['Id','Nombre','Apellidos','Servicio', 'Fecha de inicio', 'Hora de inicio','Opciones'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.obtenerPedidosEnCurso()
  }

  obtenerPedidosEnCurso(){
    this.clienteWAservice.obtenerPedidosEnProceso()
    .subscribe({
      next: (pedidos: any) => {
        console.log(pedidos)
        this.lista_pedidos_en_proceso = this.lista_pedidos_en_proceso.concat(pedidos);
        this.dataSource = new MatTableDataSource<any>(this.lista_pedidos_en_proceso);
        this.dataSource.paginator = this.paginator;

      }
    })
  }


  abrirMapa(id: any){

    this.clienteWAservice.obtenerPedidosPorId(id)
    .subscribe({
      next: (pedido: any) => {
        console.log(pedido)
        const ventanaGrupos =  this.dialog.open(MapWindComponent, {
          width: '100vh',
          height: '80vh',
          data: pedido
        })

      }
    })
    

  }

}

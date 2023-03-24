import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../../services/inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarcandadosDialogComponent } from './agregarcandados-dialog/agregarcandados-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { InfoCandadosComponent } from './info-candados/info-candados.component';

@Component({
  selector: 'app-recursos-candados',
  templateUrl: './recursos-candados.component.html',
  styleUrls: ['./recursos-candados.component.css']
})
export class RecursosCandadosComponent implements OnInit {


  emp:any;
    numSerie!: string;
    marca!: string;
    modelo!: string;
    color!: string;
    anio!: string;
  
    CandadoList:any=[];
    columnas: string[] = ['Numero Serie','Marca','Modelo','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _inventarioService: InventarioService,
      public dialog: MatDialog,
      private http: HttpClient,
      private clienteWAService: ClienteWAService,
      ){}

     //metodo de agregar vehiculo
     openDialog(): void{
      const dialogRef = this.dialog.open(AgregarcandadosDialogComponent,{
        data: 'Agregar Nuevo Candado'
      });
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
     }

    ngOnInit(): void {
      this.getCandados();
    }
    
    eliminarCandado(index: number){
      console.log(index);
      this._inventarioService.eliminarCandado(index);
    }

    getCandados(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CANDADOS}`, {headers})
      .subscribe({
        next: (data)=>{
          this.CandadoList = this.CandadoList.concat(data);
          console.log(this.CandadoList);
        }
      })
    }

    verCandado(id: any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_CANDADO}${id}`, {headers})
      .subscribe({
        next: (vehiculo: any) => {
          console.log(vehiculo);
          const ventanaGrupos =  this.dialog.open(InfoCandadosComponent, {
            width: '100vh',
            height: '50vh',
            data: vehiculo
          })
        }
      })
    }

}

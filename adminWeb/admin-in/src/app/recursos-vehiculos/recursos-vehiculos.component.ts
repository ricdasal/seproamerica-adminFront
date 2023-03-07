import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../services/inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarvehiculoDialogComponent } from '../agregarvehiculo-dialog/agregarvehiculo-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-recursos-vehiculos',
  templateUrl: './recursos-vehiculos.component.html',
  styleUrls: ['./recursos-vehiculos.component.css']
})
export class RecursosVehiculosComponent implements OnInit {

  emp:any;
    placa!: string;
    marca!: string;
    modelo!: string;
    color!: string;
    anio!: number;
  
    VehiculoList:any=[];
    columnas: string[] = ['Placa','Marca','Modelo','Color','Año','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

    constructor (private _inventarioService: InventarioService,
      public dialog: MatDialog,
      private http: HttpClient){}

     //metodo de agregar vehiculo
     openDialog(): void{
      const dialogRef = this.dialog.open(AgregarvehiculoDialogComponent,{
        data: 'Agregar Nueva Vehiculo'
      });
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
     }

    ngOnInit(): void {
      this._inventarioService.getAllVehiculo().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.VehiculoList);
      this.dataSource.paginator = this.paginator;
    }
    
    eliminarVehiculo(index: number){
      console.log(index);
      this._inventarioService.eliminarVehiculo(index);
    }

    
  /*
    //Basandome en  https://www.bezkoder.com/django-angular-crud-rest-framework/
    get(correoU: any): Observable<RegisterModel>{
      return this.http.get<RegisterModel>(`${this.DJANGO_SERVER_INICIO_SESION}/${correoU}`);
    }
  
    encontrarCorreo(correoU: any): Observable<RegisterModel>{
      return this.http.get<RegisterModel>(`${this.DJANGO_SERVER_INICIO_SESION}?correo=${correoU}`)
    }
  
    //Basandome en  https://www.bezkoder.com/django-angular-mysql/
    update(correoU: any, data: any): Observable<any> {
      return this.http.put(`${this.DJANGO_SERVER_INICIO_SESION}/${correoU}/`, data);
    }
*/

}

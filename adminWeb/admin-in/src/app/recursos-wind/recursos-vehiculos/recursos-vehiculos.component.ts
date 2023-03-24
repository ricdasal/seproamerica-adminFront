import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../../services/inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarvehiculoDialogComponent } from './agregarvehiculo-dialog/agregarvehiculo-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { InfoVehiculosComponent } from './info-vehiculos/info-vehiculos.component';


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
    columnas: string[] = ['Placa','Marca','Modelo','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

    constructor (private _inventarioService: InventarioService,
      public dialog: MatDialog,
      private http: HttpClient,
      private clienteWAService: ClienteWAService
      ){}

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
      this.getVehiculos();
    }
    
    eliminarVehiculo(index: number){
      console.log(index);
      this._inventarioService.eliminarVehiculo(index);
    }
  
    getVehiculos(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService. DJANGO_SERVER_OBTENER_VEHICULOS}`, {headers})
      .subscribe({
        next: (data)=>{
          this.VehiculoList = this.VehiculoList.concat(data);
          console.log(this.VehiculoList);
        }
      })
    }

    verVehiculo(id: any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_VEHICULO}${id}`, {headers})
      .subscribe({
        next: (vehiculo: any) => {
          console.log(vehiculo);
          const ventanaGrupos =  this.dialog.open(InfoVehiculosComponent, {
            width: '100vh',
            height: '50vh',
            data: vehiculo
          })
        }
      })

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

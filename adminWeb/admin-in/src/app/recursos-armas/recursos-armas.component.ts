import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../services/inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregararmamentoDialogComponent } from '../agregararmamento-dialog/agregararmamento-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



@Component({
  selector: 'app-recursos-armas',
  templateUrl: './recursos-armas.component.html',
  styleUrls: ['./recursos-armas.component.css']
})


export class RecursosArmasComponent{

  emp:any;
    numSerie!: string;
    marca!: string;
    clase!: string;
  
    ArmamentoList:any=[];
    columnas: string[] = ['Numero Serie','Marca','Clase','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (private _inventarioService: InventarioService,
      public dialog: MatDialog,
      private http: HttpClient){}

     //metodo de agregar vehiculo
     openDialog(): void{
      const dialogRef = this.dialog.open(AgregararmamentoDialogComponent,{
        data: 'Agregar Nueva Armamento'
      });
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
     }

    ngOnInit(): void {
      this._inventarioService.getAllArmamento().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.ArmamentoList);
      this.dataSource.paginator = this.paginator;
    }
    
    eliminarArmamento(index: number){
      console.log(index);
      this._inventarioService.eliminarArmamento(index);
    }
}

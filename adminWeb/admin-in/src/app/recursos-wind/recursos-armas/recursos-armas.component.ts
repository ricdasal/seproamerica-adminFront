import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../../services/inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregararmamentoDialogComponent } from './agregararmamento-dialog/agregararmamento-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { InfoArmasComponent } from './info-armas/info-armas.component';
import { EliminarArmaComponent } from './eliminar-arma/eliminar-arma.component';
import { EditArmasComponent } from './edit-armas/edit-armas.component';



@Component({
  selector: 'app-recursos-armas',
  templateUrl: './recursos-armas.component.html',
  styleUrls: ['./recursos-armas.component.css']
})


export class RecursosArmasComponent implements OnInit{

  emp:any;
    numSerie!: string;
    marca!: string;
    clase!: string;
  
    ArmamentoList:Array<any> = [];
    columnas: string[] = ['Numero Serie','Marca','Clase', 'Municion','Opciones'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
    
    constructor (
      private _inventarioService: InventarioService,
      public dialog: MatDialog,
      private http: HttpClient,
      private clienteWAService: ClienteWAService, 
      ){}

     //metodo de agregar vehiculo
     openDialog(): void{
      const dialogRef = this.dialog.open(AgregararmamentoDialogComponent,{
        data: 'Agregar Nueva Armamento',
        width: '80vh',
        height: '70vh',
      });
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
     }

    ngOnInit(): void {
      this.getArmamento();
    }
    
    eliminarArmamento(index: number){
      console.log(index);
      this._inventarioService.eliminarArmamento(index);
    }

    getArmamento(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_ARMAMENTOS}`, {headers})
      .subscribe({
        next: (data)=>{
          this.ArmamentoList = this.ArmamentoList.concat(data);
          console.log(this.ArmamentoList);
        }
      })
      this.dataSource = new MatTableDataSource<any>(this.ArmamentoList);
      this.dataSource.paginator = this.paginator;

    }

    verArmamento(id: any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_ARMA}${id}`, {headers})
      .subscribe({
        next: (arma: any) => {
          console.log(arma);
            this.dialog.open(InfoArmasComponent, {
              width: '100vh',
              height: '50vh',
              data: arma
          })
        }
      })


    }

    eliminarArma(id: any){
        this.dialog.open(EliminarArmaComponent, {
          width: '70vh',
          height: '50vh',
          data: id
      })
    }

    editarArma(id: any){

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });
  
      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_ARMA}${id}`, {headers})
      .subscribe({
        next: (arma: any) => {
          this.dialog.open(EditArmasComponent, {
            width: '80vh',
            height: '70vh',
            data: arma
        })   
         
        }
      })
    }
    
}

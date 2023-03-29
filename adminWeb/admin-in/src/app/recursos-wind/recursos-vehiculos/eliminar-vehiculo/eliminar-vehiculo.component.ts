import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-eliminar-vehiculo',
  templateUrl: './eliminar-vehiculo.component.html',
  styleUrls: ['./eliminar-vehiculo.component.css']
})
export class EliminarVehiculoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteWAService: ClienteWAService,
    private http: HttpClient,
    public dialog: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  eliminarEquipamento(id: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    console.log(id)
    
    this.http.delete(`${this.clienteWAService.DJANGO_SERVER_ELIMINAR_EQUIPAMENTO}${id}`, {headers})
    .subscribe({
      next: (res)=>{
        console.log(res);
      }
    })
  }

  cerrarDialog(): void{
    this.dialog.close();
  }

}
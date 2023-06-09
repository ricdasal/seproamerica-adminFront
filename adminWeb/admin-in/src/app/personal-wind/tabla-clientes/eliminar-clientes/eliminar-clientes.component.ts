import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-eliminar-clientes',
  templateUrl: './eliminar-clientes.component.html',
  styleUrls: ['./eliminar-clientes.component.css']
})
export class EliminarClientesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteWAService: ClienteWAService,
    private http: HttpClient,
    public dialogref: MatDialogRef<any>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const temp: number = 0
  }

  eliminarClientes(id: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    console.log(id)

    this.http.delete(`${this.clienteWAService.DJANGO_SERVER_ELIMINAR_CLIENTE}${id}`, {headers})
    .subscribe({
      next: (res)=>{
        console.log(res);

      }
    })
  }

  cerrarDialog(): void{
    this.dialogref.close();
  }

}

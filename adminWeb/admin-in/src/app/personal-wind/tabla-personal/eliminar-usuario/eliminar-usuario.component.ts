import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeConfirmacionEliminarComponent } from 'src/app/components/modals/mensaje-confirmacion-eliminar/mensaje-confirmacion-eliminar.component';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteWAService: ClienteWAService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    let initializer = 0;
  }

  
  eliminarUsuario(id: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    console.log(id)

    this.http.delete(`${this.clienteWAService.DJANGO_SERVER_ELIMINAR_PERSONAL}${id}`, {headers})
    .subscribe({
      next: (res)=>{
        console.log(res);
        this.dialog.open(MensajeConfirmacionEliminarComponent, {
          data: "Personal",
          width: '70vh',
          height: '50vh',
        })
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  cerrarDialog(): void{
    this.dialogRef.close();
  }

}

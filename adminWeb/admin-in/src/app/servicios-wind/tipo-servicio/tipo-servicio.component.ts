import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { ServicioCrearComponent } from '../servicio-crear/servicio-crear.component';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.css']
})
export class TipoServicioComponent implements OnInit {

  lista_Servicio: Array<any> = [];

  constructor(
    private clienteWAService: ClienteWAService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(){
    this.clienteWAService.obtenerNombreServicios()
    .subscribe({
      next: (res: any) => {
        this.lista_Servicio = this.lista_Servicio.concat(res);

      }
    })
  }

  crearServicio(){
    this.dialog.open(ServicioCrearComponent, {
      width: '100vh',
      height: '50vh',
      data: 23
  })
}


}

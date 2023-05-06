import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { ServicioCrearComponent } from '../servicio-crear/servicio-crear.component';
import { Router } from '@angular/router';
import { InfoServicioComponent } from '../info-servicio/info-servicio.component';

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
    private router: Router
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
    this.router.navigateByUrl("/serviciosVentana/crearServicio")
    
  //   this.dialog.open(ServicioCrearComponent, {
  //     width: '100vh',
  //     height: '50vh',
  //     data: 23
  // })
}

verServicio(id: any){
  console.log(id);
  this.clienteWAService.obtenerServicioPorId(id)
  .subscribe({
    next: (res)=>{
      console.log(res);
      this.dialog.open(InfoServicioComponent, {
            width: '100vh',
            height: '50vh',
            data: res
      })
    }
  })

}


}

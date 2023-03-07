import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../models/servicio';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Router } from '@angular/router';
import { ModalsService } from '../services/modals/modals.service';

@Component({
  selector: 'app-servicios-wind',
  templateUrl: './servicios-wind.component.html',
  styleUrls: ['./servicios-wind.component.css']
})
export class ServiciosWindComponent implements OnInit {

  //Lista para guardar los servicios ya creados
  lista_Servicio?: ServiceModel[];

  //servicio seleccionado a editar
  servicio_seleccionado = "";

  servicio_info_detalles: ServiceModel = {
    idServicio: 0,
    nombreServicio: '',
    costo: 0,
    detalles: '',
    fecha_Creacion: new Date(),
    tipo_Servicio: 0,
    administrador_Creador: 0,
    icono: new URL("https://cdn-icons-png.flaticon.com/512/263/263100.png")
  }

  constructor(
    private clienteWAService: ClienteWAService,
     private router: Router,
     private modalService:ModalsService
     ) { }



  ngOnInit(): void {
    this.modalService.closeAllModals()

    this.obtener_servicios()
    console.log(this.lista_Servicio)
    localStorage.removeItem('nombre_servicio_editar')
    localStorage.removeItem('detalles_servicio')
  }

  obtener_servicios(): void{
    this.clienteWAService.obtener_servicios_creados()
    .subscribe({
      next: (data) => {
        this.lista_Servicio = data;
      },
      error: (e) => console.error(e)
    })
  }

  //Metodo para enviar el nombre del servicio a querer editar al componente de edicion
  enviar_servicio_seleccionado(servicio_a_editar: String){
    this.clienteWAService.seleccionar_servicio(servicio_a_editar.replaceAll(' ','_'))
    .subscribe({
      next: (data) => {
        console.log(data)
        this.servicio_info_detalles = data
        localStorage.setItem('detalles_servicio', JSON.stringify(this.servicio_info_detalles))
        localStorage.setItem('nombre_servicio_editar', servicio_a_editar.toString())
        this.router.navigate(['/servicioEditarEliminar'])
      },
      error: (e) => console.log(e)
    })
  }

}

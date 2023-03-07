import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: './modal-notificaciones.component.html',
  styleUrls: ['./modal-notificaciones.component.css']
})
export class ModalNotificacionesComponent implements OnInit {
  

  constructor(
    public notificacionService:NotificacionesService,
    private router:Router
  ) { 
    //console.log(notificacionService.obtenerListaNotificaciones())
  }

  notificaciones=[
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo',
      
    },
    {
      'titulo':'Servicio 341 pagado',
      'texto':'Servicio 341 pagado'
    },
    {
      'titulo':'Nueva notificacion cualquiera',
      'texto':'Nueva notificacion cualquiera'
    },
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo'
    },
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo'
    },
    {
      'titulo':'Nueva notificacion cualquiera',
      'texto':'Nueva notificacion cualquiera'
    },
    {
      'titulo':'Servicio 342 pagado',
      'texto':'Servicio 342 pagado'
    },
    {
      'titulo':'Nuevo Servicio Solicitado',
      'texto':'Nuevo servicio solicitaddo'
    },
    

    


  ]
  ngOnInit(): void {
   
  }

  leerNotificacion(notificacion: any){
    console.log(notificacion)
    this.notificacionService.marcarComoLeido(notificacion.id)
    this.notificacionService.obtenerNotificacionesNoLeidas()
    this.redirigirNotificacion(notificacion.level)
    

  }

  redirigirNotificacion(valor:string){
    if(valor=="Nuevo Mensaje"){
      this.router.navigate(['/mensajeriaVentana'])
    }
    else if(valor=="Nuevo servicio"){
      this.router.navigate(['/serviciosEnCurso'])


      
    }
  }
 
}

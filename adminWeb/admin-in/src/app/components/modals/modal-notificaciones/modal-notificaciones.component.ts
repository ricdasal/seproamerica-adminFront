import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { initializeApp } from "firebase/app";


@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: './modal-notificaciones.component.html',
  styleUrls: ['./modal-notificaciones.component.css']
})
export class ModalNotificacionesComponent implements OnInit {

  firebaseConfig = {

    apiKey: "AIzaSyDWEsnR-K7xcEb-VRIfu9bJ8lvCOJMRINo",
  
    authDomain: "prueba-firebase-3d024.firebaseapp.com",
  
    projectId: "prueba-firebase-3d024",
  
    storageBucket: "prueba-firebase-3d024.appspot.com",
  
    messagingSenderId: "278441992033",
  
    appId: "1:278441992033:web:5aec7c0db588cbf53d6f20"
  
  };

  app = initializeApp(this.firebaseConfig);
  
  

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

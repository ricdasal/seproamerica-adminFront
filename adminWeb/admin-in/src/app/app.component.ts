import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MensajeriaService } from './services/mensajeria/mensajeria.service';
import { NotificacionesService } from './services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audio = new Audio('assets/audio/audio_alerta1.mp3');
  obs$=interval(5000)
  title = 'admin-in';
  ruta=window.location.href.split("/").pop()
  child!: { ruta: string; };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rutaActiva: ActivatedRoute,
    private notificacionService:NotificacionesService,
    private mensajeriaService:MensajeriaService
     ) { 
      this.ruta=window.location.href.split("/").pop()
    console.log(this.ruta)
    console.log("constructor")
    
  }

  ngAfterContentInit(){
    console.log("ngafetcontetinit")
    console.log(this.ruta)
    console.log(this.router.url)
    console.log(window.location.href.split("/").pop())
  }
  

  ngOnInit(){

    console.log("oninit")
    this.obs$.subscribe(res=>{
      if(this.notificacionService.noti_no_leida_num>0){
        this.mensajeriaService.obtenerListaMensajes()
        this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
        this.reproducir_alerta()
        console.log("entro a leer")
      }
    })
   
  }
  reproducir_alerta() {
    //this.audio.muted = true; // without this line it's not working although I have "muted" in HTML
    this.audio.load()
    this.audio.play();
    
  }

}

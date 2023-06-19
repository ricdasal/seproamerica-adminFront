import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MensajeriaService } from './services/mensajeria/mensajeria.service';
import { NotificacionesService } from './services/notificaciones/notificaciones.service';
import { getToken, onMessage, getMessaging } from 'firebase/messaging';






import { environment } from 'src/environments/environment';
import { ClienteWAService } from './services/cliente-wa.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  audio = new Audio('assets/audio/audio_alerta1.mp3');
  obs$=interval(5000)
  // title = 'admin-in';
  ruta=window.location.href.split("/").pop()
  child!: { ruta: string; };
  title = 'af-notification';
  message:any = null;

  lista_notificaciones: Array<any> = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rutaActiva: ActivatedRoute,
    private notificacionService:NotificacionesService,
    private mensajeriaService:MensajeriaService,
    private clienteWAService: ClienteWAService
     ) { 
      this.ruta=window.location.href.split("/").pop()
    console.log(this.ruta)
    console.log("constructor")
    
  }


  ngOnInit(){
    this.requestPermission();
    this.listen()
   
  }
  reproducir_alerta() {
    //this.audio.muted = true; // without this line it's not working although I have "muted" in HTML
    this.audio.load()
    this.audio.play();
    
  }

  requestPermission() {
    const messaging = getMessaging();  
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
        let tokenForm = new FormGroup({
          token: new FormControl(currentToken),
          administrador: new FormControl('administrador')
        })
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
           this.clienteWAService.registrarTokenFCM(tokenForm.value)
           .subscribe({
            next: (response: any) =>{
              console.log(response)
            },
            error: (error) => {
              console.log("token ya registrado")
            }
           });

         } else {
           console.log('No registration token available. Request permission to generate one.');
         }    
        
        }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.reproducir_alerta();
      this.message=payload;
    });

    
  }

}

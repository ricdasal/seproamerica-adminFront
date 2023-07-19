import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval, take } from 'rxjs';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { FirebaseAppSettings, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
// import { getMessaging, getToken, provideMessaging, onMessage} from '@angular/fire/messaging';
// import { FirebaseApp, FirebaseAppModule, FirebaseApps } from '@angular/fire/app';
import { getMessaging, getToken, onMessage} from "firebase/messaging";
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificacionModalComponent } from '../notificacion-modal/notificacion-modal.component';

@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: './modal-notificaciones.component.html',
  styleUrls: ['./modal-notificaciones.component.css']
})
export class ModalNotificacionesComponent implements OnInit {



  audio = new Audio('assets/audio/audio_alerta1.mp3');
  token: string = '';

  title = 'af-notification';
  message:any = null;

  lista_notificaciones: Array<any> = []


  app = initializeApp(environment.firebase);

  params = new HttpParams().set('limit', '10');

  constructor(
    public notificacionService:NotificacionesService,
    private router:Router,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
  ) { 
    
  }


  ngOnInit(): void {
    this.obtenerNotificaciones();
    this.listen();

  }

  obtenerNotificaciones(){
    this.clienteWAService.obtenerListaNotificaciones()
    .subscribe({
      next: (notificaciones: any) => {
        this.lista_notificaciones = [];
        this.lista_notificaciones = this.lista_notificaciones.concat(notificaciones.slice(0, 10));
        console.log(this.lista_notificaciones)
      }
    })
  }

  obtenerPedido(id: any){
    localStorage.setItem("pedido_seleccionado", id);
    this.router.navigate(["/serviciosVentana/serviciosDetallesAsignacion/"]);
    if(window.location.href.split("#")[1] == "/serviciosVentana/serviciosDetallesAsignacion"){
      window.location.reload() 
    }
    this.onClickNO();
  }

  onClickNO(): void{
    this.dialogRef.close();
    
  }

  eliminarNotificaciones(){
    // this.clienteWAService.eliminarListaNotificaciones()
    // .subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //   }
    // })
    
    // this.lista_notificaciones = [];
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
  }

  requestPermission1() {
  const messaging = getMessaging();
  
  getToken(messaging, 
   { vapidKey: environment.firebase.vapidKey}).then(
     (currentToken) => {
       if (currentToken) {
         console.log("Hurraaa!!! we got the token.....");
         this.token = currentToken
         console.log(currentToken);
         
        //  this.enviar_mensaje()
       } else {
         console.log('No registration token available. Request permission to generate one.');
       }     }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
  });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.obtenerNotificaciones();
      this.reproducir_alerta();
      this.dialog.open(NotificacionModalComponent, {
        width: '250px',
        data: payload
      });

    });
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
 
  reproducir_alerta() {
    //this.audio.muted = true; // without this line it's not working although I have "muted" in HTML
    this.audio.load()
    this.audio.play();
    
  }
  
}

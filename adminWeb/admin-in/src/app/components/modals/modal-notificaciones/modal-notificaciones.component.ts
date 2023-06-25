import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { FirebaseAppSettings, initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
// import { getMessaging, getToken, provideMessaging, onMessage} from '@angular/fire/messaging';
// import { FirebaseApp, FirebaseAppModule, FirebaseApps } from '@angular/fire/app';
import { getMessaging, getToken, onMessage} from "firebase/messaging";
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: './modal-notificaciones.component.html',
  styleUrls: ['./modal-notificaciones.component.css']
})
export class ModalNotificacionesComponent implements OnInit {

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


 token: string = '';

  title = 'af-notification';
  message:any = null;

  lista_notificaciones: Array<any> = []


  app = initializeApp(environment.firebase);

  

  constructor(
    public notificacionService:NotificacionesService,
    private router:Router,
    private http: HttpClient,
    private clienteWAService: ClienteWAService,
    public dialogRef: MatDialogRef<any>,
  ) { 
    
  }


  ngOnInit(): void {
    this.obtenerNotificaciones();

  }

  obtenerNotificaciones(){
    this.clienteWAService.obtenerListaNotificaciones()
    .subscribe({
      next: (notificaciones: any) => {
        this.lista_notificaciones = [];
        this.lista_notificaciones = this.lista_notificaciones.concat(notificaciones);
        console.log(notificaciones);
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

      this.message=payload;

      this.lista_notificaciones.push(this.message);
    });
  }


  enviar_mensaje(){
    const url = 'https://fcm.googleapis.com/fcm/send';
    const serverKey = 'AIzaSyDWEsnR-K7xcEb-VRIfu9bJ8lvCOJMRINo';
    const notification = {
      title: 'First Notification',
      body: 'Hello from Jishnu!!'
    };


  
  

    console.log(this.token)
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key=${serverKey}`
    });
    
    const data = {
      notification: notification,
      to: this.token
    };
    
    this.http.post(url, data, { headers })
      .subscribe(
        (response) => {
          console.log('Respuesta:', response);
          // Realiza acciones adicionales con la respuesta
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          // Maneja el error de manera adecuada
        }
      );






  // Send a message to devices subscribed to the provided topic.
  // getMessaging().send(message)
  //   .then((response) => {
  //     // Response is a message ID string.
  //     console.log('Successfully sent message:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error sending message:', error);
  //   });

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

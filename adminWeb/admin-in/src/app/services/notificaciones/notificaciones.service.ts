import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from 'src/app/util/constantes';
import {Notificacion} from '../../models/notificacion.model'
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  API_KEY_FCM="AAAA9RJBEJ8:APA91bE4kCPeZfUI9eAs-fX4dGjxvIXKlZDG7I_Q0N1SrFDJN5F-oEkhbYNS27F_-7CCecZeMznffeb9qRAajLkp0x37ZzygtjHEzcxeSSNqdqhczvZTof4vG7sEhiaikq_gtO87RVZ0"

  notificaciones:Notificacion[]=[]
  notificaciones_no_leidas:Notificacion[]=[]

  url_notificaciones=Constantes.URL_NOTIFICACION_PRODUCCION
  dataUsuario=JSON.parse(localStorage.getItem("datoUsuario")!)
  noti_no_leida_num: any;
  
  constructor(
    private http: HttpClient,

  ) { }

  obtenerListaNotificaciones() {
    
    //console.log(this.servicio_actual,this.usuario_receptor,this.usuario_logeado)
    //this.contactosMensajes=[]
    this.http.get<any[]>(this.url_notificaciones +"all/" + this.dataUsuario.cedula)
      .subscribe(res => {
        let data = JSON.stringify(res)
        let notificaciones = JSON.parse(data)
        this.notificaciones = notificaciones.data
      })
  }

  obtenerNotificacionesNoLeidas(){
    this.http.get<any[]>(this.url_notificaciones +"no_leido/" + this.dataUsuario.cedula)
    .subscribe(res => {
      let data = JSON.stringify(res)
      let notificaciones = JSON.parse(data)
      this.notificaciones = notificaciones.data
      this.noti_no_leida_num=notificaciones.cantidad

      this.notificaciones.sort((a, b) => {
        var firstDate = new Date(a.timestamp),
          SecondDate = new Date(b.timestamp);
        if (firstDate > SecondDate) return -1;
        if (firstDate < SecondDate) return 1;
        return 0;
      });
      
    })
    
  }

  marcarComoLeido(id:any){
    this.http.get<any>(this.url_notificaciones +"marcar_como_leido/" + Number(id))
    .subscribe(res => {
      
      this.obtenerNotificacionesNoLeidas()

    })  }
    notificar_fcm_movil_individual(info:any){
      let data:any = {
        API_KEY_FCM:this.API_KEY_FCM,
        titulo:info.titulo,
        descripcion:info.descripcion,
        id:info.id,
        cedula:info.cedula
  
      }
      this.http.post<any>(this.url_notificaciones+"notificar_fcm_movil/",data)
        .subscribe(res => {
          console.log(res)
        })
    }
 

  notificar(info:any){
    let data:any={
      emisor:info.emisor,
      receptor:info.receptor,
      contenido:info.contenido,
      level:info.level,

    }
    this.http.post<any>(this.url_notificaciones+"notificar/",data)
      .subscribe(res => {
        console.log(res)
      })
  }

  
}

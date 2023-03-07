import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { MensajeriaService, smsInfo2 } from '../services/mensajeria/mensajeria.service';
import { ModalsService } from '../services/modals/modals.service';

@Component({
  selector: 'app-mensajeria-wind',
  templateUrl: './mensajeria-wind.component.html',
  styleUrls: ['./mensajeria-wind.component.css']
})
export class MensajeriaWindComponent implements OnInit {
  textSms = "";
  data_ventana_principal_canal_nuevo: any
  nombre_usuario_receptor = ""
  data_chat = { 'receptor': "mel@gmail.com", 'emisor': "bryanloor.21@gmail.com", 'servicio': "Guardia" }
  usuario_actual=localStorage.getItem("usuario_logeado")!.toString()

  constructor(
    public mensajeriaService: MensajeriaService,
    private route: ActivatedRoute,
    private modalService:ModalsService
    //private socketService: SocketService


  ) {
    //this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    //this.data_chat=JSON.parse(this.data_chat)
    console.log(this.data_chat)
    this.mensajeriaService.usuario_receptor = this.data_chat!['receptor']
    this.mensajeriaService.servicio_actual = this.data_chat!['servicio']

    /*this.route.queryParams
    .subscribe(params=>{
      //console.log(JSON.parse(JSON.stringify(params)))
      console.log(params)
      console.log(params['receptor'])
      console.log(params['servicio'])
      this.mensajeriaService.usuario_receptor=params['receptor']
      this.mensajeriaService.servicio_actual=params['servicio']

    })*/

    //this.socketService.setupSocketConnection()
  }

  ngOnInit(): void {
    this.modalService.closeAllModals()
    this.mensajeriaService.obtenerListaMensajes()
    this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    //this.mensajeriaService.obtenerListaMensajes()

    /*this.socketService.socket.on("OK",(  data: any  )=>{
      console.log(data)
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    })*/
    //this.socketService.setupSocketConnection();
    /*this.socketService.listen("OK").subscribe(res=>{
      console.log(res)
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    })*/
 



      /*
      const obs$ = interval(2000)
      obs$.subscribe((t) => {
        this.mensajeriaService.obtenerListaMensajes()
        this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
      })
      
      */
    


    /*this.mensajeriaService.socket.onmessage = (e: { data: string; }) => {
      const data = JSON.parse(e.data);
      console.log(data)
      this.mensajeriaService.obtenerListaMensajes()
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()

    };*/


  }
 

  ngOnDestroy() {
    //this.socketService.disconnect();
    console.log("desconectado")
  }
  sendMessage() {
    //console.log(this.mensajeriaService.contactosMensajes)
    if (this.textSms.length > 0) {
      this.mensajeriaService.sendMessage(this.textSms)
      //this.mensajeriaService.enviar()
      this.textSms = "";

    }



  }

  clickOnChat(mensaje: smsInfo2) {
    
    console.log(mensaje)
    this.mensajeriaService.servicio_actual = mensaje.canal__servicio
    this.mensajeriaService.num_servicio_actual = mensaje.canal__id_servicio

    this.mensajeriaService.nombre_usuario_receptor = mensaje.receptor
    this.mensajeriaService.usuario_receptor = mensaje.correo_receptor

    this.mensajeriaService.obtenerListaMensajes()
    this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
   

  }
  scrollDiv(){
    
    let div = document.getElementById('lista');
    //alert(div?.innerHTML)
    div?.scrollIntoView(true)
}

}



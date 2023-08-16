import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, last } from 'rxjs';
import { MensajeriaService, smsInfo2 } from '../services/mensajeria/mensajeria.service';
import { ModalsService } from '../services/modals/modals.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ClienteWAService } from '../services/cliente-wa.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { MatDialog } from '@angular/material/dialog';
import { NewChatWindComponent } from './new-chat-wind/new-chat-wind.component';

@Component({
  selector: 'app-mensajeria-wind',
  templateUrl: './mensajeria-wind.component.html',
  styleUrls: ['./mensajeria-wind.component.css']
})
export class MensajeriaWindComponent implements OnInit {
  
  appear_chat: boolean = false;

  lista_usuarios: Array<any>  = []

  constructor(
    public mensajeriaService: MensajeriaService,
    private route: ActivatedRoute,
    private modalService:ModalsService,
    private db: AngularFirestore,
    private clienteWAservice: ClienteWAService,
    public dialog: MatDialog
  ) {
   
  }

  ngOnInit(): void {
    let initializer;
    this.cargar_lista_usuarios();
  }

  appearChat(id: any ){
    localStorage.setItem('id_chat', id);
    // this.appear_chat = false;
    // this.appear_chat = true;
    if(this.appear_chat){
      this.appear_chat = false;

    }else{
      this.appear_chat = true;
    }
    
  }

  dissappearChat(){
    this.appear_chat = false;
  }

  cargar_lista_usuarios(){
    let documento = this.db.collection('mensajeria').snapshotChanges()
    documento.subscribe({
      next: (coleccion => {
        
        this.lista_usuarios = []
        coleccion.forEach(doc => {
          console.log(doc.payload.doc.data())
          this.clienteWAservice.obtenerCliente(doc.payload.doc.id)
          .subscribe({
            next: (cliente: any) => {
              let usuario: any = {
                id: doc.payload.doc.id,
                nombre: cliente.first_name,
                apellido: cliente.last_name,
                last_message_info: doc.payload.doc.data()
    
              }

              this.lista_usuarios.push(usuario);

            }
          })

      });
      this.lista_usuarios.sort((a, b) => a.last_message_info.fecha_ultimo_mensaje.nanoseconds - b.last_message_info.fecha_ultimo_mensaje.nanoseconds);
      })
    })
    
  }

  nuevoMensaje(){
    const ventanaGrupos =  this.dialog.open(NewChatWindComponent, {
      width: '70vh',
      height: '45vh',
    })

  }




 




  

}



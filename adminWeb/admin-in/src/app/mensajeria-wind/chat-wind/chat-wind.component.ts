import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-chat-wind',
  templateUrl: './chat-wind.component.html',
  styleUrls: ['./chat-wind.component.css']
})
export class ChatWindComponent implements OnInit, OnDestroy{

  id_chat: string = "";

  chat_cliente_administrador!: FormGroup;

  lista_mensajes: Array<any> = [];

  constructor(
    private db: AngularFirestore,
    private clienteWAService: ClienteWAService
  ) { }

  ngOnInit(): void {
    this.chat_cliente_administrador = new FormGroup({
      message: new FormControl(null, [Validators.required]),
      client_id: new FormControl(localStorage.getItem('id_chat')!)
    })

    console.log('initialize')
    this.obtenerChat();
  }

  ngOnDestroy(): void {
    let initializer;
    console.log('destroy')
  }

  obtenerChat(){
    this.id_chat = localStorage.getItem('id_chat')!;
    let documento = this.db.collection('mensajeria').doc(this.id_chat).collection('mensajes')
    documento.valueChanges().subscribe({
      next: (coleccion => {
        console.log(coleccion)
        this.lista_mensajes = [];
        this.lista_mensajes =  this.lista_mensajes.concat(coleccion)
        this.lista_mensajes.sort((a, b) => a.fecha_envio.seconds - b.fecha_envio.seconds);
      //   coleccion.forEach(doc => {
      //     console.log(doc.payload.doc.id);
      //     console.log(doc.payload.doc.data());
      // });
      })
    })
    
    console.log(this.lista_mensajes)
    //.doc('16').collection('mensajes') valueChanges()
  }

  enviarMensaje(formulario: any){
    // console.log(formulario.value)
    
    this.clienteWAService.enviarMensajeCliente(formulario.value)
    .subscribe({
      next: (response: any) => {
        console.log(response)
        this.chat_cliente_administrador.get('message')?.setValue(''); 
      }
    })

    
  }

}

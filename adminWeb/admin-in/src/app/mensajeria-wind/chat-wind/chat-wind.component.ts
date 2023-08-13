import { Component, OnDestroy, OnInit, ElementRef, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-chat-wind',
  templateUrl: './chat-wind.component.html',
  styleUrls: ['./chat-wind.component.css']
})
export class ChatWindComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked{

  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;

  id_chat: string = "";

  chat_cliente_administrador!: FormGroup;

  lista_mensajes: Array<any> = [];

  constructor(
    private db: AngularFirestore,
    private clienteWAService: ClienteWAService,
    private elementRef: ElementRef,
    private scrollDispatcher: ScrollDispatcher,
    
  ) { }

  scrollToBottom(): void {
    const element = this.elementRef.nativeElement.querySelector('#miDiv');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  ngOnInit(): void {
    this.chat_cliente_administrador = new FormGroup({
      message: new FormControl(null, [Validators.required]),
      client_id: new FormControl(localStorage.getItem('id_chat')!)
    })
    this.obtenerChat();

    // this.scrollToBottom();
    // this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start"})

  }

  ngOnDestroy(): void {
    let initializer;
    console.log('destroy')
  }

  ngAfterViewInit() {
    // Después de que se haya cargado la vista (el div con muchos datos),
    // desplázate automáticamente al final del div
    this.scrollToBottom();
  }

  ngAfterViewChecked(){
    const element = this.elementRef.nativeElement.querySelector('#miDiv');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  obtenerChat(){
    this.id_chat = localStorage.getItem('id_chat')!;
    let documento = this.db.collection('mensajeria').doc(this.id_chat).collection('mensajes')
    documento.valueChanges().subscribe({
      next: (coleccion => {
        console.log(coleccion)
        this.lista_mensajes = [];
        this.lista_mensajes =  this.lista_mensajes.concat(coleccion)
        this.lista_mensajes.sort((a, b) => b.fecha_envio.seconds - a.fecha_envio.seconds);
        this.scrollToBottom()
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

  obtenerHoraActual(segundos: number): string {
    const fechaActual = new Date();
    fechaActual.setSeconds(segundos);

    const horas = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const segundosStr = fechaActual.getSeconds().toString().padStart(2, '0');

    return `${horas}:${minutos}`;
  }


}

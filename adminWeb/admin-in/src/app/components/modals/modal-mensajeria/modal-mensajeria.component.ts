import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";



import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';




@Component({
  selector: 'app-modal-mensajeria',
  templateUrl: './modal-mensajeria.component.html',
  styleUrls: ['./modal-mensajeria.component.css']
})
export class ModalMensajeriaComponent implements OnInit {
  
  usuario_actual=localStorage.getItem('usuario_logeado')
  lista_mensajes: Array<any> = []
  app = initializeApp(environment.firebase);
  // db = getFirestore(this.app);

  constructor(
    public mensajeriaService: MensajeriaService,
    private router:Router,
    private db: AngularFirestore

  ) { }

  ngOnInit(): void {
    // this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    // this.obs$.subscribe(res=>{
    //   this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    // })
    this.obtenerMensajes()
  }
  irMensajeria(){
    console.log("ir mensajeria")
    this.router.navigate(['/mensajeriaVentana'])

    

  }

  async obtenerMensajes(): Promise<void>{
    this.lista_mensajes = [
      {
        nombre: "Ricardo Salazar",
        mensaje: "Este es un mensaje de prueba",
        fecha_de_envio: "2023-07-22"

      },
      {
        nombre: "Ricardo Salazar",
        mensaje: "Este es un mensaje de prueba",
        fecha_de_envio: "2023-07-22"

      },
      {
        nombre: "Ricardo Salazar",
        mensaje: "Este es un mensaje de prueba",
        fecha_de_envio: "2023-07-22"

      }
    ]
    let documento = this.db.collection('mensajeria').snapshotChanges()
    documento.subscribe({
      next: (coleccion => {
        // console.log(coleccion)
        coleccion.forEach(doc => {
          // console.log(doc.payload.doc.id);
          console.log(doc.payload.doc.data());
      });
      })
    })
    //.doc('16').collection('mensajes') valueChanges()

  }


  
}

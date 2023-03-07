import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';

@Component({
  selector: 'app-modal-mensajeria',
  templateUrl: './modal-mensajeria.component.html',
  styleUrls: ['./modal-mensajeria.component.css']
})
export class ModalMensajeriaComponent implements OnInit {
  obs$=interval(2000)
  usuario_actual=localStorage.getItem('usuario_logeado')
  constructor(
    public mensajeriaService: MensajeriaService,
    private router:Router,

  ) { }

  ngOnInit(): void {
    this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    this.obs$.subscribe(res=>{
      this.mensajeriaService.obtenerMensajesPorUsuarioLogeado()
    })
  }
  irMensajeria(){
    console.log("ir mensajeria")
    this.router.navigate(['/mensajeriaVentana'])
    
    

  }
}

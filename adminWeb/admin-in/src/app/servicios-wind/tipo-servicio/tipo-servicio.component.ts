import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { ServicioCrearComponent } from '../servicio-crear/servicio-crear.component';
import { Router } from '@angular/router';
import { InfoServicioComponent } from '../info-servicio/info-servicio.component';
import { getToken, onMessage, getMessaging } from 'firebase/messaging';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.css']
})
export class TipoServicioComponent implements OnInit {

  lista_Servicio: Array<any> = [];

  constructor(
    private clienteWAService: ClienteWAService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerServicios();
    this.requestPermission()
  }

  obtenerServicios(){
    this.clienteWAService.obtenerNombreServicios()
    .subscribe({
      next: (res: any) => {
        this.lista_Servicio = this.lista_Servicio.concat(res);

      }
    })
  }

  crearServicio(){
    this.router.navigateByUrl("/serviciosVentana/crearServicio")
    
  //   this.dialog.open(ServicioCrearComponent, {
  //     width: '100vh',
  //     height: '50vh',
  //     data: 23
  // })
  }

  verServicio(id: any){
    console.log(id);
    this.clienteWAService.obtenerServicioPorId(id)
    .subscribe({
      next: (res)=>{
        console.log(res);
        this.dialog.open(InfoServicioComponent, {
              width: '100vh',
              height: '50vh',
              data: res
        })
      }
    })

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

  urlImg(){
    
  }

}

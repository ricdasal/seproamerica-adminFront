import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalsService } from 'src/app/services/modals/modals.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent implements OnInit {
  data=JSON.parse(localStorage.getItem("datoUsuario")!)
  nombre_perfil= 'usuario promedio';
  nombre_sucursal = 'sucursal generica';
  datos_cargados: boolean = false;

  constructor(
    private router:Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private modalService:ModalsService,
    private dialogRef: MatDialogRef<any>,
    private clienteWAservice: ClienteWAService
  ) { }



  ngOnInit(): void {
    this.obtenerUsuario();
  }

  irPerfil(){
    this.router.navigate(['/perfil']);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.cookieService.deleteAll()
    //this.authService.logout()
    this.onCloseClick();
    this.router.navigate(['/login'])
    this.dialogRef.close();
    
    
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }

  obtenerUsuario(){
    this.clienteWAservice.obtenerUsuarioAdmin(localStorage.getItem('user_id'))
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.nombre_perfil = data.first_name  + " " + data.last_name;
        this.nombre_sucursal = data.branch;
        this.datos_cargados = true;
      }
    })

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalsService } from 'src/app/services/modals/modals.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent implements OnInit {
  data=JSON.parse(localStorage.getItem("datoUsuario")!)
  nombre_perfil= 'usuario promedio'

  constructor(
    private router:Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private modalService:ModalsService,
    private dialogRef: MatDialogRef<ModalPerfilComponent>
  ) { }

  ngOnInit(): void {
  }

  irPerfil(){
    this.router.navigate(['/perfil']);
  }

  logout(){
    localStorage.clear()
    this.cookieService.deleteAll()
    //this.authService.logout()
    this.onCloseClick();
    this.router.navigate(['/login'])
    
    
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
}

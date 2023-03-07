import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalsService } from 'src/app/services/modals/modals.service';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent implements OnInit {
  data=JSON.parse(localStorage.getItem("datoUsuario")!)
  nombre_perfil=this.data.nombres+" "+this.data.apellidos

  constructor(
    private router:Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private modalService:ModalsService
  ) { }

  ngOnInit(): void {
  }

  irPerfil(){
    this.router.navigate(['/perfil'])
  }

  logout(){
    //document.getElementById("container")?.remove()
    //HeaderComponent.dialogRef.closeAll()
    //this.modalService.getDialogRef().closeAll()
    localStorage.clear()
    this.cookieService.deleteAll()
    this.authService.logout()
    
    
  }
}

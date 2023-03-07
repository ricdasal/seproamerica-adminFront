import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, ResolveEnd, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { filter, map, tap,} from 'rxjs/operators';
import { catchError,  Observable} from "rxjs";
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import {firstValueFrom} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RegisterModel } from '../models/register.model';



@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate/*,CanLoad*/{

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  private valorRetorno: boolean = false;

  private entrada: number = 0;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean  {
    //Para manener la sesion despues del refresh de la pagina principal
    const data = localStorage.getItem("usuario_logeado")
    if(data != null){
      this.authService.envioCorreoLS(data)
    }
    console.log(data)
    //
    console.log("se usa")
    console.log(this.cookieService.get('usuario'))
    let navigarLogIn = () => this.router.navigate([''])
    return new Promise((resolve) => {
      console.log(this.cookieService.get('usuario'))
      console.log(this.existeCookie())
      if(this.existeCookie()){
        console.log("Existe cookie")
        this.descifrarDatosUsuario()
        resolve(true)
      }
      else{
        console.log("No existe cookie")
        this.authService.estaAutenticado()
        .subscribe((r: boolean) => {
          console.log(r)
          if(r == false){
            console.log("No puede entrar")
            this.router.navigate(['']);
            resolve(false)
          } else {
            console.log("Puede entrar")
            this.entrada = 1;
            console.log(this.entrada)
            resolve(true)
          }
        })
      }
    });
    
  }

  /*canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return true;
  }*/
  /*public estaLogeado(): boolean {
    let estado = false;
    if (localStorage.getItem('estaLogeado') == "true"){
      estado = true;
    }else{
      estado = false;
    }
    return estado;
  }*/

  public existeCookie(): boolean{
    let usuarioCookie = this.cookieService.get('usuario');
    console.log(usuarioCookie)
    if(usuarioCookie){
      return true
    }
    return false
  }

  public descifrarDatosUsuario(){

    let datoUsuario: {apellidos: String; cedula:Number; contrasenia: String; 
      correo:String; direccion: string; fechaNac: Date; fechaRegistro: Date; 
      nombres: String; rol: Number; sexo: String; telefono: Number} = JSON.parse(this.cookieService.get('usuario') as string);
    if(!datoUsuario){
      return;
    }

    let usuarioDeLocalStorage : RegisterModel = {
      apellidos: datoUsuario.apellidos,
      nombres: datoUsuario.nombres,
      cedula: datoUsuario.cedula,
      fechaNac: datoUsuario.fechaNac,
      sexo: datoUsuario.sexo,
      correo: datoUsuario.correo,
      telefono: datoUsuario.telefono,
      contrasenia: datoUsuario.contrasenia,
      rol: '1'
    };

    this.authService.infoPutUsuario(usuarioDeLocalStorage);

  }


}

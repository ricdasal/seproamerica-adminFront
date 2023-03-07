import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoPermitidoSinSesionActivaGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return false;
    console.log(localStorage.getItem('ingresado'))
    if(localStorage.getItem('ingresado')){
      console.log("ingresado")
      this.router.navigate(['/serviciosVentana'])
      return false
    }else{
      console.log("no ingresado")
      return true      
    }

  }
  
}

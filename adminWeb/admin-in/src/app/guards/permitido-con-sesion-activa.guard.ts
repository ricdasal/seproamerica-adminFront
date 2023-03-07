import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermitidoConSesionActivaGuard implements CanActivate {
  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    console.log(localStorage.getItem('ingresado'))
    if(localStorage.getItem('ingresado')){
      console.log("ingresado")
      return true
    }else{
      console.log("no ingresado")
      this.router.navigate(['/login'])
      
      return true      
    }
  }
  
}

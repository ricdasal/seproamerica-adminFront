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
    return false;
    // console.log(localStorage.getItem('ACCESS_TOKEN'))
    // if(localStorage.getItem('ACCESS_TOKEN')){
    //   this.router.navigate(['/serviciosVentana'])
    //   return false
    // }else{
    //   return true      
    // }

  }
  
}

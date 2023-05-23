import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermitidoConTipoDeUsuarioGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkTypeUser(route);
  }

  checkTypeUser(route: ActivatedRouteSnapshot): boolean{
    const scope = localStorage.getItem('group')
    if(scope == 'administrador'){
      return true;
    }
    return false;
  }
  
}

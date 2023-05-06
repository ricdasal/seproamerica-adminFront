import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComunicarComponentesService {

  object = new BehaviorSubject<any>({});
  currentObject = this.object.asObservable();

  evento: EventEmitter<any> = new EventEmitter();

  constructor() { }

  asignarObjeto(objeto: any){
    this.object.next(objeto);
  }
}

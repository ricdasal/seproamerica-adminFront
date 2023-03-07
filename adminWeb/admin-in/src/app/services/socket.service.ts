import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  url="http://localhost:3000/"
  io =io(this.url,{
    withCredentials:true,    
    autoConnect:true

  })
  constructor() {
   
  }

}

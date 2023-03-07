import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const     baseUrl = 'http://127.0.0.1:8000/api/visualizarVehiculos/';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  datos: any[] = [];

  constructor(private http: HttpClient) { }


    eliminarVehiculo(index: number){
      this.datos.splice(index,1);
    }

    getAllVehiculo(): Observable<any[]> {
      return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarVehiculos');
    }

    obtenerVehiculo(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarVehiculos');
      }
  
    //metodos obtenido de clienteWAService
    createVehiculo(data: any): Observable<any>{
      return this.http.post('http://127.0.0.1:8000/api/visualizarVehiculos/', data)
    }


    //eliminar vehiculo
    deleteVehiculo (placa: any): Observable<any> {
      return this.http.delete(`${baseUrl}/${placa}`);
    }


    eliminarCandado(index: number){
      this.datos.splice(index,1);
    }

    getAllCandado(): Observable<any[]> {
      return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarCandados');
    }

    obtenerCandado(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarCandados');
      }

  createCandado(data: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/visualizarCandados/', data)
  }
    
    eliminarArmamento(index: number){
      this.datos.splice(index,1);
    }

    getAllArmamento(): Observable<any[]> {
      return this.http.get<any[]>('http://127.0.0.1:8000/api/visualizarArmamentos');
    }

    obtenerArmamento(){
        return this.http.get('http://127.0.0.1:8000/api/visualizarArmamentos');
      }

      createArmamento(data: any): Observable<any>{
        return this.http.post('http://127.0.0.1:8000/api/visualizarArmamentos/', data)
      }
}

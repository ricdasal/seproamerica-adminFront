import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfPersonalService } from '../services/inf-personal.service';
import { PersonalOpModel } from '../models/personalOp.models';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-personal-wind',
  templateUrl: './personal-wind.component.html',
  styleUrls: ['./personal-wind.component.css']
})

export class PersonalWindComponent implements OnInit{
    emp:any;
    nombres!: string;
    apellidos!: string;
    numCedula!: string;
    sexo!: string;
    correo!: string;
    fechaNac!: string;
    telefono!: string;
    rol!: string;


    

    //cedula temporal
    cedula_temp!: number


    //datos: PersonalOpN[] = [];
    

    
  
    
    constructor (
      private _infPersonalService: InfPersonalService, 
      private clienteWAService: ClienteWAService, 
      private router: Router,
      private http: HttpClient,
      
      ){}
 

    ngOnInit(): void {
      
      /*this._infPersonalService.getAllPersonalOp().subscribe(respuesta => {
        this.dataSource = respuesta as any;
      })
      this.dataSource = new MatTableDataSource<any>(this.personalList);
      this.dataSource.paginator = this.paginator;*/
      
    }

    obtener_personal():void {
      /*this.clienteWAService.obtener_personalOp()
      .subscribe({
        next: (data) => {
          console.log(data)
          this.lista_personal = data;
        },
        error: (e) => console.error(e)
      });*/
      //this.http.get<any>(this.clienteWAService.DJANGO_SERVER_OBTENER_PERSONAL_OP).subscribe({
          
    }
    
    

    guardar_cedula_eliminar(cedula: number){
      this.cedula_temp = cedula
      console.log("La cedula temporal es")
      console.log(this.cedula_temp)
    }
    
    eliminarUsuario(){
      let elem = document.getElementById("mensajeDeConfirmacionDos") 
      if(elem?.innerHTML != undefined){
        elem.innerHTML = " ";
      }
      this.clienteWAService.eliminar_personaOp(this.cedula_temp)
      .subscribe({
        next: (res) => {
          console.log(res)
          let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
          if(elemento_Dos?.innerHTML != undefined){
            elemento_Dos!.innerHTML = "El personal ha sido eliminado"
          }
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
      /*console.log(index);
      this._infPersonalService.eliminarRegistro(index);
      this.cargarUsuarios();*/
    }

    agregarPersonalOp(){
      var val = {nombres:this.nombres,
                  apellidos:this.apellidos,
                  numCedula:this.numCedula,
                  sexo:this.sexo,
                  correo:this.correo};
  
      this._infPersonalService.agregarPersonalOp(val).subscribe(res=>{
        alert(res.toString());
      });
    }
  
    updatePersonalOp(){
      var val = {nombres:this.nombres,
        apellidos:this.apellidos,
        numCedula:this.numCedula,
        sexo:this.sexo,
        correo:this.correo};
  
      this._infPersonalService.updatePersonalOp(val).subscribe(res=>{
      alert(res.toString());
      });
    }

    /*mostrar_detalles(cedula: number){
      console.log("Muestreo de detalles")
      localStorage.setItem('cedula_personalOp', cedula.toString())
      this.router.navigate(['/personalActualizar'])
    }*/

    enviar_personalop_seleccionado(id_personal: number){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      });
      this.http.request('GET', `${this.clienteWAService.DJANGO_SERVER_OBTENER_PERSONAL_OP_INDIVIDUAL}?id=${id_personal}`,{headers})
      .subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('detalles_personal', JSON.stringify(data));
          this.router.navigate(['/personalActualizar']);
        }
      })
      /*
      this.clienteWAService.obtener_personalOp_especifico(cedula_personal.toString())
      .subscribe({
        next: (data) => {
          console.log(data)
          localStorage.setItem('detalles_personal', JSON.stringify(data))
          this.router.navigate(['/personalActualizar'])
        },
        error: (e) => console.log(e)
      });*/
    }

    //nuevas funciones

   
  }


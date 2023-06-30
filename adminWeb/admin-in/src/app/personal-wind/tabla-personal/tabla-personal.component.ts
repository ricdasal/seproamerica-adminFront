import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import { InfPersonalService } from 'src/app/services/inf-personal.service';
import { PersonalAdminRegistroComponent } from '../personal-admin-registro/personal-admin-registro.component';
import { PersonalRegistroComponent } from '../personal-registro/personal-registro.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditPersonalComponent } from './edit-personal/edit-personal.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { PerfilPersonalComponent } from './perfil-personal/perfil-personal.component';

interface Filtro {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tabla-personal',
  templateUrl: './tabla-personal.component.html',
  styleUrls: ['./tabla-personal.component.css']
})
export class TablaPersonalComponent implements OnInit {

  //Lista para guardar los servicios ya creados
  lista_personal: Array<any> = [];

  personalList:any=[];
   columnas: string[] = ['Nombres','Apellidos','Contacto','Correo','Opciones'];
   dataSource!: MatTableDataSource<any>;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

   display = 'none';

     filtros: Filtro[] = [
    {value: 'administrador', viewValue: 'Usuarios administrador'},
    {value: 'operativo', viewValue: 'Usuarios operativo'},
    {value: 'todos', viewValue: 'Todos los usuarios'},
  ];
  selectedValue: string | undefined;



  constructor(
    private _infPersonalService: InfPersonalService, 
    private clienteWAService: ClienteWAService, 
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('cedula_personalOp')
      localStorage.removeItem('detalles_personal')
      //this.obtener_personal()
      console.log("Lista de personal")
      this.obtenerUsuarios();
      //console.log(this.lista_personal)
      this.cargarUsuarios();
  }

  obtenerUsuarioFiltro(){

    if(this.selectedValue == 'administrador'){
      console.log('administrador')
      this.obtenerPersonalAdministrativo();
    }
    else if(this.selectedValue == 'operativo'){
      console.log('guardia')
      this.obtenerPersonalOperativo();
    }
    else if(this.selectedValue == 'todos'){
      console.log('todos');
      this.obtenerUsuarios()
    }
  }

  cargarUsuarios(){  
    console.log(this.lista_personal);
    //this.dataSource = new MatTableDataSource(this.datos);
    this.dataSource = new MatTableDataSource<any>(this.lista_personal);
    this.dataSource.paginator = this.paginator;
  }


  obtenerUsuarios(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(this.clienteWAService.DJANGO_SERVER_TODO_PERSONAL, {headers})
    .subscribe({
      next: (data) => {
        console.log(data);
        this.lista_personal = []; 
        this.lista_personal = this.lista_personal.concat(data);

      }
    })  
  }

  verPersonal(isAdmin: any, id: any){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    if(isAdmin){

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_ADMINISTRADOR}${id}`, {headers})
      .subscribe({
        next: (admin: any) => {
          const ventanaGrupos =  this.dialog.open(PerfilAdminComponent, {
            width: '80vh',
            height: '57vh',
            data: admin
          })
        }
      })

    }else{ 

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_PERSONAL_OP_INDIVIDUAL}${id}`, {headers})
      .subscribe({
        next: (personal: any) => {
          const ventanaGrupos =  this.dialog.open(PerfilPersonalComponent, {
            width: '80vh',
            height: '57vh',
            data: personal
          })
        }
      })

    }
  }



  obtenerPersonalAdministrativo(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(this.clienteWAService.DJANGO_SERVER_OBTENER_PERSONALADM, {headers})
    .subscribe({
      next: (data: any) => {
        console.log(data);        
        this.lista_personal = [];
        this.lista_personal = this.lista_personal.concat(data);

      }
    })  

  }

  obtenerPersonalOperativo(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });

    this.http.get(this.clienteWAService.DJANGO_SERVER_OBTENER_PERSONAL_OP, {headers})
    .subscribe({
      next: (data: any) => {
        console.log(data);        
        this.lista_personal = [];
        this.lista_personal = this.lista_personal.concat(data);

      }
    }) 
  }


  crearPersonalOperativo(){
    const ventanaGrupos =  this.dialog.open(PersonalRegistroComponent, {
      width: '70vh',
      height: '80vh',
    })
  }

  crearPersonalAdministrativo(){
    const ventanaGrupos =  this.dialog.open(PersonalAdminRegistroComponent, {
      width: '70vh',
      height: '80vh',
    })

  }

  eliminarUsuario(id: any){
    const ventanaGrupos =  this.dialog.open(EliminarUsuarioComponent, {
      width: '70vh',
      height: '50vh',
      data: id
    })
  }

  editarUsuario(isAdmin: any, id: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    if(isAdmin){

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_ADMINISTRADOR}${id}`, {headers})
      .subscribe({
        next: (admin: any) => {
          console.log(admin);
          const ventanaGrupos =  this.dialog.open(EditAdminComponent, {
            width: '90vh',
            height: '80vh',
            data: admin
          })
        }
      })

    }else{ 

      this.http.get(`${this.clienteWAService.DJANGO_SERVER_OBTENER_PERSONAL_OP_INDIVIDUAL}${id}`, {headers})
      .subscribe({
        next: (personal: any) => {
          const ventanaGrupos =  this.dialog.open(EditPersonalComponent, {
            width: '70vh',
            height: '80vh',
            data: personal
          })
        }
      })

    }
  }


}

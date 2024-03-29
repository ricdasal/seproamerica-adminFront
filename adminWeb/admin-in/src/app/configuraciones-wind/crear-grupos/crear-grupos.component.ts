import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';

@Component({
  selector: 'app-crear-grupos',
  templateUrl: './crear-grupos.component.html',
  styleUrls: ['./crear-grupos.component.css']
})
export class CrearGruposComponent implements OnInit {

  registerForm!: FormGroup;
  

  // permisos = new FormControl('');
  lista_permisos: Array<any> = [];

  lista_group_type: Array<any> = ["administrativo", "cliente", "operativo"];
  // group_types = new FormControl([]);

 


  constructor(
    private http: HttpClient,
    private clientewaService: ClienteWAService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.obtenerPermisos();

    

    // this.registerForm = this.formBuilder.group({
    //   'name': [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    //   'permissions': [this.permisos, [Validators. required]],
    //   'group_type': [this.group_types, [Validators.required]]

    // })

    this.registerForm = new FormGroup({
      name: new FormControl(''),
      permissions: new FormControl(''),
      group_type: new FormControl([]),

    })


    
    
  }

  obtenerPermisos(): void{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.get(`${this.clientewaService.DJANGO_SERVER_OBTENER_PERMISOS_USUARIO}`, {headers})
    .subscribe({
      next: (data: any)=>{
        this.lista_permisos = this.lista_permisos.concat(data['permissions']);

      }
    });
  }

  registrarGrupo(){
    console.log(this.registerForm.value);

  }

  guardar_grupos(form: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.post(`${this.clientewaService.DJANGO_SERVER_CREAR_GRUPOS}`, form.value, {headers}).
    subscribe({
      next: (data: any) => {
        console.log(data);
      }
        
      
    })


  }








  

}

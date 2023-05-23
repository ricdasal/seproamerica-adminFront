import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-cargos',
  templateUrl: './crear-cargos.component.html',
  styleUrls: ['./crear-cargos.component.css']
})
export class CrearCargosComponent implements OnInit {
  registerForm!: FormGroup;

  lista_group_type: Array<any> = ["administrativo", "cliente", "operativo"];
  group_types = new FormControl('');
  permisos = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      description: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      type: new FormControl(null, [Validators.required])


    })
  }
  crear_cargos(form: any){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    this.http.post(`https://seproamerica2022.pythonanywhere.com/users/charge/`, form.value, {headers}).
    subscribe({
      next: (data: any) => {
        console.log(data);
      }
        
      
    })
  }

}

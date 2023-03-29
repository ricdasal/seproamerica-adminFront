import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MensajeriaWindComponent } from './mensajeria-wind/mensajeria-wind.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonalRegistroComponent } from './personal-wind/personal-registro/personal-registro.component';
import { PersonalWindComponent } from './personal-wind/personal-wind.component';
import { RecursosArmasComponent } from './recursos-wind/recursos-armas/recursos-armas.component';
import { RecursosCandadosComponent } from './recursos-wind/recursos-candados/recursos-candados.component';
import { RecursosCelularComponent } from './recursos-wind/recursos-celular/recursos-celular.component';
import { RecursosVehiculosComponent } from './recursos-wind/recursos-vehiculos/recursos-vehiculos.component';
import { RecursosWindComponent } from './recursos-wind/recursos-wind.component';
import { RegistroComponent } from './registro/registro.component';
import { ReportesWindComponent } from './reportes-wind/reportes-wind.component';
import { ServiciosWindComponent } from './servicios-wind/servicios-wind.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermitidoConSesionActivaGuard } from './guards/permitido-con-sesion-activa.guard';
import { NoPermitidoSinSesionActivaGuard } from './guards/no-permitido-sin-sesion-activa.guard';
import { ServicioCrearComponent } from './servicio-crear/servicio-crear.component';
import { ServicioEditarEliminarComponent } from './servicio-editar-eliminar/servicio-editar-eliminar.component';
import { TipoServicioComponent } from './servicios-wind/tipo-servicio/tipo-servicio/tipo-servicio.component';
import { ServicioPorAsignarComponent } from './servicios-wind/servicio-por-asignar/servicio-por-asignar/servicio-por-asignar.component';
import { ServicioEnCursoComponent } from './servicios-wind/servicio-en-curso/servicio-en-curso/servicio-en-curso.component';
import { PersonalActualizarComponent } from './personal-wind/personal-actualizar/personal-actualizar.component';
import { PersonalAdminRegistroComponent } from './personal-wind/personal-admin-registro/personal-admin-registro.component';
import { ServicioDetallesAsignacionComponent } from './servicio-detalles-asignacion/servicio-detalles-asignacion.component';
import { TablaPersonalComponent } from './personal-wind/tabla-personal/tabla-personal.component';
import { TablaClientesComponent } from './personal-wind/tabla-clientes/tabla-clientes.component';
import { TablaCuentasTelefonoComponent } from './personal-wind/tabla-cuentas-telefono/tabla-cuentas-telefono.component';
import { EditVehiculosComponent } from './recursos-wind/recursos-vehiculos/edit-vehiculos/edit-vehiculos.component';



//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'login', 
  component: InicioSesionComponent, pathMatch: 'prefix',},
  //canActivate:[NoPermitidoSinSesionActivaGuard]},
  { path: 'personalVentana', component: PersonalWindComponent,
    children: [
      /*{ path: 'personalAdminRegistro', component: PersonalAdminRegistroComponent, pathMatch: 'prefix',
        canActivate:[PermitidoConSesionActivaGuard]},
      /*{ path: 'registrarPer', component: PersonalRegistroComponent, pathMatch: 'prefix',
        canActivate:[PermitidoConSesionActivaGuard]},*/
      { path: 'tablaPersonalOperativo', component: TablaPersonalComponent, pathMatch: 'prefix',
        canActivate:[PermitidoConSesionActivaGuard]},
      {path: 'tablaClientes', component: TablaClientesComponent, pathMatch:'prefix',
        canActivate:[PermitidoConSesionActivaGuard]
      },
      {path: 'tablaCuentas', component: TablaCuentasTelefonoComponent, pathMatch: 'prefix',
        canActivate:[PermitidoConSesionActivaGuard]
      },
      { path: '', redirectTo: '/personalVentana/tablaPersonalOperativo', pathMatch: 'prefix'},
    ], 
    pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard] 
  },

  { path: 'recursosVentana', component: RecursosWindComponent, 
  children: [
    { path: 'vehiculosSec', component: RecursosVehiculosComponent, pathMatch: 'prefix',
      canActivate:[PermitidoConSesionActivaGuard] },
    { path: 'celularesSec', component: RecursosCelularComponent, pathMatch: 'prefix',
      canActivate:[PermitidoConSesionActivaGuard] },
    { path: 'armasSec', component: RecursosArmasComponent, pathMatch: 'prefix',
      canActivate:[PermitidoConSesionActivaGuard] },
    { path: 'candadosSec', component: RecursosCandadosComponent, pathMatch: 'prefix',
      canActivate:[PermitidoConSesionActivaGuard] },
    { path: '', redirectTo: '/recursosVentana/vehiculosSec', pathMatch: 'prefix'},
  ],
  pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard]
},

  

  { path: 'registro', component: RegistroComponent, pathMatch: 'prefix',    
  canActivate:[NoPermitidoSinSesionActivaGuard]},
  { path: 'perfil', component: PerfilComponent, pathMatch: 'prefix',    
  canActivate:[PermitidoConSesionActivaGuard]},



  { path: 'serviciosVentana/:token', component: ServiciosWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'servicioCrear', component: ServicioCrearComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'servicioEditarEliminar', component: ServicioEditarEliminarComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'serviciosTipo', component: TipoServicioComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'serviciosPorAsignar', component: ServicioPorAsignarComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'serviciosDetallesAsignacion', component: ServicioDetallesAsignacionComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'serviciosEnCurso', component: ServicioEnCursoComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },

  

  { path: 'personalActualizar', component: PersonalActualizarComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  
  { path: 'reportesVentana', component: ReportesWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  { path: 'mensajeriaVentana', component: MensajeriaWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },
  


  { path: '', redirectTo: '/login', pathMatch: 'prefix' },

  { path: '**', component: NotFoundComponent, pathMatch: 'prefix' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

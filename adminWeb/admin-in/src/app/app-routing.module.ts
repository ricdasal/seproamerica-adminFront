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
import { ServicioCrearComponent } from './servicios-wind/servicio-crear/servicio-crear.component';
import { ServicioEditarEliminarComponent } from './servicios-wind/servicio-editar-eliminar/servicio-editar-eliminar.component';
import { TipoServicioComponent } from './servicios-wind/tipo-servicio/tipo-servicio.component';
import { ServicioPorAsignarComponent } from './servicios-wind/servicio-por-asignar/servicio-por-asignar/servicio-por-asignar.component';
import { ServicioEnCursoComponent } from './servicios-wind/servicio-en-curso/servicio-en-curso/servicio-en-curso.component';
import { PersonalActualizarComponent } from './personal-wind/personal-actualizar/personal-actualizar.component';
import { PersonalAdminRegistroComponent } from './personal-wind/personal-admin-registro/personal-admin-registro.component';
import { ServicioDetallesAsignacionComponent } from './servicios-wind/servicio-detalles-asignacion/servicio-detalles-asignacion.component';
import { TablaPersonalComponent } from './personal-wind/tabla-personal/tabla-personal.component';
import { TablaClientesComponent } from './personal-wind/tabla-clientes/tabla-clientes.component';
import { TablaCuentasTelefonoComponent } from './personal-wind/tabla-cuentas-telefono/tabla-cuentas-telefono.component';
import { EditVehiculosComponent } from './recursos-wind/recursos-vehiculos/edit-vehiculos/edit-vehiculos.component';
import { CrearGruposComponent } from './configuraciones-wind/crear-grupos/crear-grupos.component';
import { MapWindComponent } from './servicios-wind/servicio-en-curso/map-wind/map-wind.component';
import { ServicioEapComponent } from './servicios-wind/servicio-eap/servicio-eap.component';
import { PermitidoConTipoDeUsuarioGuard } from './guards/permitido-con-tipo-de-usuario.guard';
import { ConfiguracionesWindComponent } from './configuraciones-wind/configuraciones-wind.component';
import { CrearCargosComponent } from './configuraciones-wind/crear-cargos/crear-cargos.component';
import { NotificacionModalComponent } from './components/modals/notificacion-modal/notificacion-modal.component';
import { MensajeConfirmacionComponent } from './components/modals/mensaje-confirmacion/mensaje-confirmacion.component';
import { MensajeConfirmacionCrearComponent } from './components/modals/mensaje-confirmacion-crear/mensaje-confirmacion-crear.component';
import { GenerarReporteComponent } from './reportes-wind/generar-reporte/generar-reporte.component';
import { ServicioAceptadoComponent } from './servicios-wind/servicio-eap/servicio-aceptado/servicio-aceptado.component';
import { ChatWindComponent } from './mensajeria-wind/chat-wind/chat-wind.component';
import { ValoresGeneradosComponent } from './reportes-wind/generar-reporte/valores-generados/valores-generados.component';
import { TermsComponent } from './terms/terms.component';
import { DeleteAccStepsComponent } from './delete-acc-steps/delete-acc-steps.component';


const routes: Routes = [

  { path: 'login', 
  component: InicioSesionComponent, pathMatch: 'prefix', canActivate:[NoPermitidoSinSesionActivaGuard]},
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
  { path: 'serviciosVentana', component: ServiciosWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard], children: [
    { path: 'servicioEditarEliminar', component: ServicioEditarEliminarComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard] },
    { path: 'serviciosTipo', component: TipoServicioComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard], children: []},
    { path: 'serviciosPorAsignar', component: ServicioPorAsignarComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard] },
    {path: 'todosLosServicios', component: ServicioEapComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard], children: [
      
    ]},
    {path: 'detalleServicio', component: ServicioAceptadoComponent, pathMatch: 'prefix', 
      canActivate: [PermitidoConSesionActivaGuard]},
    { path: 'serviciosDetallesAsignacion', component: ServicioDetallesAsignacionComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard] },
    { path: 'serviciosEnCurso', component: ServicioEnCursoComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard] },
    {path: 'crearServicio', component: ServicioCrearComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard]},
    { path: '', redirectTo: '/serviciosVentana/serviciosTipo', pathMatch: 'prefix'},
  ] },
  { path: 'configuraciones', component: ConfiguracionesWindComponent, pathMatch: 'prefix', 
  canActivate:[PermitidoConSesionActivaGuard, PermitidoConTipoDeUsuarioGuard], children: [
    {path: 'grupos', component: CrearGruposComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard, PermitidoConTipoDeUsuarioGuard]},
    {path: 'cargos', component: CrearCargosComponent, pathMatch:'prefix',
    canActivate:[PermitidoConSesionActivaGuard, PermitidoConTipoDeUsuarioGuard]},
    { path: '', redirectTo: '/configuraciones/grupos', pathMatch: 'prefix'},

  ]},
  { path: 'reportesVentana', component: ReportesWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard], children: [
    {path: 'generarReporte', component: GenerarReporteComponent, pathMatch: 'prefix',
    canActivate: [PermitidoConSesionActivaGuard]},
    {path: 'valoresGenerados', component: ValoresGeneradosComponent, pathMatch: 'prefix',
    canActivate: [PermitidoConSesionActivaGuard]},
    {path: '', redirectTo: '/reportesVentana/generarReporte', pathMatch: 'prefix'},
    
  ]},
  { path: 'buzon-mensajes', component: MensajeriaWindComponent, pathMatch: 'prefix',  
  canActivate:[PermitidoConSesionActivaGuard], children: [
    {path: 'chat', component: ChatWindComponent, pathMatch: 'prefix', 
    canActivate: [PermitidoConSesionActivaGuard]},
    {path: '', redirectTo: '/buzon-mensajes/chat', pathMatch: 'prefix'},
  ]},


  { path: 'registro', component: RegistroComponent, pathMatch: 'prefix',    
  canActivate:[NoPermitidoSinSesionActivaGuard]},
  { path: 'perfil', component: PerfilComponent, pathMatch: 'prefix',    
  canActivate:[PermitidoConSesionActivaGuard]},

  

  {path: 'map', component: MapWindComponent, pathMatch: 'prefix'},
  {path: 'notificacion', component: NotificacionModalComponent, pathMatch:'prefix'},
  // {path: 'confirmacion', component: MensajeConfirmacionCrearComponent, pathMatch: 'prefix'},



  
  

    { path: 'personalActualizar', component: PersonalAdminRegistroComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard] },
    {path: 'personalActualiza', component: PersonalRegistroComponent, pathMatch: 'prefix',
    canActivate:[PermitidoConSesionActivaGuard]},

  

  { path: 'mensajeriaVentana', component: MensajeriaWindComponent, pathMatch: 'prefix',
  canActivate:[PermitidoConSesionActivaGuard] },

  { path: 'eliminarCuenta', component: DeleteAccStepsComponent, pathMatch: 'prefix' },
  
  { path: 'terminos', component: TermsComponent, pathMatch: 'prefix' },

  { path: '', redirectTo: '/login', pathMatch: 'prefix', },

  { path: '**', component: NotFoundComponent, pathMatch: 'prefix' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiciosWindComponent } from './servicios-wind/servicios-wind.component';
import { PersonalWindComponent } from './personal-wind/personal-wind.component';
import { RecursosWindComponent } from './recursos-wind/recursos-wind.component';
import { ReportesWindComponent } from './reportes-wind/reportes-wind.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeriaWindComponent } from './mensajeria-wind/mensajeria-wind.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecursosVehiculosComponent } from './recursos-wind/recursos-vehiculos/recursos-vehiculos.component';
import { RecursosCandadosComponent } from './recursos-wind/recursos-candados/recursos-candados.component';
import { RecursosCelularComponent } from './recursos-wind/recursos-celular/recursos-celular.component';
import { RecursosArmasComponent } from './recursos-wind/recursos-armas/recursos-armas.component';

import { PersonalRegistroComponent } from './personal-wind/personal-registro/personal-registro.component';
import { CrearGruposComponent } from './personal-wind/personal-registro/crear-grupos/crear-grupos.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ActualizarPerfilComponent } from './actualizar-perfil/actualizar-perfil.component';
import { AgregarvehiculoDialogComponent } from './recursos-wind/recursos-vehiculos/agregarvehiculo-dialog/agregarvehiculo-dialog.component';
import { EditVehiculosComponent } from './recursos-wind/recursos-vehiculos/edit-vehiculos/edit-vehiculos.component';
import { EditCandadosComponent } from './recursos-wind/recursos-candados/edit-candados/edit-candados.component';
import { AgregarcandadosDialogComponent } from './recursos-wind/recursos-candados/agregarcandados-dialog/agregarcandados-dialog.component';
import { AgregararmamentoDialogComponent } from './recursos-wind/recursos-armas/agregararmamento-dialog/agregararmamento-dialog.component';




import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModalMensajeriaComponent } from './components/modals/modal-mensajeria/modal-mensajeria.component';
import { ModalPerfilComponent } from './components/modals/modal-perfil/modal-perfil.component';
import { ModalNotificacionesComponent } from './components/modals/modal-notificaciones/modal-notificaciones.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ServicioCrearComponent } from './servicio-crear/servicio-crear.component';
import { ServicioEditarEliminarComponent } from './servicio-editar-eliminar/servicio-editar-eliminar.component';
import { TipoServicioComponent } from './servicios-wind/tipo-servicio/tipo-servicio/tipo-servicio.component';
import { ServicioPorAsignarComponent } from './servicios-wind/servicio-por-asignar/servicio-por-asignar/servicio-por-asignar.component';
import { ServicioEnCursoComponent } from './servicios-wind/servicio-en-curso/servicio-en-curso/servicio-en-curso.component';
import { PersonalActualizarComponent } from './personal-wind/personal-actualizar/personal-actualizar.component';
import { PersonalAdminRegistroComponent } from './personal-wind/personal-admin-registro/personal-admin-registro.component';

import { ServicioDetallesAsignacionComponent } from './servicio-detalles-asignacion/servicio-detalles-asignacion.component';
import { ErrorWindComponent } from './inicio-sesion/error-wind/error-wind.component';
import { TablaClientesComponent } from './personal-wind/tabla-clientes/tabla-clientes.component';
import { TablaPersonalComponent } from './personal-wind/tabla-personal/tabla-personal.component';
import { PerfilPersonalComponent } from './personal-wind/tabla-personal/perfil-personal/perfil-personal.component';
import { TablaCuentasTelefonoComponent } from './personal-wind/tabla-cuentas-telefono/tabla-cuentas-telefono.component';
import { PerfilAdminComponent } from './personal-wind/tabla-personal/perfil-admin/perfil-admin.component';
import { InfoClientesComponent } from './personal-wind/tabla-clientes/info-clientes/info-clientes.component';
import { InfoCuentaComponent } from './personal-wind/tabla-cuentas-telefono/info-cuenta/info-cuenta.component';
import { InfoArmasComponent } from './recursos-wind/recursos-armas/info-armas/info-armas.component';
import { InfoVehiculosComponent } from './recursos-wind/recursos-vehiculos/info-vehiculos/info-vehiculos.component';
import { InfoCandadosComponent } from './recursos-wind/recursos-candados/info-candados/info-candados.component';
import { InfoCelularComponent } from './recursos-wind/recursos-celular/info-celular/info-celular.component';
import { CrearClientesComponent } from './personal-wind/tabla-clientes/crear-clientes/crear-clientes.component';
import { CrearCuentaComponent } from './personal-wind/tabla-cuentas-telefono/crear-cuenta/crear-cuenta.component';
import { CrearCelularComponent } from './recursos-wind/recursos-celular/crear-celular/crear-celular.component';
import { EliminarUsuarioComponent } from './personal-wind/tabla-personal/eliminar-usuario/eliminar-usuario.component';
import { EliminarCuentaComponent } from './personal-wind/tabla-cuentas-telefono/eliminar-cuenta/eliminar-cuenta.component';
import { EliminarClientesComponent } from './personal-wind/tabla-clientes/eliminar-clientes/eliminar-clientes.component';
import { EliminarArmaComponent } from './recursos-wind/recursos-armas/eliminar-arma/eliminar-arma.component';
import { EliminarCandadoComponent } from './recursos-wind/recursos-candados/eliminar-candado/eliminar-candado.component';
import { EliminarCelularComponent } from './recursos-wind/recursos-celular/eliminar-celular/eliminar-celular.component';
import { EliminarVehiculoComponent } from './recursos-wind/recursos-vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';
import { EditCelularComponent } from './recursos-wind/recursos-celular/edit-celular/edit-celular.component';
import { EditArmasComponent } from './recursos-wind/recursos-armas/edit-armas/edit-armas.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServiciosWindComponent,
    PersonalWindComponent,
    RecursosWindComponent,
    ReportesWindComponent,
    MensajeriaWindComponent,
    RecursosVehiculosComponent,
    RecursosCandadosComponent,
    RecursosCelularComponent,
    RecursosArmasComponent,
    PersonalRegistroComponent,
    NotFoundComponent,
    InicioSesionComponent,
    RegistroComponent,
    HeaderComponent,
    PerfilComponent,
    ActualizarPerfilComponent,
    AgregarvehiculoDialogComponent,
    EditVehiculosComponent,
    EditCandadosComponent,
    AgregarcandadosDialogComponent,
    AgregararmamentoDialogComponent,
    ModalMensajeriaComponent,
    ModalPerfilComponent,
    ModalNotificacionesComponent,
    ServicioCrearComponent,
    ServicioEditarEliminarComponent,
    TipoServicioComponent,
    ServicioPorAsignarComponent,
    ServicioEnCursoComponent,
    PersonalActualizarComponent,
    PersonalAdminRegistroComponent,
    ServicioDetallesAsignacionComponent,
    ErrorWindComponent,
    CrearGruposComponent,
    TablaClientesComponent,
    TablaPersonalComponent,
    PerfilPersonalComponent,
    TablaCuentasTelefonoComponent,
    PerfilAdminComponent,
    InfoClientesComponent,
    InfoCuentaComponent,
    InfoArmasComponent,
    InfoVehiculosComponent,
    InfoCandadosComponent,
    InfoCelularComponent,
    CrearClientesComponent,
    CrearCuentaComponent,
    CrearCelularComponent,
    EliminarUsuarioComponent,
    EliminarCuentaComponent,
    EliminarClientesComponent,
    EliminarArmaComponent,
    EliminarCandadoComponent,
    EliminarCelularComponent,
    EliminarVehiculoComponent,
    EditCelularComponent,
    EditArmasComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    

  ],
  entryComponents: [AgregarvehiculoDialogComponent],
   
  providers: [   
/*    ClienteWAService, 
    AuthService, 
    AuthGuard, 
    GuardService, 
    CookieService, */
    {provide:LocationStrategy,useClass:HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

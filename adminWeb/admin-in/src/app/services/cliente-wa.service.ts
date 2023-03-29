import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { InicioSesionModel } from '../models/inicioSesion.model';
import { RegisterModel } from '../models/register.model';
import { SucursalModel } from '../models/sucursal.model';
import { Administrador_Obtener_Model } from '../models/admin_Obtener';
import { TiposServiciosModel } from '../models/tipoServicio.model';
import { ServiceModel } from '../models/servicio';
import { PersonalOpModel } from '../models/personalOp.models';
import { PedidoModel } from '../models/pedido.model';
import { VehiculoModel} from '../models/vehiculo.model';
import { ArmamentoModel } from '../models/armamento.model';
import { CandadoModel } from '../models/candado.model';
import { MobilModel } from '../models/mobil.model';
import { ClienteTablaModel } from '../models/cliente_tabla.model';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteWAService {
  HOST_DESARROLLO="http://127.0.0.1:8000/"
  HOST_PRODUCCION="https://seproamerica2022.pythonanywhere.com/"
  BASE_URL=this.HOST_PRODUCCION

  
  //"http://127.0.0.1:8000/api/usuarioRegistro";
  //"http://127.0.0.1:8000/api/usuarioInicioSesion";
  /*
  "https://seproamerica2022.pythonanywhere.com/api/usuarioRegistro";
  "https://seproamerica2022.pythonanywhere.com/api/usuarioInicioSesion";
   */
  /*Urls */
  DJANGO_SERVER: string = this.BASE_URL+"api/usuarioRegistro";
  DJANGO_SERVER_INICIO_SESION: string = this.BASE_URL+"api/usuarioInicioSesion";
  DJANGO_SERVER_REGISTRO_ADMIN: string = this.BASE_URL+"api/personalAdminRegistro";
  //DJANGO_SERVER_OBTENER_SUCURSALES: string = this.BASE_URL+"api/visualizarSucursales";
 
  DJANGO_SERVER_REGISTRO_PersonalOp: string = this.BASE_URL+"api/personalOperativoRegistro";
  DJANGO_SERVER_OBTENER_TIPOSSERVICIOS: string = this.BASE_URL+"api/visualizarTiposServicios";
  DJANGO_SERVER_CREAR_SERVICIO: string = this.BASE_URL+"api/crearServicio";
  DJANGO_SERVER_OBTENER_SERVICIOS: string = this.BASE_URL+"api/obtenerServicio";
  DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR: string = this.BASE_URL+"api/servicio_seleccionar_actualizar_eliminar";
  
  DJANGO_SERVER_ELIMINAR_PERSONALOP: string = this.BASE_URL+"api/eliminarPersonalOperativo";
  DJANGO_SERVER_OBTENER_PERSONALOP_ESPECIFICO: string = this.BASE_URL+"api/obtener_personalop_especifico";
  DJANGO_SERVER_ACTUALIZAR_PERSONALOP: string = this.BASE_URL+"api/actualizar_personalop";
  DJANGO_SERVER_OBTENER_PEDIDOS: string = this.BASE_URL+"api/solicitarServicio";
  DJANGO_SERVER_ACTUALIZAR_PEDIDO: string = this.BASE_URL+"api/actualizar_pedido_servicio";
  DJANGO_SERVER_OBTENER_ADMINISTRADOR_ESPECIFICO: string = this.BASE_URL+"api/obtenerAdministrador_especifico";
  DJANGO_SERVER_OBTENER_CLIENTE_TABLA_CLIENTE: string = this.BASE_URL+"api/obtener_cliente_tabla_cliente";
  DJANGO_SERVER_OBTENER_CLIENTE_TABLA_USUARIO: string = this.BASE_URL+"api/obtener_cliente_tabla_usuario";
  DJANGO_SERVER_OBTENER_MOBIL = ""

  //Nuevos endpoints

  //INICIO DE SESION
  DJANGO_SERVER_INICIO_SESION_ADMIN: string = this.BASE_URL + "users/adminSignin/";

  //ENDPOINTS DE LISTAS
  DJANGO_SERVER_OBTENER_PERSONAL_OP: string = this.BASE_URL + "users/operationalList/";
  DJANGO_SERVER_OBTENER_SUCURSALES: string  = this.BASE_URL + "users/branchList/"
  DJANGO_SERVER_OBTENER_GRUPOS: string = this.BASE_URL + "users/group/";
  DJANGO_SERVER_OBTENER_PERMISOS_USUARIO: string = this.BASE_URL + "users/getPermissions/";
  DJANGO_SERVER_TODO_PERSONAL: string = this.BASE_URL + "users/personal/";
  DJANGO_SERVER_OBTENER_CLIENTES: string = this.BASE_URL + "users/clientList/";
  DJANGO_SERVER_OBTENER_CUENTAS_TELEFONO: string = this.BASE_URL + "users/phoneAccountList/";
  DJANGO_SERVER_OBTENER_MOVIL: string = this.BASE_URL+"equipment/phoneList/";
  DJANGO_SERVER_OBTENER_ARMAMENTOS: string = this.BASE_URL+"equipment/weaponList/";
  DJANGO_SERVER_OBTENER_VEHICULOS: string = this.BASE_URL+"equipment/vehicleList/";
  DJANGO_SERVER_OBTENER_CANDADOS: string = this.BASE_URL+"equipment/lockList/";
  DJANGO_SERVER_OBTENER_PERSONALADM: string = this.BASE_URL+"users/adminList/";

//OBTENER POR ID
  DJANGO_SERVER_OBTENER_ADMINISTRADOR: string = this.BASE_URL+"users/adminStaff/?id=";
  DJANGO_SERVER_OBTENER_CLIENTE: string = this.BASE_URL + "users/adminClient/?id="
  DJANGO_SERVER_OBTENER_CUENTA_TELEFONO: string = this.BASE_URL + "users/phoneAccount/?id="
  DJANGO_SERVER_OBTENER_ARMA: string = this.BASE_URL + "equipment/weapon/?id="
  DJANGO_SERVER_OBTENER_VEHICULO: string = this.BASE_URL + "equipment/vehicle/?id="
  DJANGO_SERVER_OBTENER_CANDADO: string = this.BASE_URL + "equipment/lock/?id="
  DJANGO_SERVER_OBTENER_CELULAR: string = this.BASE_URL + "equipment/phone/?id="
  DJANGO_SERVER_OBTENER_PERSONAL_OP_INDIVIDUAL: string =  this.BASE_URL + "users/operationalStaff/?id=";
  
  
  //endpoint de crear
  DJANGO_SERVER_CREAR_CLIENTE_CELULAR: string =  this.BASE_URL + "users/phoneAccount/" 
  DJANGO_SERVER_CREAR_CELULAR: string = this.BASE_URL + "equipment/phone/"
  DJANGO_SERVER_CREAR_ARMA: string = this.BASE_URL + "equipment/weapon/"
  DJANGO_SERVER_CREAR_CANDADO: string = this.BASE_URL + "equipment/lock/"
  DJANGO_SERVER_CREAR_VEHICULO: string =  this.BASE_URL + "equipment/vehicle/";
  DJANGO_SERVER_CREAR_GRUPOS: string = this.BASE_URL + "users/group/";
  DJANGO_SERRVER_REGISTRAR_PERSONAL_OPERATIVO: string = this.BASE_URL + "users/operationalStaff/";
  DJANGO_SERVER_CREAR_PERSONAL_ADMINISTRADOR = this.BASE_URL + "users/adminStaff/"; 
  
 
  //endpoints de eliminar
  DJANGO_SERVER_ELIMINAR_PERSONAL: string = this.BASE_URL + "users/personal/?id=";
  DJANGO_SERVER_ELIMINAR_CLIENTE: string = this.BASE_URL + "users/adminClient/?id=";
  DJANGO_SERVER_ELIMINAR_EQUIPAMENTO: string = this.BASE_URL + "equipment/equipment/?id=";

  //endpoints editar
  DJANGO_SERVER_EDITAR_VEHICULO: string = this.BASE_URL + "equipment/vehicle/";
  DJANGO_SERVER_EDITAR_CANDADO: string = this.BASE_URL + "equipment/lock/";
  DJANGO_SERVER_EDITAR_CELULAR: string = this.BASE_URL + "equipment/phone/";
  DJANGO_SERVER_EDITAR_ARMA: string = this.BASE_URL + "equipment/weaponList/";





  constructor(private http: HttpClient) { }

  
  /*Basandome en la pagina https://www.bezkoder.com/angular-crud-app/ */
  create(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER, data)
  }

  registrar_administrador(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER_REGISTRO_ADMIN, data)
  }

  /*Basandome en  https://www.bezkoder.com/django-angular-crud-rest-framework/*/
  get(correoU: any): Observable<RegisterModel>{
    return this.http.get<RegisterModel>(`${this.DJANGO_SERVER_INICIO_SESION}/${correoU}`);
  }

  encontrarCorreo(correoU: any): Observable<RegisterModel>{
    return this.http.get<RegisterModel>(`${this.DJANGO_SERVER_INICIO_SESION}?correo=${correoU}`)
  }

  /*Basandome en  https://www.bezkoder.com/django-angular-mysql/*/
  update(correoU: any, data: any): Observable<any> {
    return this.http.put(`${this.DJANGO_SERVER_INICIO_SESION}/${correoU}/`, data);
  }

  //Request para obtener informacion de las sucursales 
  obtener_Sucursales(): Observable<SucursalModel[]>{
    return this.http.get<SucursalModel[]>(this.DJANGO_SERVER_OBTENER_SUCURSALES);
  }

  //Request para obtener un administrador a partir d su cédula
  obtener_Administrador(cedula_administrador: any): Observable<Administrador_Obtener_Model>{
    return this.http.get<Administrador_Obtener_Model>(`${this.DJANGO_SERVER_OBTENER_ADMINISTRADOR}/${cedula_administrador}`)
  }

  registrar_personalOp(data: any): Observable<any>{
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    }*/
    return this.http.post(this.DJANGO_SERVER_REGISTRO_PersonalOp, data/*, httpOptions*/)
  }

  //Request para obtener los tipos de servicios por tarifa
  obtener_Tipos_Servicios(): Observable<TiposServiciosModel[]>{
    return this.http.get<TiposServiciosModel[]>(this.DJANGO_SERVER_OBTENER_TIPOSSERVICIOS);
  }

  //Request para poder crear un servicio
  crear_Servicio(data: any): Observable<any>{
    return this.http.post(this.DJANGO_SERVER_CREAR_SERVICIO, data)
  }

  //Request para obtener lista de los servicios ya creados
  obtener_servicios_creados(): Observable<ServiceModel[]>{
    return this.http.get<ServiceModel[]>(this.DJANGO_SERVER_OBTENER_SERVICIOS);
  }

  //Request para actualizar servicio
  actualizar_servicio(servicio_nombre: any, data: any): Observable<any> {
    return this.http.put(`${this.DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR}/${servicio_nombre}/`, data);
  }

  //Request para eliminar servicio
  eliminar_servicio(servicio_nombre: any): Observable<any> {
    return this.http.delete(`${this.DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR}/${servicio_nombre}`)
  }

  //Request para obtener servicio especifico
  seleccionar_servicio(nombre_servicio_seleccionar: any): Observable<ServiceModel>{
    return this.http.get<ServiceModel>(`${this.DJANGO_SERVER_SELECCIONAR_ACTUALIZAR_ELIMINAR}/${nombre_servicio_seleccionar}`)
  }

  //Request para obtener todo el personal Operativo
  obtener_personalOp(): Observable<PersonalOpModel[]>{
    return this.http.get<PersonalOpModel[]>(this.DJANGO_SERVER_OBTENER_PERSONAL_OP);
  }

  //Request para eliminar un personal operativo
  eliminar_personaOp(cedula: any): Observable<any>{
    return this.http.delete(`${this.DJANGO_SERVER_ELIMINAR_PERSONALOP}/${cedula}`)
  }

  //Request para obtener un administrador a partir d su cédula
  obtener_personalOp_especifico(cedula_personalOp_especifico: any): Observable<PersonalOpModel>{
    return this.http.get<PersonalOpModel>(`${this.DJANGO_SERVER_OBTENER_PERSONALOP_ESPECIFICO}/${cedula_personalOp_especifico}`)
  }

  //Request para obtener administrador especifico
  obtener_admin_especifico(cedula_admin: any): Observable<Administrador_Obtener_Model>{
    return this.http.get<Administrador_Obtener_Model>(`${this.DJANGO_SERVER_OBTENER_ADMINISTRADOR_ESPECIFICO}/${cedula_admin}`)
  }

  //Request para actualizar informacion de personal operativo
  actualizar_personalOp(cedula_personal: any, data: any): Observable<any>{
    return this.http.put(`${this.DJANGO_SERVER_ACTUALIZAR_PERSONALOP}/${cedula_personal}/`, data);
  }

  //Request para obtener los pedidos de servicios
  obtener_Pedidos(): Observable<PedidoModel[]>{
    return this.http.get<PedidoModel[]>(this.DJANGO_SERVER_OBTENER_PEDIDOS);
  }

  //Request para obtener los vehiculos
  obtener_vehiculos(): Observable<VehiculoModel[]>{
    return this.http.get<VehiculoModel[]>(this.DJANGO_SERVER_OBTENER_VEHICULOS);
  }

  //Request para obtener candado
  obtener_candados(): Observable<CandadoModel[]>{
    return this.http.get<CandadoModel[]>(this.DJANGO_SERVER_OBTENER_CANDADOS);
  }

  //Request para obtener el armamento
  obtener_armamentos(): Observable<ArmamentoModel[]>{
    return this.http.get<ArmamentoModel[]>(this.DJANGO_SERVER_OBTENER_ARMAMENTOS);
  }

  //Request para obtener mobiles
  obtener_mobiles(): Observable<MobilModel[]>{
    return this.http.get<MobilModel[]>(this.DJANGO_SERVER_OBTENER_MOBIL)
  }

  //Request para actualizar pedido de servicio
  actualizar_pedido(id_pedido: any, data: any): Observable<any> {
    return this.http.put(`${this.DJANGO_SERVER_ACTUALIZAR_PEDIDO}/${id_pedido}/`, data);
  }

  //Request para obtener info de clientes de la tabla cliente
  obtener_cliente_tabla_cliente(id_cliente: any): Observable<ClienteTablaModel> {
    return this.http.get<ClienteTablaModel>(`${this.DJANGO_SERVER_OBTENER_CLIENTE_TABLA_CLIENTE}/${id_cliente}`)
  }

  //Request para obtener ususario/cliente de la tabla de usuario
  obtener_cliente_tabla_usuario(cedula_cliente: any): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.DJANGO_SERVER_OBTENER_CLIENTE_TABLA_USUARIO}/${cedula_cliente}`)
  }

}
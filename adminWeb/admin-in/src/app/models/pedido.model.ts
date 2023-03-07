import { Time } from "@angular/common";

export class PedidoModel {
    idPedido!: Number; 
    nombre_Servicio!: String | string | null;
    costo!: Number;
    fecha_Solicitud!: Date | string | String;
    fecha_Finalizacion!: Date;
    fecha_Inicio!: Date;
    hora_Inicio!: Time;
    hora_Finalizacion!: Time;
    latitud_Origen!: Number;
    longitud_Origen!: Number;
    latitud_Destino!: Number;
    longitud_Destino!: Number;
    cantidad_Empleados_Asignados!: Number;
    cantidad_vehiculos!: Number;
    detalle!: String;
    estado!: Number;
    metodo_Pago!: Number;
    idServicio!: Number;
    administrador_Encargado!: Number;
    cliente_solicitante!: Number;
}


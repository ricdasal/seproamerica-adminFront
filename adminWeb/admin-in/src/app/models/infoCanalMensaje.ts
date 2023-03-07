export class CanalInfoMensajes{
    canales!: Canal[]
} 
class Canal{
    canal!:string
    receptor!:string
    usuario_logeado!:string
    mensajes!: Mensajes[]
}


class Mensajes{
    id_canal!:string
    texto!:string
    usuario!:string
    tiempo!:string
    nombre_perfil!:string
    tiempo_envio!:string
    fecha_envio!:string
}
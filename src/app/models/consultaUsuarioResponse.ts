import { Servicio } from "./servicio";
import { Usuario } from "./usuario";

export class ConsultaUsuarioResponse {

    public usuario: Usuario
    public servicios: Servicio[] = []

    constructor(
        consultaUsuarioResponse: any
    ){
        this.usuario = consultaUsuarioResponse.usuario
        this.servicios = consultaUsuarioResponse.servicios
    }
}
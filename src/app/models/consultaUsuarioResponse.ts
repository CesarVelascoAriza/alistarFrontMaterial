import { Usuario } from "./usuario";

export class ConsultaUsuarioResponse {

    public usuario: Usuario

    constructor(
        consultaUsuarioResponse: any
    ){
        this.usuario = consultaUsuarioResponse.usuario
    }
}
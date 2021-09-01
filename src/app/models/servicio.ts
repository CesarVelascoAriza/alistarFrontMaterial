import { Categoria } from "./categoria";
import { Direccion } from "./direccion";
import { Proveedor } from "./proveedor";
import { Telefono } from "./telefono";
import { TipoDocumento } from "./tipoDocumento";
import { Usuario } from "./usuario";

export class Servicio {

    categoria: Categoria = new Categoria;
    direccion: string = '';
    nombreServicio: string = '';
    proveedor: Usuario = new Usuario;
    descripcionServicio:String ='';
    imagenServicio:String='';
    idServicio:number=0;
    precionUnidad: number = 0;
    valorTotal : number = 0;
    cantidad: number = 1;
}

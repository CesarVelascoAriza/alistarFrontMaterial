import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export class Servicio {

    categoria: Categoria = new Categoria;
    direccion: string = '';
    nombreServicio: string = '';
    proveedor: Usuario = new Usuario;
    descripcionServicio:string ='';
    imagenServicio:string='';
    idServicio:number=0;
    precionUnidad: number = 0;
    valorTotal : number = 0;
    cantidad: number = 1;
}

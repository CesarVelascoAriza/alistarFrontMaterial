import { Telefono } from "./telefono";
import { TipoDocumento } from "./tipoDocumento";

export class Usuario {
  numeroIdentificacion: number = 0;
  direccion: string = '';
  fechaNacimiento: string = '';
  nombre: string = '';
  password: string = '';
  tipoDocumento: TipoDocumento = new TipoDocumento();
  telefono: Telefono = new Telefono();
  email: string = '';

}

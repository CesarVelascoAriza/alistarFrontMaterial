import { TipoDocumento } from "./tipoDocumento";

export class Usuario {
  numeroIdentificacion: number = 0;
  direccion: string = '';
  fechaNacimiento: string = '';
  nombre: string = '';
  password: string = '';
  tipoDocumento: TipoDocumento = new TipoDocumento();
  telefono: string = "";
  email: string = '';
  imagen: string = '';
}

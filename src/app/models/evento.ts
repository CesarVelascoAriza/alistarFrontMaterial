import { Estado } from "./estado";
import { Horario } from "./horario";
import { Orden } from "./orden";

export class Evento {
  idEvento: number = 0;
  nombreEvento:String='';
  valorTotal : number = 0.0;
  usuario: number = 0;
  horario: Horario = new Horario();
  estado: Estado = new Estado();
  ordenes:Array<Orden> = new Array<Orden>()
}
 
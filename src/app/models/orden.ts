import { Estado } from './estado';
import { EventoOrden } from './eventoPostOrden';
import { Horario } from './horario';

export class Orden {
  nombreEvento:String='';
  usuario: number = 0;
  idOrden: number = 0;
  horario: Horario = new Horario();
  estado: Estado = new Estado();
  precioTotal: number = 0.0;
  cantidad:number =0;
  evento:Array<EventoOrden> = new Array<EventoOrden>()
}

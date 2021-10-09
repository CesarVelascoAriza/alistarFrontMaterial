import { Estado } from './estado';
import { Evento } from './evento';
import { Horario } from './horario';

export class Orden {
  nombreEvento:String='';
  usuario: number = 0;
  idOrden: number = 0;
  horario: Horario = new Horario();
  estado: Estado = new Estado();
  precioTotal: number = 0.0;
  evento:Array<Evento> = new Array<Evento>()
}

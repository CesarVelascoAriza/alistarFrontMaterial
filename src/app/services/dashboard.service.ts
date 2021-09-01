import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  pieChart() {
    return  [{
        name: 'Matrimonios',
        y: 15.60,
        sliced: true,
        selected: true
    }, {
        name: 'Cumpleaños',
        y: 11.84
    }, {
        name: 'Conciertos',
        y: 10.85
    }, {
        name: 'Despedidas',
        y: 54.67
    }, {
        name: 'Charlas',
        y: 4.18
    }, {
        name: 'Buffet',
        y: 11.64
    }, {
        name: 'Piñatas',
        y: 10.6
    }, {
        name: 'Quice años',
        y: 21.2
    }, {
        name: 'Other',
        y: 2.61
    }]
  }

  serviciosSolicitados() {
      return ['Piñatas', 'Quince Años', 'Conferencias'];
  }

  proximosEventos() {
    return ['Matrimonios', 'Quince Años', 'Conferencias'];
}
}

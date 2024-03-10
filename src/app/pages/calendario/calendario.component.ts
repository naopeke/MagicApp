import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ]
})
export class CalendarioComponent {

  eventDate: Date = new Date();
  events = [
    {fecha: '2 de enero 2024',
  event:[
    {titulo: 'Superpartida', lugar_hora: 'Madrid 18h', descripcion: 'Partida entre señoras'},
    {titulo: 'Superpartida2', lugar_hora: 'Palma de Mallorca 19h', descripcion: 'Iniciación al juego'},
    {titulo: 'Superpartida3', lugar_hora: 'Elche 20h', descripcion: 'Invitación a nuevos jugadores'},
  ]}
  ]
  // elegir dia de hoy
  selectedDate: Date = new Date();

  constructor() {}

  // para header de calendario se puede modificar
  getCurrentMonth(): string {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentMonth = monthNames[this.selectedDate.getMonth()];
    const currentYear = this.selectedDate.getFullYear();
    return currentMonth + ' ' + currentYear;
  }

  // cuando pulsa previous (anterior)
  previousClicked(): void {
    // cambia el dia como el del mes anterior
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
  }

  // cuando pulsa next (siguiente) 
  nextClicked(): void {
    // cambia el dia del mes que viene
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
  }

  // si se cambia la fecha....
  onDateChange(event: any) {
    console.log('Selected Date: ', event);
  }

  
}



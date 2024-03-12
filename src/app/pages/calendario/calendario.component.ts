import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

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
  dates = [
    {fecha: '2 de enero 2024',
  events:[
    {titulo: 'Superpartida', lugar_hora: 'Madrid 18h', descripcion: 'Partida entre señoras'},
    {titulo: 'Superpartida2', lugar_hora: 'Palma de Mallorca 19h', descripcion: 'Iniciación al juego'},
    {titulo: 'Superpartida3', lugar_hora: 'Elche 20h', descripcion: 'Invitación a nuevos jugadores'},
  ]},
  {fecha: '5 de marzo 2024',
  events:[
    {titulo: 'Superpartidita', lugar_hora: 'Madrid 18h', descripcion: 'Partida entre señoras'},
    {titulo: 'Superpartidita2', lugar_hora: 'Palma de Mallorca 19h', descripcion: 'Iniciación al juego'},
    {titulo: 'Superpartidita3', lugar_hora: 'Elche 20h', descripcion: 'Invitación a nuevos jugadores'},
  ]}
  ]

  //variables para padre-hijo:

  public child_edit:boolean = false;
  public child_delete: boolean = false; 

  // elegir dia de hoy
  selectedDate: Date = new Date();

  constructor(date: DateAdapter<Date>, private router: Router) {
    date.getFirstDayOfWeek = () =>1;
  }

  //para que salgan componentes editar y borrar:

  public show_child_edit(){
    this.child_edit = true; 

  }

  public show_child_delete(){
    this.child_delete=true; 
  }

  // para header de calendario se puede modificar
  getCurrentMonth(): string {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentMonth = monthNames[this.selectedDate.getMonth()];
    const currentYear = this.selectedDate.getFullYear();
    return currentMonth + ' ' + currentYear;
  }

  // cuando pulsa previous (anterior)
  previousClicked(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
  }

  // cuando pulsa next (siguiente) 
  nextClicked(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
  }

  // si se cambia la fecha....
  onDateChange(event: any) {
    console.log('Selected Date: ', event);
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = this.dates.find(eventDate => {
      const eventDateObj = new Date(eventDate.fecha);
      return eventDateObj.getFullYear() === date.getFullYear() &&
        eventDateObj.getMonth() === date.getMonth() &&
        eventDateObj.getDate() === date.getDate();
    });
  
    return highlightDate ? 'highlight-event' : '';
  }
}



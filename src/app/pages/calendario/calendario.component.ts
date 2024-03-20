import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { Evento } from 'src/app/models/evento';

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

  public modalDetailEvent:boolean = false
  // en la clase evento falta direccion por eso no sale en el modal, la he puesto como opcional, 
  // pero está puesto nameUser, no he querido tocar para no fastidiar los datos de Carlota
  public evento: Evento = new Evento(1, 'Superpartida', 'Partida entre señoras', new Date(2024, 3, 12), '18:00', 'Madrid')
  
  
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
  // elegir dia de hoy
  selectedDate: Date = new Date();

  constructor(date: DateAdapter<Date>) {
    date.getFirstDayOfWeek = () =>1;
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

  
  openModalDetailEvent(){
    this.modalDetailEvent = true;
  }

  closeModal(event: boolean){
    this.modalDetailEvent = event; 
  }
}



import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { EventosService } from 'src/app/shared/eventos.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/respuesta';
import { Eventos } from 'src/app/models/eventos';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ]
})
export class CalendarioComponent implements OnInit {

  public modalSaberMas:boolean = false;
  public user: User = {}; 
  public eventos: Eventos[]=[]; 
  public eventsLoaded: boolean = false;
  public eventosDia: Eventos[]=[]; 
  public evento: Eventos;
  public currentUser: User | null;
  public modalType: number | null;
  public sinEventos: boolean = false; 
  public show_addEvent: boolean = false; 
  public bg_dark: boolean = false; 

  // elegir dia de hoy
  selectedDate: Date = new Date();

  constructor(date: DateAdapter<Date>, 
              public usersService: UsersService,
              public eventsService: EventosService,
              private toastr: ToastrService) {
    date.getFirstDayOfWeek = () =>1;

  }

  ngOnInit(): void {
    this.usersService.currentUserChanges()
    .subscribe(user =>{
      if (user){
        const id_user:number = this.usersService.getCurrentUserId();
        this.getEvents(); 
        this.getEventsDate(new Date());
        
      }
    })
  }


  //cuando seleccionas un dia del mes, sale la info de los eventos del dia y del user logeado.
  public getEvents(){
    let id_user: number = this.usersService.getCurrentUserId();
    if(id_user) {
      this.eventsService.getMyEventsCalendar(id_user)
      .subscribe((resp: Response)=> {
        if(!resp.err){
          this.eventos = resp.data; 
          this.eventsLoaded = true;
          // this.toastr.success('Se han encontrado eventos', "",
          //                   {timeOut:2000, positionClass: "toast-top-center"});
        }else{
          // this.toastr.error('Evento no encontrado', "", 
          //           {timeOut: 2000, positionClass: 'toast-top-center'});
        } 
      });
    } 
  }

  public getEventsDate(date: Date){
    let id_user: number = this.usersService.getCurrentUserId();
    if(id_user) {
      this.eventsService.getMyEventsCalendarDate(id_user, this.formatDate(date))
      .subscribe((resp: Response)=> {
        if(!resp.err){
          this.eventosDia = resp.data; 
          console.log(resp.data, this.formatDate(date));
          this.sinEventos = resp.data ? false : true;
        }
      });
    } 
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
  onDateChange(event: Date) {
    this.selectedDate = new Date(this.formatDate(event));
    this.getEventsDate(this.selectedDate); 
    console.log('Selected Date: ', this.selectedDate);
  }
  // Más info: https://material.angular.io/components/datepicker/overview#highlighting-specific-dates
  // https://material.angular.io/components/datepicker/api#MatCalendarCellClassFunction
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {  
  
      if (view === 'month') {
        let date = cellDate.getDate();
        const month = cellDate.getMonth();
        const year = cellDate.getFullYear();
        
        const eventosDelMes = this.eventos.filter(evento => {
          const eventoDate = new Date(evento.date);
          return eventoDate.getMonth() === month && eventoDate.getFullYear() === year;
        });

        let dateEvent = eventosDelMes.map(evento => new Date(evento.date).getDate())
        // Esto es lo que os digo, preguntaré a Jose o investigaré más cuando hayamos acabado con todo:
        return date === dateEvent[0] || date === dateEvent[1] 
        || date === dateEvent[2] || date === dateEvent[3]
        || date === dateEvent[4] || date === dateEvent[5]
        || date === dateEvent[6] || date === dateEvent[7]
        || date === dateEvent[8] || date === dateEvent[9]
        || date === dateEvent[10] || date === dateEvent[11]
        || date === dateEvent[12] || date === dateEvent[13]
        || date === dateEvent[14] || date === dateEvent[15]
        || date === dateEvent[16] || date === dateEvent[17]
        || date === dateEvent[18] || date === dateEvent[20]
        || date === dateEvent[21] || date === dateEvent[22]
        || date === dateEvent[23] || date === dateEvent[24]
        || date === dateEvent[25] || date === dateEvent[26]
        || date === dateEvent[27] || date === dateEvent[28]
        || date === dateEvent[29] || date === dateEvent[30]
        || date === dateEvent[31]? 'highlight-event' : '';
      }
  };

  //   dateClass = (date: Date): MatCalendarCellCssClasses => {
  //   const highlightDate = this.eventos.find(evento => {
  //     const eventDate = new Date(evento.date);
  //     return eventDate.getFullYear() === date.getFullYear() &&
  //       eventDate.getMonth() === date.getMonth() &&
  //       eventDate.getDate() === date.getDate();
  //   });
  //   return highlightDate ? 'highlight-event' : '';
  // }


  // dateClass = (date: Date): MatCalendarCellCssClasses => {
  //   const highlightDate = this.dates.find(eventDate => {
  //     const eventDateObj = new Date(eventDate.fecha);
  //     return eventDateObj.getFullYear() === date.getFullYear() &&
  //       eventDateObj.getMonth() === date.getMonth() &&
  //       eventDateObj.getDate() === date.getDate();
  //   });
  //   return highlightDate ? 'highlight-event' : '';
  // }


  getAllDatesInMonth(year: number, month: number): Date[] {
    const numDays = new Date(year, month + 1, 0).getDate(); 
    const dates: Date[] = [];
    for (let i = 1; i <= numDays; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  }

  openModalDetailEvent(evento: Eventos){
    this.evento = evento;
    evento.creator ? this.modalType = 0 : this.modalType = 1;
    this.modalSaberMas = true;
    this.bg_dark = true; 
  }

  closeModal(event: boolean){
    this.modalSaberMas = false;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2); 
  
    return `${year}-${month}-${day}`;
}

public addEvent(){
  this.show_addEvent = true;
  this.bg_dark = true; 

}

public addEventClose(){
  this.show_addEvent = false; 
  this.bg_dark = false; 
}


}



import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/shared/users.service';
import { EventosService } from 'src/app/shared/eventos.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/respuesta';

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
  public eventos: Evento[]=[]; 
  public evento: Evento; 
  public currentUser: User | null;

  // elegir dia de hoy
  selectedDate: Date = new Date();

  constructor(date: DateAdapter<Date>, 
              public usersService: UsersService,
              public eventsService: EventosService,
              private toastr: ToastrService,) {
    date.getFirstDayOfWeek = () =>1;
  }


  //cuando seleccionas un dia del mes, sale la info de los eventos del dia y del user logeado.
  public getEvents(date: Date){
    let id_user: number = this.usersService.getCurrentUserId();
    if(id_user) {
      this.eventsService.getMyEventsCalendar(id_user, date)
      .subscribe((resp: Response)=> {
        console.log(resp.data);
        if(!resp.err){
          this.eventos = resp.data.filter((evento: any)=> {
            return new Date(evento.date).toDateString() === date.toDateString();
          }); 
          console.log(resp.data, date);
          this.toastr.success('Se han encontrado eventos', "",
                            {timeOut:2000, positionClass: "toast-top-center"});
        }else{
          this.toastr.error('Evento no encontrado', "", 
                    {timeOut: 2000, positionClass: 'toast-top-center'});
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
  onDateChange(event: any) {
    this.selectedDate = event; 
    this.getEvents(this.selectedDate); 
    console.log('Selected Date: ', event);
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = this.eventos.find(evento => {
      const eventDate = new Date(evento.date);
      return eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate();
    });
    return highlightDate ? 'highlight-event' : '';
  }


  // dateClass = (date: Date): MatCalendarCellCssClasses => {
  //   const highlightDate = this.dates.find(eventDate => {
  //     const eventDateObj = new Date(eventDate.fecha);
  //     return eventDateObj.getFullYear() === date.getFullYear() &&
  //       eventDateObj.getMonth() === date.getMonth() &&
  //       eventDateObj.getDate() === date.getDate();
  //   });
  //   return highlightDate ? 'highlight-event' : '';
  // }

  
  openModalDetailEvent(){
    // this.modalDetailEvent = true;
    this.modalSaberMas = true;
  }

  closeModal(event: boolean){
    this.modalSaberMas = false;
  }

  ngOnInit(): void {
      this.usersService.currentUserChanges()
      .subscribe(user =>{
        if (user){
          const id_user:number = this.usersService.getCurrentUserId();
          console.log(id_user); 
          this.getEvents(new Date()); 
        }
      })
  }
}



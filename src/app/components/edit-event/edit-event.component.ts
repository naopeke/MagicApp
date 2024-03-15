import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/models/evento';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() evento: Evento
  @Output() eventClose = new EventEmitter <Boolean>()
 
  public editEvent: FormGroup
  public editar: boolean = false
    
  constructor(private formBuilder: FormBuilder){}
    
  ngOnInit(): void {
      this.buildForm();
      this.editEvent.disable();
      
  }

  private buildForm(){
    this.editEvent = this.formBuilder.group({
      title: [this.evento.title, [Validators.required, Validators.maxLength(40)]],
      date: [this.evento.date.toISOString().substring(0, 10), Validators.required],
      time: [this.evento.hour, Validators.required],
      place: [this.evento.place, Validators.required],
      direction:[this.evento.direction, Validators.required],
      description: [this.evento.description]
    })
  }

  edit(){
    if(this.editar == false){
      this.editar = true; 
      this.editEvent.enable();

    } else {

      this.editar = false;
      this.editEvent.markAsUntouched()
      this.editEvent.disable();

    if(!this.editEvent.invalid){
      let editValues = this.editEvent.value
      this.evento.title = editValues.title
      this.evento.date = editValues.date
      this.evento.hour = editValues.time
      this.evento.place = editValues.place
      this.evento.direction = editValues.direction
      this.evento.description = editValues.description
      
      console.log(this.evento);
      }
    }



  }

  close(){
    this.eventClose.emit(false)
  }
}
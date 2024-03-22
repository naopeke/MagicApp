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
      date: [this.evento.date, Validators.required],
      time: [this.evento.hour, Validators.required],
      place: [this.evento.place, Validators.required],
      direction:[this.evento.direction, Validators.required],
      description: [this.evento.description, Validators.maxLength(100)]
    })
  }

  edit(){
    this.editEvent.markAsUntouched();
    if(!this.editar){
      this.editar = true; 
      this.editEvent.enable();
    }
  }

  saveEdit(){
    this.editEvent.markAsUntouched();
    if(!this.editEvent.invalid){
      this.evento = this.editEvent.value
      this.editar = false;
      this.editEvent.disable();
      }
  }
 
  close(){
    this.eventClose.emit(false)
  }
}
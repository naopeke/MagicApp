import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public editarFoto = false
  public editForm: FormGroup
  public editar: boolean = false
  public modal: boolean = false
  
  // *NOTE - CREAR CLASE USER
  public user: any


  constructor(private formBuilder: FormBuilder){

    this.user = {
      name: 'Elara Moonshadow',
      email: 'elaramoonshadow@gmail.com',
      password: '123456789',
      description: 'Con armadura reluciente y mirada decidida, Juana lidera con valentía y  determinación. Su espíritu protector y su coraje infunden esperanza en  los corazones de aquellos que la rodean.',
      photo: "../../../assets/images/personajes/avatar2.png",
      marco: "../../../assets/images/profile/cartaAmarilla.png"
    }

    this.buildForm();
  }

  ngOnInit(): void {
    this.editForm.disable();
  }
  
  

  // MODIFICAR DATOS PERFIL
  private buildForm(){
    const minPassLength = 8

    this.editForm = this.formBuilder.group({
      name: [this.user.name],
      email: [this.user.email, Validators.email],
      description: [this.user.description, Validators.maxLength(160)],
      password: [this.user.password, Validators.minLength(minPassLength)],
      password2: [this.user.password, this.check]
    })
  }
  
  private check(control:AbstractControl){
    let resultado = {noMatch: true}
      if(control.parent?.value.password == control.value){
        resultado = null
      } else {
        console.log('Contraseñas no coinciden');
      }
    return resultado
  }

  public edit(name:string, email: string, password: string, description: string){
    if (this.editar == false){
      this.editar = true;
      this.editForm.enable();
    
    } else {
        this.user = {
          name: name, 
          email: email, 
          password: password, 
          description: description,
          photo: this.user.photo,
          marco: this.user.marco
        }
        this.editar = false
        this.editForm.disable();
    }
  }

  // MODIFICAR FOTO Y MARCO 

public editPhoto(){
  if(!this.editarFoto){
    this.editarFoto = true
    this.modal = true
  } else {
    this.editarFoto = false
    this.modal = false
  }
  
}

}


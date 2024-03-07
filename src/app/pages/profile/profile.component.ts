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

  public tierras: string[] = [
    '../../../assets/images/profile/llanura.png',
    '../../../assets/images/profile/isla.png', 
    '../../../assets/images/profile/pantano.png', 
    '../../../assets/images/profile/montaña.png',
    '../../../assets/images/profile/bosque.png'
  ]

  public marcos: string[] = [
    '../../../assets/images/profile/cartaAmarilla.png',
    '../../../assets/images/profile/cardAzul.png',
    '../../../assets/images/profile/cardMorada.png',
    '../../../assets/images/profile/cardRoja.png',
    '../../../assets/images/profile/cardVerde.png',
  ]
  
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

  public seleccionAvatar(avatar:string){
    this.user.photo = avatar
  }
  
  public seleccionTierra(tierra:string){
    // if(tierra == this.tierras[0]){
    //   this.user.marco = this.marcos[0]
    // } else if (tierra == this.tierras[1]){
    //   this.user.marco = this.marcos[1]
    // } else if (tierra == this.tierras[2]){
    //   this.user.marco = this.marcos[2]
    // } else if (tierra == this.tierras[3]){
    //   this.user.marco = this.marcos[3]
    // } else if (tierra == this.tierras[4]){
    //   this.user.marco = this.marcos[4]
    // }

    this.user.marco = 
      tierra === this.tierras[0] ? this.marcos[0] :
      tierra === this.tierras[1] ? this.marcos[1] :
      tierra === this.tierras[2] ? this.marcos[2] :
      tierra === this.tierras[3] ? this.marcos[3] :
      tierra === this.tierras[4] ? this.marcos[4] :
      console.log('Error');
      

  
}
}


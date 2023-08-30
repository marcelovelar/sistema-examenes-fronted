import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  
  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }

    constructor(private userService:UserService){}
  
  ngOnInit(){
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      alert('El nombre de usuario es requerido')
      return;
    }

    this.userService.anadirUsuario(this.user).subscribe(
      (data) => { 
        console.log(data);
        alert('Usuario creado con éxito');
      },(error) => {
        console.log(error);
        alert('Ocurrió un error al crear el usuario');
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



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

    constructor(private userService:UserService, private snack:MatSnackBar){}
  
  ngOnInit(){
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }

    this.userService.anadirUsuario(this.user).subscribe(
      (data) => { 
        console.log(data);
        Swal.fire('Usuario creado !!','El usuario ha sido creado correctamente','success'       )
        //limpiar los campos
        this.user.username = '';
        this.user.password = '';
        this.user.nombre = '';
        this.user.apellido = '';
        this.user.email = '';
        this.user.telefono = '';

      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right'
        });
      }
    )
  }
}

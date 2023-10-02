import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": ''
  }
  constructor(private snack: MatSnackBar, private loginService: LoginService,private router:Router) {
  }

  ngOnInit(): void {

  }
  formSubmit() {
    //console.log('Click en el boton de login');
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required loco !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required loco !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);
          //redireccionar a la pagina de inicio
          //window.location.href='/';

          if (this.loginService.getUserRole() == 'ADMIN') {
            //window.location.href='/admin';
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if (this.loginService.getUserRole() == 'NORMAL') {
            //window.location.href='/user';
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);  
            this.loginService.loginStatusSubjec.next(true);
          }
          else {
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        this.snack.open('Invalid detailles, Try again !!', 'Aceptar', {
          duration: 3000,
        })
      })
  }
}
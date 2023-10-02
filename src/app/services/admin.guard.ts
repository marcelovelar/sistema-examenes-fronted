import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN'){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}

//EN STACKOVERFLOW ENCONTRÉ ESTA OPCIÓN PARA EL GUARD
//^ @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard {

//   constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }
//   canActivate():
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (!this.authService.isLoggedIn()) {
//       this.toastr.info('Please Log In!');
//       this.router.navigate(['/auth']);
//       return false;
//     }
//     // logged in, so return true
//     this.authService.isLoggedIn();
//     return true;
//   }
// }
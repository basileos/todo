import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpService, LoginResponse } from './services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {}

  logout() {
    this.httpService.logout().subscribe((res: LoginResponse) => {
      this.authService.setUser(res);
      this.router.navigateByUrl('/login');
    }, err => {
      console.warn(err);
    });
  }

  get userName() {
    return this.authService.getUserName();
  }

  get isAuthorized() {
    return this.authService.isAuthorized();
  }
}

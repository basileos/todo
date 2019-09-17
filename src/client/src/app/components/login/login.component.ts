import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService, LoginResponse } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return;
    }
    this.httpService.login(this.loginForm.value).subscribe((res: LoginResponse) => {
      this.authService.setUser(res);
      this.router.navigateByUrl('');
    }, err => {
      console.warn(err);
    });
  }

  get form() {
    return this.loginForm;
  }

}

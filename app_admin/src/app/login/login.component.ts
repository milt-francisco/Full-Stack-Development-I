import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  submitted = false;
  credentials = {
    email: '',
    password: '',
  };
  isLoading = false;
  isUnauthorized = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields required, please try again';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.isLoading = true;
    let newUser = {
      email: this.credentials.email,
    } as User;

    // console.log('LoginComponent::doLogin');
    // console.log(this.credentials);

    this.authenticationService.login(newUser, this.credentials.password);

    if (this.authenticationService.isLoggedIn()) {
      // console.log('Router::Direct');
      this.router.navigate(['']);
    } else {

      var timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          // console.log('Router::Pause');
          this.router.navigate(['']);
        } else {
          this.isUnauthorized = true;
        }
        this.isLoading = false;
      }, 3000);
    }
  }
}

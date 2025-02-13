import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public formError: string = '';
  submitted = false;
  credentials = {
    name: '',
    email: '',
    password: '',
  };
  isAdmin = true;
  newAdminAdded = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onRegisterSubmit(): void {
    this.formError = '';
    if (
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields required, please try again';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email,
    } as User;

    // console.log('LoginComponent::doLogin');
    // console.log(this.credentials);

    if (this.authenticationService.isLoggedIn()) {
      // console.log('Router::Direct');
      this.authenticationService.register(newUser, this.credentials.password);
      this.newAdminAdded = true;

      var timer = setTimeout(() => {
        // console.log('Router::Pause');
        this.router.navigate(['']);
      }, 3000);
    } else {
      this.isAdmin = false;
    }
  }
}

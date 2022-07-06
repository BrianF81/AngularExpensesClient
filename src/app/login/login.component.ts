import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: AuthService, private router: Router) { }

  loginData = {
    Username: '',
    Password: '',
    ID: 0
  }

  errorMessage = '';

  login() {
    
    this.service.login(this.loginData).subscribe((data: any) => {
      console.log('the data:', data);
      localStorage.setItem('userName', data.UserName);
      localStorage.setItem('token_value', data.token);
      this.errorMessage = '';
      this.router.navigate(['/entries']);
    },
    /*(error) => console.log(error.error.Message));*/
      (error) => this.errorMessage = error.error.Message);
    
  }

}

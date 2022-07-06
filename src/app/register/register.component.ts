import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private fb: FormBuilder, private service: AuthService) { }
  
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, { validator: this.matchingFields('password', 'confirmPassword') })

  onSubmit() {
    delete this.registerForm.value.confirmPassword;
    this.service.register(this.registerForm.value).subscribe((data: any) => { console.log(data); localStorage.setItem('userName', data.UserName); localStorage.setItem('token_value', data.Token); });
    //console.log(this.registerForm.value);
    
  }

  matchingFields(field1: any, field2: any) {
  return (form: { controls: { [x: string]: { value: any; }; }; }) => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { matchingFields: true }
    }
    else { return false; }
  }
}

}



import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup:any = FormGroup;
  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  loginProcess(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value);
      this.authService.login(this.formGroup.value).subscribe(response =>{
        if(response.success){
          localStorage.setItem("token",response.token);
          localStorage.setItem("userid",response.data.id);
          this.router.navigate(['']);
        }else{
          alert("Invalid username or password!");
        }
      });
    }
  }

}

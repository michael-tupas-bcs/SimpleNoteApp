import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

  hide = true;

  registerProcess(){
    if(this.formGroup.valid){
      this.authService.register(this.formGroup.value).subscribe(result =>{
        if(result.success){
          alert(result.message);
          this.router.navigate(['login']);
        }else{
          if(result.message.search(/ER_DUP_ENTRY/gi) == -1){
            alert(result.message);
          }else{
            alert("User name already exists");
          }
        }
      });
    }
  }

}

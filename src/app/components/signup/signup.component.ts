import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { singupModel } from 'src/app/model/singupModel';
import { HttpClientService } from 'src/app/services/http-client.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm!: FormGroup;
  type: string = 'passwordHash';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  successMessage:string =""

  regForm: FormGroup = new FormGroup({
    userName : new FormControl(),
    email : new FormControl(),
    passwordHash : new FormControl(),
  });

  constructor(private fb: FormBuilder, private readonly httpService:HttpClientService) { }

  postUser:singupModel | undefined;

  ngOnInit() {
    this.signUpForm = this.fb.group({
      userName:['', Validators.required],
      email:['', Validators.required],
      passwordHash:['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'passwordHash'
  }

  onSubmit() {
   
}
newUsers(){

  //console.log("form", this.regForm)
  this.httpService.Post(environment.apiUrl+"user",this.regForm.value).subscribe((res: any)=>{
      this.postUser=res.data as singupModel;
      console.log(res)
  },(err: any)=>{
      console.log(err);
  })
}
}
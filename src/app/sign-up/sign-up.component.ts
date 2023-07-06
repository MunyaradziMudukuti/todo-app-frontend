import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {SignUpRequest} from "../shared/models/user/sign.up.request";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    signUpForm!: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private userService: UserService,private toastrService:ToastrService) {
        //this.createForm();
    }

    createForm() {
        this.signUpForm = this.fb.group(
            {
                email: [null, Validators.required],
                password: [null, Validators.required],
                confirmPassword: [null, Validators.required],
            }
        )
    }

    ngOnInit(): void {
        this.createForm()
    }

    loginClicked(): void {
        this.router.navigate(['/'])
    }

    signUp() {
        const signUpRequest: SignUpRequest = this.signUpForm.getRawValue();
        console.log("############# Sign Up Request: ", signUpRequest)
        this.userService.signup(signUpRequest)
            .subscribe(
                {
                    error: err => {
                        console.log("############## error message: ",err.error.message)
                        this.toastrService.error(err.error.message)
                    }
                }
            );
    }
}

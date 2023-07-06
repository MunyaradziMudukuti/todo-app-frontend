import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup

    public constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.createForm()
    }

    createForm() {
        this.loginForm = this.fb.group(
            {
                username: [null, Validators.required],
                password: [null, Validators.required]
            }
        )
    }

    goToSignup() {
        this.router.navigate(['/signup']);
    }

    login() {
        const loginRequest = this.loginForm.getRawValue()
        this.authService.login(loginRequest);
    }
}

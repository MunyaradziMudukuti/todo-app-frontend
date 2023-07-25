import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, isAuthenticated} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  public constructor(private router: Router, private authService: AuthService,private jwtService: JwtService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.jwtService.destroyToken();
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

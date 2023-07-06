import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/models/user/user";
import {apiUrl} from "../shared/models/contants/constants";
import {SignUpRequest} from "../shared/models/user/sign.up.request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = apiUrl + '/v1/users'
  constructor(private httpClient: HttpClient) { }

  signup(signUpRequest: SignUpRequest):Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + '/sign-up',signUpRequest)
  }

}

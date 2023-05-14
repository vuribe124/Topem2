import { Injectable } from '@angular/core';
import { baseAPIUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  loginRequest (email,password){
    const parameters = {
      email,
      password
    }
    return this.http.post(
      `${baseAPIUrl}api/login`,
      parameters
    );
  }

  sendEmail(parameters){
    return this.http.post(
      `${baseAPIUrl}/api/reset_password_email`,
      parameters
    );
  }

  validarTokenUser(parameters){
    return this.http.post(
      `${baseAPIUrl}/api/reset_password_email`,
      parameters
    );
  }

  resetPassword(parameters){
    return this.http.post(
      `${baseAPIUrl}/api/reset_password_email`,
      parameters
    );
  }
}

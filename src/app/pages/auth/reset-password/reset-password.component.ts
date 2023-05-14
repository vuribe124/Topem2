import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
// import { SettingsService } from '../../../services/settings.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  user: FormGroup;
  submitted:boolean = false
  rememberMe:boolean = false

  showMessages: any = {};
  strategy: string = '';
  passwordStrength: number = 0;
  loginButton: boolean = false;

  constructor(
    protected authService: AuthService,
    protected cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = new FormGroup({
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(null, []),
    });
  }

  ngOnInit() {
    this.tokenValidar();
  }


  tokenValidar() {
    const parameter ={
      token:  this.route.snapshot.params['_token']
    }

    this.authService.validarTokenUser(parameter)
    .subscribe((response:any)=>{
      if (response.msg == 1) {
        this.loginButton = true;
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          text: response.response,
          footer: '<a href="auth/login">Go To Login</a>',
        })
        this.loginButton = false;
      }
    },
    err => {
      console.log('HTTP Error', err)
      Swal.fire(
        'Error!',
        err.status+" "+err.statusText,
        'error'
      )
    });
  }

  login(){
    if (this.user.valid) {
      if (this.password?.value === this.passwordConfirm?.value) {
        const paramet = {
          token: this.route.snapshot.params['_token'],
          password: this.user.value.password
        }

        this.authService.resetPassword(paramet)
          .subscribe((changePass:any)=>{
          if (changePass.msg == 1) {
            this.loginButton = false;
            this.user.reset()
            Swal.fire(
              'Correct',
              changePass.response,
              'success'
            )
          }else{
            Swal.fire(
              'Info!',
              changePass.response,
              'info'
            )
          }
        },
        err => {
          console.log('HTTP Error', err)
          Swal.fire(
            'Error!',
            err.status+" "+err.statusText,
            'error'
          )
        });
      }else {
        Swal.fire(
          'Error',
          'The passwords are not the same',
          'error'
        )
      }

    }
    else {
      Swal.fire(
        'Info!',
        'Fields Required',
        'info'
      )
    }
  }

  goToLogin(){
    this.router.navigate(["auth/login"]);
  }

  get password() { return this.user.get('password') }
  get passwordConfirm() { return this.user.get('passwordConfirm') }
}

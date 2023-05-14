import {
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  statusSubmit: boolean = false
  loginForm: FormGroup
  loading:boolean = false

  constructor(
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected authService: AuthService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [Validators.required]),
      // recaptcha: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.statusSubmit = true;
    Swal.showLoading(null)
    if (this.loginForm.valid) {
      this.enterSystem();
    } else if (
      this.loginForm.controls.email.valid &&
      this.loginForm.controls.password.valid
    ) {
      Swal.fire(
        'Error',
        'Click on "I\'m not a Robot"',
        'warning'
        // 10000,
      );
    } else {
      Swal.fire(
        'Error',
        'Valida los campos en rojo',
        'warning'
        // timer: 10000,
      );
    }
  }

  enterSystem() {
    this.loading = true;
    this.authService
      .loginRequest(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        (response:any) => {
          if (response.success === true){
            this.router.navigate(['/pages/dashboard']);
            this.loading = false;
            Swal.close()
          }
          else if (response.msg == 1) {
            // this.authService.userNavigate();
            this.loading = false;
          }else {
            this.statusSubmit = false
            this.loading = false;
            Swal.fire(
              'Error',
              response.response,
              'warning',
              // timer: 10000,
            );
            this.loginForm.controls.password.setValue('');
          }
        },
        err => {
          this.loading = false;
          this.statusSubmit = false
          Swal.fire(
            'Error',
            'Nombre de usuario y contraseña inválidos',
            'warning',
            // timer: 10000,
          );
          this.loginForm.controls.password.setValue('');
        }
      );
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}

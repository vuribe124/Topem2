import {
  Component,
  ChangeDetectorRef,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';
// import { SettingsService } from '../../../services/settings.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPasswordComponent {
  public userProfileForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,Validators.email
    ]),
  });
  login: boolean = true;
  submitted: boolean = false
  constructor(
    private authSV:AuthService,
    private router: Router
  ) { }

  get email() { return this.userProfileForm.get('email') }

  resetPassword() {
    this.submitted = true
    if (this.userProfileForm.valid) {
      const paramet = {
        email: this.userProfileForm.value.email,
      }
      this.authSV.sendEmail(paramet)
        .subscribe((reset:any)=>{
        if (reset.msg == 1) {
          this.login = false;
          Swal.fire(
            'Correct',
            reset.response,
            'success'
          )
        }else{
          Swal.fire(
            'Info!',
            reset.response,
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
    }
    else {
      Swal.fire(
        'Info!',
        'Fields Required',
        'info'
      )
    }


  }

  irLogin(){
    this.router.navigate(['login']);
  }
}

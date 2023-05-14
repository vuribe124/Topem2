import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NbAlertModule, NbInputModule, NbButtonModule, NbLayoutModule, NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
// import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [LoginComponent,ResetPasswordComponent, RequestPasswordComponent, AuthComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbAlertModule,
  NbInputModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    // SweetAlert2Module,
    RouterModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
  ],
  // providers: [AuthService],
})
export class AuthModule {}

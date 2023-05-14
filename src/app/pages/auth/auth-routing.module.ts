import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [{
    path: '',
    component: AuthComponent,
    children: [
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'request-password',
          component: RequestPasswordComponent,
        },
        {
          path: 'register',
          component: RegisterComponent,
        },
        {
          path: 'reset-password/:_token',
          component: ResetPasswordComponent,
        },
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }

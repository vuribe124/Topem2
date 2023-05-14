import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RegisterComponent],
    imports: [
        CommonModule,
        FormsModule,
        NbAlertModule,
        NbButtonModule,
      nbInput
        NbCheckboxModule,
        NbIconModule,
        RouterModule,
        TranslateModule
    ]
})
export class RegisterModule { }

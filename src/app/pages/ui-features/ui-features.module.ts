import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';
import { UiFeaturesComponent } from './ui-features.component';
import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { SearchComponent } from './search-fields/search-fields.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NbTableModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbFormFieldModule } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


const components = [
  UiFeaturesComponent,
  GridComponent,
  IconsComponent,
  TypographyComponent,
  SearchComponent,
];

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    NbButtonModule,
    NbTableModule,
    NbFormFieldModule,
    UiFeaturesRoutingModule,
    ngFormsModule
  ],
  declarations: [
    ...components,
    CategoriasComponent,
  ],
})
export class UiFeaturesModule { }

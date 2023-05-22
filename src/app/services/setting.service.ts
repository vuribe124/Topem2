import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { NbThemeService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private themeService: NbThemeService,
  ) { }

  alert(title: string, html: string, icon: SweetAlertIcon): void {
    Swal.fire({
      title,
      html,
      icon,
      color: this.getTheme() == 'dark' || this.getTheme() == 'cosmic' ? '#ffffff' : 'inherit',
      background: this.getTheme() == 'dark' ? '#222b45' : this.getTheme() == 'cosmic' ? '#323259' : 'ffffff',
    })
  }

  getTheme(): string {
    return this.themeService.currentTheme;
  }

}

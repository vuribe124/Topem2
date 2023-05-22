import { Injectable } from '@angular/core';
import { baseAPIUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { iForm } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get(
      `${baseAPIUrl}/forms`
    );
  }

  get(parameters: { id: number }) {
    return this.http.get(
      `${baseAPIUrl}/forms/${parameters.id}`,
    );
  }

  store(parameters: iForm) {
    return this.http.post(
      `${baseAPIUrl}/forms`,
      parameters
    );
  }
}

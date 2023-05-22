import { Injectable } from '@angular/core';
import { baseAPIUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(
    private http: HttpClient
  ) { }

  categories() {
    return this.http.get(
      `${baseAPIUrl}/categories`,
    );
  }

}

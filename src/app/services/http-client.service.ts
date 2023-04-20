import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../model/responseModel';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  Get(url: any, params: any) {
    return this.http.get<ResponseModel>(url + params, { headers: this.getHeaders() });
  }

  Post(url: string, data: any) {
    return this.http.post<ResponseModel>(url, data, { headers: this.getHeaders() })
  }

  Put(url: string, data: any) {
    return this.http.put<ResponseModel>(url, data, { headers: this.getHeaders() })
  }

  Delete(url: string, data: any) {
    let options = { headers: this.getHeaders(), body: data };
    return this.http.delete(url, options);
  }
}
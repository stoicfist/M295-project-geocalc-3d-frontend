import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ShapeService {
  private apiUrl = '/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

calculate(shape: any): Observable<any> {
  const token = this.auth.accessToken;

  console.log('🔐 Access Token:', token);
  console.log('📦 Request Payload:', shape);

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${this.apiUrl}/calculate`, shape, { headers });
}

}

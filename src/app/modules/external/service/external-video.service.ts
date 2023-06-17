import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExternalVideoService {
  constructor(private http: HttpClient) {}

  getVideoStream(): Observable<Blob> {
    const url = 'http://localhost:3000/api/polls/video'; // Замените на URL вашего контроллера
    return this.http.get(url, { responseType: 'blob' });
  }
}

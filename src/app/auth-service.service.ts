import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = `https://localhost:7010/api/`;

  constructor(private http: HttpClient) { }

  login(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Auth/login`,data);
  }
  register(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Auth/register`,data);
  }
  getNotesList():Observable<any>{
    return this.http.get(`${this.baseUrl}Note`);
  }
  getNotesListUser(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}Note/${id}`);
  }
  addNote(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Note`,data);
  }
  updateNote(data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}Note`,data);
  }
  deleteNote(id:any):Observable<any>{
    return this.http.delete(`${this.baseUrl}Note/${id}`);
  }
  getNote(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}Note/${id}`);
  }
}

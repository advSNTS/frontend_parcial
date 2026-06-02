import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biblioteca } from '../models/biblioteca';

@Injectable({ providedIn: 'root' })
export class BibliotecaService {
  private api = 'http://localhost:8080/bibliotecas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.api);
  }

  getById(id: number): Observable<Biblioteca> {
    return this.http.get<Biblioteca>(`${this.api}/${id}`);
  }

  create(biblioteca: Biblioteca): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(this.api, biblioteca);
  }

  update(id: number, biblioteca: Biblioteca): Observable<Biblioteca> {
    return this.http.put<Biblioteca>(`${this.api}/${id}`, biblioteca);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Pais } from '../models/pais';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
public pais!:Pais;
  
constructor(
  private http: HttpClient,
  ) {
}
getPaises(): Observable<Pais[]> {
  return this.http.get<Pais[]>('./assets/data/countries.json');
  }
}

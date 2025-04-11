import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersRamdomService {

  private base_url: string = 'https://randomuser.me/api/';
  private httpClient = inject(HttpClient);

  getCharacters(apiUrl:string = `${this.base_url}/`):Observable<any> {
    return this.httpClient.get(apiUrl).pipe(share())

  }
  getCharactersGender(apiUrl:string = `${this.base_url}/?gender=female`):Observable<any> {
    return this.httpClient.get(apiUrl).pipe(share())

  }


}

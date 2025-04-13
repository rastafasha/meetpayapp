import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersRamdomService {

  private base_url: string = 'https://randomuser.me/api/';
  private httpClient = inject(HttpClient);

  getCharacters(apiUrl:string = `${this.base_url}`):Observable<any> {
    return this.httpClient.get(apiUrl).pipe(share())

  }
  // getCharactersGender(apiUrl:string = `${this.base_url}/?gender=${genero}`):Observable<any> {
  //   return this.httpClient.get(apiUrl).pipe(share())

  // }

  getCharactersGender(
      genero?: string,
      distancia?: string,
      dobOrAge?: string | number // Accepts either dob string or age number
  ) {

    let LINK = '';
  
      if (distancia) LINK += `&distance=${distancia}`;
      if (genero) LINK += `&gender=${genero}`;
      
      // si viene la edad buscamos dentro de dob.age
    if (dobOrAge !== undefined) {
        const age = typeof dobOrAge === 'number' 
            ? dobOrAge 
            : new Date().getFullYear() - new Date(dobOrAge).getFullYear();
        LINK += `&dob_age=${age}`;
    }


      const url =
        this.base_url +
        '?exc=login,registered' +
        // '&exc=registered' +
        // page +
        LINK;

      // const url = `${this.base_url}/?gender=${genero}`;

      return this.httpClient
        .get<any>(url)
        // .pipe(map((resp: { ok: boolean; resp }) => resp));
    }



}

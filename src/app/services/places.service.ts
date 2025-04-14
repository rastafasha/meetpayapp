import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number,] ;
  
  private http = inject(HttpClient);
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }


  constructor() {
    setTimeout(()=>{
      this.getUserLocation();
    },1000)
   }

  getUserLocation():Promise<[number,number]>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        // ({coords}) => resolve([coords.longitude, coords.latitude]) //otra forma de llamarlo
        ({coords})=>{
          this.userLocation = [coords.longitude, coords.latitude]
          resolve (this.userLocation);
          //convertimos los datos para obtener el nombre del pais
          this.getCountryName();
          // console.log('coordenadas',coords);
          if(!coords){
            alert('No se pudo obtener la geolocalización')
              // console.error('Error obteniendo la ubicación', error);
          }
        },

      )
    })
  }
  async getCountryName() {
    if (!this.userLocation) return;
    
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.userLocation[1]}&lon=${this.userLocation[0]}&zoom=18&addressdetails=1&countrycodes=ES&accept-language=es`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Nominatim API error:', data.error);
        return;
      }
      
      // console.log('Location data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  }

  getAllLocations(center: {lat:number, lng:number}){
    const url = './assets/data/users.json'
    return this.http.get<[Usuario]>(url, {
      params: {
        origin: `${center.lat}, ${center.lng}`
      }
    })
  }
  
}

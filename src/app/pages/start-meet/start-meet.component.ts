import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ModalfooterComponent } from '../../components/modalfooter/modalfooter.component';
import { UsersRamdomService } from '../../services/users-ramdom.service';
import { RouterModule } from '@angular/router';
import { BackAreaComponent } from "../../shared/back-area/back-area.component";
import { PreferenciasService } from '../../services/preferencias.service';
import { Usuario } from '../../models/user';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { NgIf } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-start-meet',
  imports: [HeaderComponent, RouterModule, 
    BackAreaComponent, LoadingComponent, NgIf,
  ],
  templateUrl: './start-meet.component.html',
  styleUrl: './start-meet.component.scss'
})
export class StartMeetComponent implements OnInit {
  private isToggled = false;
  public isLoading = false;
  value:any;
  user!:Usuario
  genero!:string;
  edad!:number;
  distancia!:string;
  userLocation:any;
  quiero!:any[];
  users!:any[];

  constructor(
    private renderer: Renderer2,
     private el: ElementRef,
     private userRandomService:UsersRamdomService,
     private prefereciasService:PreferenciasService,
     private usuarioService:UserService,
     private authService:AuthService,
     private placesServices: PlacesService,
    ) {
      this.user = this.authService.getUser();
    }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // const pinElement = this.el.nativeElement.querySelector('#pin');
    // if (pinElement) {
    //   this.renderer.listen(pinElement, 'click', () => this.toggleClasses());
    // }
    this.user;
    this.getPreferenciasbyUser();
    // this.getUsers();
    // this.getUsersbyGender();
  }

  getPreferenciasbyUser(){
    this.isLoading = true;
    this.prefereciasService.getByUserId(this.user.uid).subscribe((response:any)=>{
      console.log(response);
      this.genero = response[0].genero;
      this.distancia = response[0].distancia;
      this.edad = response[0].edad;
      if(this.genero === '1'){
        this.genero = 'male'
      }
      if(this.genero === '2'){
        this.genero = 'female'
      }
      if(this.genero === '3'){
        this.genero = ''
      }
      });
      this.isLoading = false;
      this.getUsersbyGender();
  }

  

  //buscamos los usuarios segun los datos recibidos de genero
  
  getUsers(){
    this.userRandomService.getCharacters().subscribe((resp:any)=>{
      // console.log(resp);
    })
  }
  getUsersbyGender(){
    this.userRandomService.getCharactersGender(this.genero, this.distancia, this.edad).subscribe((resp:any)=>{
      console.log('por genero',resp);
      this.users = resp.results;    })
  }

  toggleClasses(value:any): void {
    this.value = value;
    this.isToggled = !this.isToggled;
    const quehacer = this.el.nativeElement.querySelector('.quehacer');

    if (quehacer) {
      if (this.isToggled) {
        this.renderer.addClass(quehacer, 'mostrar-quehacer');
      } else {
        this.renderer.removeClass(quehacer, 'mostrar-quehacer');
      }
    }
    
  }
}

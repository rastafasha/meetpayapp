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
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-start-meet',
  imports: [HeaderComponent, RouterModule, 
    BackAreaComponent, LoadingComponent, NgIf, NgFor, NgClass,
    TranslateModule
  ],
  templateUrl: './start-meet.component.html',
  styleUrl: './start-meet.component.scss'
})
export class StartMeetComponent implements OnInit {
  private isToggled = false;
  public isLoading = false;

  public option_selected:number = 1;
  public solicitud_selected:any = null;

  value:any;
  user!:Usuario
  genero!:string;
  edad!:number;
  distancia!:string;
  userLocation:any;
  quiero!:any[];
  users!:any[];
  usersLocal!:any[];

  user_selected!:any;

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
    // this.getPreferenciasbyUser();
    // this.getUsers();
    // this.getUsersbyGender();
    this.getUserLocal();
  }

  optionSelected(value:number){
    this.option_selected = value;
    if(this.option_selected === 1){

      this.ngOnInit();
    }
    if(this.option_selected === 2){
      this.solicitud_selected = null;
      
      
    }
  }

  getPreferenciasbyUser(){
    this.isLoading = true;
    this.prefereciasService.getByUserId(this.user.uid).subscribe((response:any)=>{
      // console.log(response);
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
      // console.log('por genero',resp);
      this.users = resp.results;    })
  }


  getUserLocal(){
    this.usuarioService.getUsersLocal().subscribe((resp:any)=>{
      console.log(resp);
      this.usersLocal = resp.users;
    })
  }

  // toggleClasses(value:any): void {
  //   this.value = value;
  //   this.isToggled = !this.isToggled;
  //   const quehacer = this.el.nativeElement.querySelector('.quehacer');

  //   if (quehacer) {
  //     if (this.isToggled) {
  //       this.renderer.addClass(quehacer, 'mostrar-quehacer');
  //     } else {
  //       this.renderer.removeClass(quehacer, 'mostrar-quehacer');
  //     }
  //   }
    
  // }
  toggleClasses(userl:any, isToggled:boolean): void {
    this.user_selected = userl;
    this.value = isToggled;
    
    console.log(this.user_selected);
    const quehacer = this.el.nativeElement.querySelector('.quehacer');

    if (quehacer) {
      if (this.isToggled) {
        this.renderer.addClass(quehacer, 'mostrar-quehacer');
      } else {
        this.renderer.removeClass(quehacer, 'mostrar-quehacer');
      }
    }
    
  }

  showUser(userl:any){
    this.toggleClasses(userl, this.isToggled = true);
    // this.toggleClasses(true);

  }
  cancerlOptions(){
    this.toggleClassesCancel(this.isToggled = false);
    // this.toggleClasses(true);

  }

  toggleClassesCancel(value:any): void {
    this.value = value;
    console.log(this.isToggled);
    const quehacer = this.el.nativeElement.querySelector('.quehacer');

    if (quehacer) {
      this.renderer.removeClass(quehacer, 'mostrar-quehacer');
      
    }
    
  }
}

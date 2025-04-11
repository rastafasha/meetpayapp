import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {  Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/user';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user = signal(Usuario);
  private _location = inject(Location)
  private userService = inject(UserService)
  private router = inject(Router)

  ngOnInit(){
    this.user = this.userService.getUser();
    console.log(this.user);
    setTimeout(()=>{
      if(!this.user){
        this.router.navigateByUrl('/login');
      }
    },1000 )
  }
  

  openMenu() {
    console.log('pulsado');
    const menuLateral = document.getElementsByClassName("menu-principal");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.add("mostrar-menu-principal");
    }
  }

  closeMenu() {
    const menuLateral = document.getElementsByClassName("menu-principal");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("mostrar-menu-principal");
    }
  }

  goBack() {
    this._location.back();
  }

  onLogout(){
    this.userService.logout();
  }

}

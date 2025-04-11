import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private _location: Location) {}

  onLogout(){

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
}

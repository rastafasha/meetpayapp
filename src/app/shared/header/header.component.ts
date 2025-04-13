import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {  Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/user';
import {TranslateService} from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  year: number = new Date().getFullYear();
  user! : Usuario;
  private _location = inject(Location);
  private userService = inject(UserService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  langs: string[] = [];
  public activeLang = 'es';
  flag = false;

  constructor(
  ) {
    this.translate.setDefaultLang('en');
    // this.translate.setDefaultLang(this.activeLang);
    this.translate.use('en');
    this.translate.addLangs(["es", "en"]);
    this.langs = this.translate.getLangs();
    this.translate.get(this.langs).subscribe(res =>{
      // console.log(res);
    })
    // console.log(this.translate);
  }

  public cambiarLenguaje(lang:any) {
    this.activeLang = lang;
    this.translate.use(lang);
    this.flag = !this.flag;
    localStorage.setItem('lang', this.activeLang);
  }

  ngOnInit(){
    this.user = this.userService.getUser();
    // console.log(this.user);
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.activeLang = lang;
      this.translate.use(lang);
      }
    

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

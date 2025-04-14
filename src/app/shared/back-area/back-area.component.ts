import { Component, inject } from '@angular/core';
import {  Location } from '@angular/common';
@Component({
  selector: 'app-back-area',
  imports: [],
  templateUrl: './back-area.component.html',
  styleUrl: './back-area.component.scss'
})
export class BackAreaComponent {
  private _location = inject(Location);
  goBack() {
    this._location.back();
  }


}

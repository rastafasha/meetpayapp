import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { SliderGalleryComponent } from '../../../components/slider-gallery/slider-gallery.component';
import { RouterModule } from '@angular/router';
import { BackAreaComponent } from '../../../shared/back-area/back-area.component';

@Component({
  selector: 'app-galeria',
  imports: [HeaderComponent, SliderGalleryComponent, RouterModule, BackAreaComponent ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {

}

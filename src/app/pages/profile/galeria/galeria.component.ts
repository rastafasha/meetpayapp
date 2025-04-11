import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { SliderGalleryComponent } from '../../../components/slider-gallery/slider-gallery.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-galeria',
  imports: [HeaderComponent, SliderGalleryComponent, RouterModule ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {

}

import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { SliderGalleryComponent } from '../../../components/slider-gallery/slider-gallery.component';
import { RouterModule } from '@angular/router';
import { BackAreaComponent } from '../../../shared/back-area/back-area.component';

@Component({
  selector: 'app-view',
  imports: [HeaderComponent, SliderGalleryComponent,
    RouterModule, BackAreaComponent
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

}

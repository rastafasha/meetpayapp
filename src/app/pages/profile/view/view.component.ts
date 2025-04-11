import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { SliderGalleryComponent } from '../../../components/slider-gallery/slider-gallery.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view',
  imports: [HeaderComponent, SliderGalleryComponent,
    RouterModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

}

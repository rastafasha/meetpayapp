import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ChatComponent } from "../chat/chat.component";
import { RouterModule } from '@angular/router';
import { BackAreaComponent } from '../../shared/back-area/back-area.component';

@Component({
  selector: 'app-tracking',
  imports: [HeaderComponent,  RouterModule, BackAreaComponent],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent {

}

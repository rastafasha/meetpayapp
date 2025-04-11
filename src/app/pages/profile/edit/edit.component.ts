import { Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-edit',
  imports: [HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class EditComponent {

}

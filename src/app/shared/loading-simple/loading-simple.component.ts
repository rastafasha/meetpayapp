import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-simple',
  imports: [],
  templateUrl: './loading-simple.component.html',
  styleUrl: './loading-simple.component.scss'
})
export class LoadingSimpleComponent {
  @Input() loadingTitle!:string;
}

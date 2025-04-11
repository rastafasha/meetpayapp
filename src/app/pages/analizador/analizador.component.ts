import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
  selector: 'app-analizador',
  imports: [NgIf, RouterModule, LoadingComponent],
  templateUrl: './analizador.component.html',
  styleUrl: './analizador.component.scss'
})
export class AnalizadorComponent {

  private router = inject(Router);

  isMatchAdvise:boolean = false;
  ngOnInit(){
    setTimeout(()=>{
      this.showMatchAdvise();

    }, 5000)
  }

  showMatchAdvise(){
    this.isMatchAdvise = true;
  }
}

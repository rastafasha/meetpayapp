import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizadorComponent } from './analizador.component';

describe('AnalizadorComponent', () => {
  let component: AnalizadorComponent;
  let fixture: ComponentFixture<AnalizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalizadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

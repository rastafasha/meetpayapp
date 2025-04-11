import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalfooterComponent } from './modalfooter.component';

describe('ModalfooterComponent', () => {
  let component: ModalfooterComponent;
  let fixture: ComponentFixture<ModalfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalfooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackAreaComponent } from './back-area.component';

describe('BackAreaComponent', () => {
  let component: BackAreaComponent;
  let fixture: ComponentFixture<BackAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

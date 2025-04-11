import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderGalleryComponent } from './slider-gallery.component';

describe('SliderGalleryComponent', () => {
    let component: SliderGalleryComponent;
    let fixture: ComponentFixture<SliderGalleryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ SliderGalleryComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
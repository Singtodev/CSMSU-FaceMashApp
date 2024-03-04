import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDetailComponent } from './picture-detail.component';

describe('PictureDetailComponent', () => {
  let component: PictureDetailComponent;
  let fixture: ComponentFixture<PictureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

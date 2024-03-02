import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGalleryComponent } from './setting-gallery.component';

describe('SettingGalleryComponent', () => {
  let component: SettingGalleryComponent;
  let fixture: ComponentFixture<SettingGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGalleryAddComponent } from './setting-gallery-add.component';

describe('SettingGalleryAddComponent', () => {
  let component: SettingGalleryAddComponent;
  let fixture: ComponentFixture<SettingGalleryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGalleryAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingGalleryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGalleryEditComponent } from './setting-gallery-edit.component';

describe('SettingGalleryEditComponent', () => {
  let component: SettingGalleryEditComponent;
  let fixture: ComponentFixture<SettingGalleryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGalleryEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingGalleryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

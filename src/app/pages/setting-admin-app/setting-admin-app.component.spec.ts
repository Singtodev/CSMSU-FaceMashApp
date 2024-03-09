import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAdminAppComponent } from './setting-admin-app.component';

describe('SettingAdminAppComponent', () => {
  let component: SettingAdminAppComponent;
  let fixture: ComponentFixture<SettingAdminAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingAdminAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingAdminAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

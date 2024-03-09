import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAdminUserComponent } from './setting-admin-user.component';

describe('SettingAdminUserComponent', () => {
  let component: SettingAdminUserComponent;
  let fixture: ComponentFixture<SettingAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingAdminUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

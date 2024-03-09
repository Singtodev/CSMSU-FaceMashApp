import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAdminUserIdComponent } from './setting-admin-user-id.component';

describe('SettingAdminUserIdComponent', () => {
  let component: SettingAdminUserIdComponent;
  let fixture: ComponentFixture<SettingAdminUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingAdminUserIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingAdminUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

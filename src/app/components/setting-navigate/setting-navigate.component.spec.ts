import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNavigateComponent } from './setting-navigate.component';

describe('SettingNavigateComponent', () => {
  let component: SettingNavigateComponent;
  let fixture: ComponentFixture<SettingNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingNavigateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

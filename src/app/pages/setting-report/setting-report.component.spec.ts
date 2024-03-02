import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingReportComponent } from './setting-report.component';

describe('SettingReportComponent', () => {
  let component: SettingReportComponent;
  let fixture: ComponentFixture<SettingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

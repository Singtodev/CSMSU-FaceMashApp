import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingVotelogComponent } from './setting-votelog.component';

describe('SettingVotelogComponent', () => {
  let component: SettingVotelogComponent;
  let fixture: ComponentFixture<SettingVotelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingVotelogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingVotelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

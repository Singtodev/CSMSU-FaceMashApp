import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToprankComponent } from './toprank.component';

describe('ToprankComponent', () => {
  let component: ToprankComponent;
  let fixture: ComponentFixture<ToprankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToprankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToprankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

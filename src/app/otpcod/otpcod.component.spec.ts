import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpcodComponent } from './otpcod.component';

describe('OtpcodComponent', () => {
  let component: OtpcodComponent;
  let fixture: ComponentFixture<OtpcodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpcodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpcodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

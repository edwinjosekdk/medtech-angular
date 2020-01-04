import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprodComponent } from './subprod.component';

describe('SubprodComponent', () => {
  let component: SubprodComponent;
  let fixture: ComponentFixture<SubprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

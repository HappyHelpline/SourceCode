import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbootstrapComponent } from './dashbootstrap.component';

describe('DashbootstrapComponent', () => {
  let component: DashbootstrapComponent;
  let fixture: ComponentFixture<DashbootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

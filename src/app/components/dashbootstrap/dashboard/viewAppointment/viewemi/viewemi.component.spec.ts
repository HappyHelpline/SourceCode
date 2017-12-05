import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemiComponent } from './viewemi.component';

describe('ViewemiComponent', () => {
  let component: ViewemiComponent;
  let fixture: ComponentFixture<ViewemiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewemiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

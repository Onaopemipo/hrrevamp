import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistrequestComponent } from './existrequest.component';

describe('ExistrequestComponent', () => {
  let component: ExistrequestComponent;
  let fixture: ComponentFixture<ExistrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

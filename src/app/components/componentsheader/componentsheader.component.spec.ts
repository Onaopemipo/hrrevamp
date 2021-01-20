import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsheaderComponent } from './componentsheader.component';

describe('ComponentsheaderComponent', () => {
  let component: ComponentsheaderComponent;
  let fixture: ComponentFixture<ComponentsheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

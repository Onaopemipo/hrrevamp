import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligilibilyviewComponent } from './eligilibilyview.component';

describe('EligilibilyviewComponent', () => {
  let component: EligilibilyviewComponent;
  let fixture: ComponentFixture<EligilibilyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligilibilyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligilibilyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

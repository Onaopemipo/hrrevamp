import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSubTypeComponent } from './asset-sub-type.component';

describe('AssetSubTypeComponent', () => {
  let component: AssetSubTypeComponent;
  let fixture: ComponentFixture<AssetSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

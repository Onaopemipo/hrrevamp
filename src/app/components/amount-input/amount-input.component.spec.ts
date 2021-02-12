import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmountInputComponent } from './amount-input.component';

describe('AmountInputComponent', () => {
  let component: AmountInputComponent;
  let fixture: ComponentFixture<AmountInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

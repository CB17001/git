import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAppointmentCounsellorPage } from './create-appointment-counsellor.page';

describe('CreateAppointmentCounsellorPage', () => {
  let component: CreateAppointmentCounsellorPage;
  let fixture: ComponentFixture<CreateAppointmentCounsellorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAppointmentCounsellorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentCounsellorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

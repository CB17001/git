import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApproveAppointmentCounsellorPage } from './approve-appointment-counsellor.page';

describe('ApproveAppointmentCounsellorPage', () => {
  let component: ApproveAppointmentCounsellorPage;
  let fixture: ComponentFixture<ApproveAppointmentCounsellorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAppointmentCounsellorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveAppointmentCounsellorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

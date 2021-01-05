import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAppointmentCounsellorPage } from './view-appointment-counsellor.page';

describe('ViewAppointmentCounsellorPage', () => {
  let component: ViewAppointmentCounsellorPage;
  let fixture: ComponentFixture<ViewAppointmentCounsellorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAppointmentCounsellorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAppointmentCounsellorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

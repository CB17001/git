import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAttendanceCounPage } from './view-attendance-coun.page';

describe('ViewAttendanceCounPage', () => {
  let component: ViewAttendanceCounPage;
  let fixture: ComponentFixture<ViewAttendanceCounPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttendanceCounPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAttendanceCounPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

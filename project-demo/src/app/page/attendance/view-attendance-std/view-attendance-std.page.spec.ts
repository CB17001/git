import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAttendanceStdPage } from './view-attendance-std.page';

describe('ViewAttendanceStdPage', () => {
  let component: ViewAttendanceStdPage;
  let fixture: ComponentFixture<ViewAttendanceStdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttendanceStdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAttendanceStdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

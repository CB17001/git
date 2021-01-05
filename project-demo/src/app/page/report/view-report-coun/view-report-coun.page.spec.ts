import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewReportCounPage } from './view-report-coun.page';

describe('ViewReportCounPage', () => {
  let component: ViewReportCounPage;
  let fixture: ComponentFixture<ViewReportCounPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportCounPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReportCounPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

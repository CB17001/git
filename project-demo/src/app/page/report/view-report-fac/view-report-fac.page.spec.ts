import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewReportFacPage } from './view-report-fac.page';

describe('ViewReportFacPage', () => {
  let component: ViewReportFacPage;
  let fixture: ComponentFixture<ViewReportFacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportFacPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReportFacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

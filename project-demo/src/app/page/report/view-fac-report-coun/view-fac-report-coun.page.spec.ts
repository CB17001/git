import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFacReportCounPage } from './view-fac-report-coun.page';

describe('ViewFacReportCounPage', () => {
  let component: ViewFacReportCounPage;
  let fixture: ComponentFixture<ViewFacReportCounPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFacReportCounPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFacReportCounPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

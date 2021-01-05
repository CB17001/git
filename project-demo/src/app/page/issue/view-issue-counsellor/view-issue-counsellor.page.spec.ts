import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewIssueCounsellorPage } from './view-issue-counsellor.page';

describe('ViewIssueCounsellorPage', () => {
  let component: ViewIssueCounsellorPage;
  let fixture: ComponentFixture<ViewIssueCounsellorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssueCounsellorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIssueCounsellorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

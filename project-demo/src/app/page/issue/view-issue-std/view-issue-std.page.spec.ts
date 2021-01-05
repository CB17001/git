import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewIssueStdPage } from './view-issue-std.page';

describe('ViewIssueStdPage', () => {
  let component: ViewIssueStdPage;
  let fixture: ComponentFixture<ViewIssueStdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssueStdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIssueStdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

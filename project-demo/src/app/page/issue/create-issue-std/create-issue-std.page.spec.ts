import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateIssueStdPage } from './create-issue-std.page';

describe('CreateIssueStdPage', () => {
  let component: CreateIssueStdPage;
  let fixture: ComponentFixture<CreateIssueStdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIssueStdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIssueStdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounsellorAccountPage } from './counsellor-account.page';

describe('CounsellorAccountPage', () => {
  let component: CounsellorAccountPage;
  let fixture: ComponentFixture<CounsellorAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CounsellorAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

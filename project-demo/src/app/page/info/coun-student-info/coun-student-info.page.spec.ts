import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounStudentInfoPage } from './coun-student-info.page';

describe('CounStudentInfoPage', () => {
  let component: CounStudentInfoPage;
  let fixture: ComponentFixture<CounStudentInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounStudentInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CounStudentInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounsellorHomePage } from './counsellor-home.page';

describe('CounsellorHomePage', () => {
  let component: CounsellorHomePage;
  let fixture: ComponentFixture<CounsellorHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CounsellorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'register2',
    loadChildren: () => import('./page/register2/register2.module').then( m => m.Register2PageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'student-account',
    loadChildren: () => import('./page/account/student-account/student-account.module').then( m => m.StudentAccountPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'student-appointment',
    loadChildren: () => import('./page/appointment/student-appointment/student-appointment.module').then( m => m.StudentAppointmentPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'stud-view-appointment',
    loadChildren: () => import('./page/appointment/stud-view-appointment/stud-view-appointment.module').then( m => m.StudViewAppointmentPageModule)
  },
  {
    path: 'view-attendance-std',
    loadChildren: () => import('./page/attendance/view-attendance-std/view-attendance-std.module').then( m => m.ViewAttendanceStdPageModule)
  },
  {
    path: 'view-issue-std',
    loadChildren: () => import('./page/issue/view-issue-std/view-issue-std.module').then( m => m.ViewIssueStdPageModule)
  },
  {
    path: 'create-issue-std',
    loadChildren: () => import('./page/issue/create-issue-std/create-issue-std.module').then( m => m.CreateIssueStdPageModule)
  },
  {
    path: 'counsellor-account',
    loadChildren: () => import('./page/account/counsellor-account/counsellor-account.module').then( m => m.CounsellorAccountPageModule)
  },
  {
    path: 'counsellor-home',
    loadChildren: () => import('./mainpage/counsellor-home/counsellor-home.module').then( m => m.CounsellorHomePageModule)
  },
  {
    path: 'view-appointment-counsellor',
    loadChildren: () => import('./page/appointment/view-appointment-counsellor/view-appointment-counsellor.module').then( m => m.ViewAppointmentCounsellorPageModule)
  },
  {
    path: 'view-issue-counsellor',
    loadChildren: () => import('./page/issue/view-issue-counsellor/view-issue-counsellor.module').then( m => m.ViewIssueCounsellorPageModule)
  },
  {
    path: 'approve-appointment-counsellor',
    loadChildren: () => import('./page/appointment/approve-appointment-counsellor/approve-appointment-counsellor.module').then( m => m.ApproveAppointmentCounsellorPageModule)
  },
  {
    path: 'view-attendance-coun',
    loadChildren: () => import('./page/attendance/view-attendance-coun/view-attendance-coun.module').then( m => m.ViewAttendanceCounPageModule)
  },
  {
    path: 'view-report-coun',
    loadChildren: () => import('./page/report/view-report-coun/view-report-coun.module').then( m => m.ViewReportCounPageModule)
  },
  {
    path: 'view-report-fac',
    loadChildren: () => import('./page/report/view-report-fac/view-report-fac.module').then( m => m.ViewReportFacPageModule)
  },
  {
    path: 'view-fac-report-coun',
    loadChildren: () => import('./page/report/view-fac-report-coun/view-fac-report-coun.module').then( m => m.ViewFacReportCounPageModule)
  },
  {
    path: 'create-appointment-counsellor',
    loadChildren: () => import('./page/appointment/create-appointment-counsellor/create-appointment-counsellor.module').then( m => m.CreateAppointmentCounsellorPageModule)
  },
  {
    path: 'faculty-home',
    loadChildren: () => import('./mainpage/faculty-home/faculty-home.module').then( m => m.FacultyHomePageModule)
  },
  {
    path: 'faculty-account',
    loadChildren: () => import('./page/account/faculty-account/faculty-account.module').then( m => m.FacultyAccountPageModule)
  },
  {
    path: 'student-info',
    loadChildren: () => import('./page/student-info/student-info.module').then( m => m.StudentInfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

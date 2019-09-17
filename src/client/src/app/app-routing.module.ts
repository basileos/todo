import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthorizedGuard } from './guards/authorized-guard.service';
import { TasksComponent } from './components/tasks/tasks.component';
import { UnauthorizedGuard } from './guards/unauthorized.guard';


const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthorizedGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

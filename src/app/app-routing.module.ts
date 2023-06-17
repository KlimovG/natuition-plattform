import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/service/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'video',
    loadChildren: () =>
      import('./modules/external/external.module').then(
        (m) => m.ExternalModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

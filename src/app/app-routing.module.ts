import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login/login.component';
import { usuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [usuarioAutenticadoGuard]
  },
  {
    path: 'contatos',
    loadChildren: () => import('./views/contatos/contatos.module')
      .then(m => m.ContatosModule)
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.module')
      .then(m => m.CompromissosModule)
  },

  {
    path: 'categorias',
    loadChildren: () => import('./views/categorias/categorias.module')
      .then(m => m.CategoriasModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

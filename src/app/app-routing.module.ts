import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login/login.component';
import { usuarioAutenticadoGuard, usuarioNaoAutenticadoGuard } from './core/auth/guards/usuario-autenticado.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [usuarioNaoAutenticadoGuard]
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
  {
    path: 'despesas',
    loadChildren: () => import('./views/despesas/despesas.module')
      .then(m => m.DespesasModule)
  },

  {
    path: 'tarefas',
    loadChildren: () => import('./views/tarefas/tarefas.module')
      .then(m => m.TarefasModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module')
      .then(m => m.LoginModule)
  },

  {
    path: 'registro',
    loadChildren: () => import('./views/registro/registro.module')
      .then(m => m.RegistroModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatosComponent } from './views/contatos/inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './views/contatos/editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './views/contatos/excluir-contato/excluir-contato.component';
import { InserirCompromissoComponent } from './views/compromissos/inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { EditarCompromissosComponent } from './views/compromissos/editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissoComponent } from './views/compromissos/excluir-compromisso/excluir-compromisso.component';
import { contatoCompletoResolve, formContatoResolve, listarContatoResolve } from './views/contatos/resolvers/contato-resolver';
import { LoginComponent } from './views/login/login/login.component';
import { usuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { compromissoCompletoResolve, formCompromissoResolve, listarCompromissoResolve } from './views/compromissos/resolvers/compromisso-resolver';


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
    path: 'contatos/inserir',
    component: InserirContatosComponent,
    canActivate: [usuarioAutenticadoGuard]
  },
  {
    path: 'contatos/editar/:id',
    component: EditarContatoComponent,
    resolve: { 'contato': formContatoResolve },
    canActivate: [usuarioAutenticadoGuard]
  },
  {
    path: 'contatos/listar',
    component: ListarContatosComponent,
    resolve: { 'contatos': listarContatoResolve },
    canActivate: [usuarioAutenticadoGuard]
  },
  {
    path: 'contatos/excluir/:id',
    component: ExcluirContatoComponent,
    resolve: { 'contato': contatoCompletoResolve },
    canActivate: [usuarioAutenticadoGuard]
  },
  {
    path: 'compromissos/inserir',
    component: InserirCompromissoComponent,
    canActivate: [usuarioAutenticadoGuard],
    resolve: { 'contatos': listarContatoResolve }
  },
  {
    path: 'compromissos/listar',
    component: ListarCompromissosComponent,
    canActivate: [usuarioAutenticadoGuard],
    resolve: { 'compromissos': listarCompromissoResolve }
  },
  {
    path: 'compromissos/editar/:id',
    component: EditarCompromissosComponent,
    resolve: { 'compromisso': formCompromissoResolve, 'contatos': listarContatoResolve },
    canActivate: [usuarioAutenticadoGuard]
  },
  {
    path: 'compromissos/excluir/:id',
    component: ExcluirCompromissoComponent,
    canActivate: [usuarioAutenticadoGuard],
    resolve: { 'compromisso': compromissoCompletoResolve, }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'contatos/inserir',
    component: InserirContatosComponent
  },
  {
    path: 'contatos/editar/:id',
    component: EditarContatoComponent
  },
  {
    path: 'contatos/listar',
    component: ListarContatosComponent
  },
  {
    path: 'contatos/excluir/:id',
    component: ExcluirContatoComponent
  },
  {
    path: 'compromissos/inserir',
    component: InserirCompromissoComponent
  },
  {
    path: 'compromissos/listar',
    component: ListarCompromissosComponent
  },
  {
    path: 'compromissos/editar/:id',
    component: EditarCompromissosComponent
  },
  {
    path: 'compromissos/excluir/:id',
    component: ExcluirCompromissoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

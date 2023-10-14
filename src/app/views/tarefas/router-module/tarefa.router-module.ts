import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { usuarioAutenticadoGuard } from "src/app/services/guards/usuario-autenticado.guard";
import { EditarTarefaComponent } from "../editar-tarefa/editar-tarefa.component";
import { ExcluirTarefaComponent } from "../excluir-tarefa/excluir-tarefa.component";
import { InserirTarefaComponent } from "../inserir-tarefa/inserir-tarefa.component";
import { ListarTarefasComponent } from "../listar-tarefas/listar-tarefas.component";
import { buscarTarefaPorIdResolve, listarTarefasResolve } from "./tarefa.resolver";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
    },
    {
        path: 'inserir',
        component: InserirTarefaComponent,
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'listar',
        component: ListarTarefasComponent,
        resolve: { 'tarefas': listarTarefasResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'editar/:id',
        component: EditarTarefaComponent,
        resolve: { 'tarefa': buscarTarefaPorIdResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    // {
    //     path: 'detalhes/:id',
    //     component: DetalhesDespesaComponent,
    //     resolve: { 'despesa': visualizarDespesaCompletaResolve},
    //     canActivate: [usuarioAutenticadoGuard]
    // },
    {
        path: 'excluir/:id',
        component: ExcluirTarefaComponent,
        resolve: { 'tarefa': buscarTarefaPorIdResolve },
        canActivate: [usuarioAutenticadoGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class TarefasRouterModule {

}
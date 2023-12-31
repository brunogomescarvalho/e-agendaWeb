import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { usuarioAutenticadoGuard } from "src/app/core/auth/guards/usuario-autenticado.guard";
import { EditarTarefaComponent } from "../editar-tarefa/editar-tarefa.component";
import { ExcluirTarefaComponent } from "../excluir-tarefa/excluir-tarefa.component";
import { InserirTarefaComponent } from "../inserir-tarefa/inserir-tarefa.component";
import { ListarTarefasComponent } from "../listar-tarefas/listar-tarefas.component";
import { buscarTarefaCompletaPorIdResolve, buscarTarefaPorIdResolve, listarTarefasResolve } from "./tarefa.resolver";
import { DetalhesTarefaComponent } from "../detalhes-tarefa/detalhes-tarefa.component";

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
    {
        path: 'detalhes/:id',
        component: DetalhesTarefaComponent,
        resolve: { 'tarefa': buscarTarefaCompletaPorIdResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'excluir/:id',
        component: ExcluirTarefaComponent,
        resolve: { 'tarefa': buscarTarefaCompletaPorIdResolve },
        canActivate: [usuarioAutenticadoGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class TarefasRouterModule {

}
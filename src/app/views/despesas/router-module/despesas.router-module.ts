import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InserirDespesaComponent } from "../inserir-despesa/inserir-despesa.component";
import { usuarioAutenticadoGuard } from "src/app/services/guards/usuario-autenticado.guard";
import { ListarDespesasComponent } from "../listar-despesas/listar-despesas.component";
import { selecionarDespesasPorId, selecionarTodasDespesasResolve, visualizarDespesaCompletaResolve } from "../resolvers/resolver-despesas";
import { listarCategoriasResolve } from "../../categorias/resolvers/resolvers-categorias";
import { EditarDespesasComponent } from "../editar-despesas/editar-despesas.component";
import { DetalhesDespesaComponent } from "../detalhes-despesa/detalhes-despesa.component";
import { ExcluirDespesaComponent } from "../excluir-despesa/excluir-despesa.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
    },
    {
        path: 'inserir',
        component: InserirDespesaComponent,
        resolve: { 'categorias': listarCategoriasResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'listar',
        component: ListarDespesasComponent,
        resolve: { 'despesas': selecionarTodasDespesasResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'editar/:id',
        component: EditarDespesasComponent,
        resolve: { 'despesa': selecionarDespesasPorId, 'categorias': listarCategoriasResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'detalhes/:id',
        component: DetalhesDespesaComponent,
        resolve: { 'despesa': visualizarDespesaCompletaResolve},
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'excluir/:id',
        component: ExcluirDespesaComponent,
        resolve: { 'despesa': visualizarDespesaCompletaResolve},
        canActivate: [usuarioAutenticadoGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class DespesasRouteModule {

}
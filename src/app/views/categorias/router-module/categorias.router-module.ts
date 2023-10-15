import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarCategoriasComponent } from "../listar-categorias/listar-categorias.component";
import { usuarioAutenticadoGuard } from "src/app/services/guards/usuario-autenticado.guard";
import { buscarCategoriaCompletaPorIdResolve, buscarCategoriaPorIdResolve, listarCategoriasResolve } from "./resolvers-categorias";
import { InserirCategoriaComponent } from "../inserir-categoria/inserir-categoria.component";
import { EditarCategoriaComponent } from "../editar-categoria/editar-categoria.component";
import { ExcluirCategoriaComponent } from "../excluir-categoria/excluir-categoria.component";
import { DetalhesCategoriaComponent } from "../detalhes-categoria/detalhes-categoria.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
    },
    {
        path: 'listar',
        component: ListarCategoriasComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'categorias': listarCategoriasResolve }
    },
    {
        path: 'inserir',
        component: InserirCategoriaComponent,
        canActivate: [usuarioAutenticadoGuard],
    },
    {
        path: 'editar/:id',
        component: EditarCategoriaComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'categoria': buscarCategoriaPorIdResolve }
    },
    {
        path: 'excluir/:id',
        component: ExcluirCategoriaComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'categoria': buscarCategoriaCompletaPorIdResolve }
    },
    {
        path: 'detalhes/:id',
        component: DetalhesCategoriaComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'categoria': buscarCategoriaCompletaPorIdResolve }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class CategoriasRouterModule {

}
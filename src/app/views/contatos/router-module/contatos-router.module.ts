import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { usuarioAutenticadoGuard } from "src/app/core/auth/guards/usuario-autenticado.guard";
import { EditarContatoComponent } from "../editar-contato/editar-contato.component";
import { ExcluirContatoComponent } from "../excluir-contato/excluir-contato.component";

import { formContatoResolve, listarContatoResolve, contatoCompletoResolve } from "./contato-resolver";
import { InserirContatosComponent } from "../inserir-contatos/inserir-contatos.component";
import { ListarContatosComponent } from "../listar-contatos/listar-contatos.component";
import { DetalhesContatoComponent } from "../detalhes-contato/detalhes-contato.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
    },
    {
        path: 'inserir',
        component: InserirContatosComponent,
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'editar/:id',
        component: EditarContatoComponent,
        resolve: { 'contato': formContatoResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'listar',
        component: ListarContatosComponent,
        resolve: { 'contatos': listarContatoResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'excluir/:id',
        component: ExcluirContatoComponent,
        resolve: { 'contato': contatoCompletoResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path:'detalhes/:id',
        component:DetalhesContatoComponent,
        resolve: { 'contato': contatoCompletoResolve },
        canActivate: [usuarioAutenticadoGuard]

    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContatoRouterModule {

}
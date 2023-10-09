import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { usuarioAutenticadoGuard } from "src/app/services/guards/usuario-autenticado.guard";
import { listarContatoResolve } from "../../contatos/resolvers/contato-resolver";
import { EditarCompromissosComponent } from "../editar-compromissos/editar-compromissos.component";
import { ExcluirCompromissoComponent } from "../excluir-compromisso/excluir-compromisso.component";
import { InserirCompromissoComponent } from "../inserir-compromisso/inserir-compromisso.component";
import { ListarCompromissosComponent } from "../listar-compromissos/listar-compromissos.component";
import { listarCompromissoResolve, formCompromissoResolve, compromissoCompletoResolve } from "../resolvers/compromisso-resolver";

const routes: Routes = [

    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
    },
    {
        path: 'inserir',
        component: InserirCompromissoComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'contatos': listarContatoResolve }
    },
    {
        path: 'listar',
        component: ListarCompromissosComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'compromissos': listarCompromissoResolve }
    },
    {
        path: 'editar/:id',
        component: EditarCompromissosComponent,
        resolve: { 'compromisso': formCompromissoResolve, 'contatos': listarContatoResolve },
        canActivate: [usuarioAutenticadoGuard]
    },
    {
        path: 'excluir/:id',
        component: ExcluirCompromissoComponent,
        canActivate: [usuarioAutenticadoGuard],
        resolve: { 'compromisso': compromissoCompletoResolve, }
    }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CompromissosRouterModule {

}
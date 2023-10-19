import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrarUsuarioComponent } from "../registrar-usuario/registrar-usuario.component";
import { usuarioNaoAutenticadoGuard } from "src/app/core/auth/guards/usuario-autenticado.guard";

const routes: Routes = [
    {
        path: '',
        component: RegistrarUsuarioComponent,
        canActivate: [usuarioNaoAutenticadoGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class RegistroRouterModule {

}
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { usuarioNaoAutenticadoGuard } from "src/app/services/guards/usuario-autenticado.guard";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [usuarioNaoAutenticadoGuard]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class LoginRouterModule {

}
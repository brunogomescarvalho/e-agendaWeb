import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrarUsuarioComponent } from "../registrar-usuario/registrar-usuario.component";

const routes: Routes = [
    {
        path: '',
        component: RegistrarUsuarioComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class RegistroRouterModule {

}
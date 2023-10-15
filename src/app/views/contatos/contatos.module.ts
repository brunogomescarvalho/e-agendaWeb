import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatoService } from './service/contato.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { CardContatoComponent } from './componentes/card-contato/card-contato.component';
import { FormularioContatoComponent } from './componentes/formulario-contato/formulario-contato.component';
import 'src/app/extensions/form-group.extension';
import { ContatoRouterModule } from './router-module/contatos-router.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalhesContatoComponent } from './detalhes-contato/detalhes-contato.component';
import { ModalComponent } from 'src/app/core/componentes/modal/modal.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent,
    EditarContatoComponent,
    ExcluirContatoComponent,
    CardContatoComponent,
    FormularioContatoComponent,
    DetalhesContatoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContatoRouterModule,
    NgbTooltipModule,
    CoreModule
  ],
  providers: [
    ContatoService,
  
  ]
})
export class ContatosModule { }

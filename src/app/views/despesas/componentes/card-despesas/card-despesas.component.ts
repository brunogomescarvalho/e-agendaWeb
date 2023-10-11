import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarDespesasViewModel } from '../../models/listar-despesas.view-model';

@Component({
  selector: 'app-card-despesas',
  templateUrl: './card-despesas.component.html',
  styleUrls: ['./card-despesas.component.css']
})
export class CardDespesasComponent {
  tema = 'primary'

  @Input({ required: true }) despesa!: ListarDespesasViewModel

  @Output() onExcluirDespesa = new EventEmitter<ListarDespesasViewModel>()

  @Output() onEditarDespesa = new EventEmitter<ListarDespesasViewModel>()

  public editar(despesa: ListarDespesasViewModel) {
    this.onEditarDespesa.emit(despesa)
  }
  public excluir(despesa: any) {
    this.onExcluirDespesa.emit(despesa)
  }
}

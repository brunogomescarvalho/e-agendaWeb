import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarContatosViewModel } from '../../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
  tema = 'secondary'

  @Output() onExcluirContato = new EventEmitter<ListarContatosViewModel>()

  @Output() onEditarContato = new EventEmitter<ListarContatosViewModel>()

  @Input() contato!: ListarContatosViewModel

  editar(contato: ListarContatosViewModel) {
    this.onEditarContato.emit(contato)
  }

  excluir(contato: ListarContatosViewModel) {
    this.onExcluirContato.emit(contato)
  }


}

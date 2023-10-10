import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListarContatosViewModel } from '../../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent implements OnInit {

  ngOnInit(): void {
    this.tema = this.contato.favorito ? 'primary' : 'info'
  }
  tema: string = 'info' || 'primary'

  @Output() onExcluirContato = new EventEmitter<ListarContatosViewModel>()

  @Output() onEditarContato = new EventEmitter<ListarContatosViewModel>()

  @Output() onFavoritarContato = new EventEmitter<ListarContatosViewModel>()

  @Input() contato!: ListarContatosViewModel

  editar(contato: ListarContatosViewModel) {
    this.onEditarContato.emit(contato)
  }

  excluir(contato: ListarContatosViewModel) {
    this.onExcluirContato.emit(contato)
  }

  favoritar(contato: ListarContatosViewModel) {
    this.tema = !this.contato.favorito ? 'primary' : 'info'
    this.onFavoritarContato.emit(contato)
  }


}

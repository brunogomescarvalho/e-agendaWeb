import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListarContatosViewModel } from '../../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent implements OnInit {

  ngOnInit(): void {
    this.favorito = this.contato.favorito
  }
  tema: string = 'primary'
  favorito: boolean = true

  @Output() onExcluirContato = new EventEmitter<ListarContatosViewModel>()

  @Output() onEditarContato = new EventEmitter<ListarContatosViewModel>()

  @Output() onFavoritarContato = new EventEmitter<ListarContatosViewModel>()

  @Output() onDetalhesContato = new EventEmitter<ListarContatosViewModel>()

  @Input() contato!: ListarContatosViewModel

  editar(contato: ListarContatosViewModel) {
    this.onEditarContato.emit(contato)
  }

  excluir(contato: ListarContatosViewModel) {
    this.onExcluirContato.emit(contato)
  }

  favoritar(contato: ListarContatosViewModel) {
    this.favorito = !this.contato.favorito
    this.onFavoritarContato.emit(contato)
  }

  detalhes(contato: ListarContatosViewModel) {
    this.onDetalhesContato.emit(contato)
  }


}

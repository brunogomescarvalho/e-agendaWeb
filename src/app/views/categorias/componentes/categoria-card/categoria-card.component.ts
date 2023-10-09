
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarCategoriasViewModel } from '../../models/listar-categorias-view-model';

@Component({
  selector: 'app-categoria-card',
  templateUrl: './categoria-card.component.html',
  styleUrls: ['./categoria-card.component.css']
})
export class CategoriaCardComponent {

  tema = 'info'

  @Input({ required: true }) categoria!: ListarCategoriasViewModel

  @Output() onExcluirCategoria = new EventEmitter<ListarCategoriasViewModel>()

  @Output() onEditarCategoria = new EventEmitter<ListarCategoriasViewModel>()

  public editar(categoria: ListarCategoriasViewModel) {
    this.onEditarCategoria.emit(categoria)
  }
  public excluir(categoria: any) {
    this.onExcluirCategoria.emit(categoria)
  }
}


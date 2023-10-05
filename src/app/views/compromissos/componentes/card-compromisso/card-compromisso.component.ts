import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListaCompromissosViewModel } from '../../models/listar-compromissos.view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent {

  @Input({ required: true }) compromisso!: ListaCompromissosViewModel

  @Output() onExcluirCompromisso = new EventEmitter<ListaCompromissosViewModel>()

  @Output() onEditarCompromisso = new EventEmitter<ListaCompromissosViewModel>()

  constructor(private router: Router) { }

  public editar(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/editar', compromisso.id])
  }
  public excluir(compromisso: any) {
    this.router.navigate(['/compromissos/excluir', compromisso.id])
  }
}

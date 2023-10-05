import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../service/compromisso.service';
import { ListaCompromissosViewModel } from '../models/listar-compromissos.view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos!: ListaCompromissosViewModel[]


  constructor(private service: CompromissoService, private router: Router) { }

  ngOnInit(): void {
    this.service.selecionarTodos()
      .subscribe(dados => { this.compromissos = dados; console.log(dados) })
  }

  public editar(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/editar', compromisso.id])
  }

  public excluir(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/excluir', compromisso.id])
  }

}

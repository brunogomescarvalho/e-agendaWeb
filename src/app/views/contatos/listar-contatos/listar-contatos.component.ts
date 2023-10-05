import { Component, OnInit } from '@angular/core';
import { ListarContatosViewModel } from '../models/listar-contato.view-model';
import { ContatoService } from '../service/contato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos?: ListarContatosViewModel[]

  constructor(private service: ContatoService, private router: Router) { }

  ngOnInit(): void {
    this.service.selecionarTodos()
      .subscribe(dados => this.contatos = dados)
  }

  public editar(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/editar', contato.id])
  }

  public excluir(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/excluir', contato.id])
  }

}

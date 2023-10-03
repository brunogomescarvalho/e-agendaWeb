import { Component, OnInit } from '@angular/core';
import { ListarContatosViewModel } from '../models/listar-contato-view-model';
import { ContatoService } from '../service/contato.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos?: ListarContatosViewModel[]
  
  constructor(private service: ContatoService) { }

  ngOnInit(): void {
    this.service.selecionarTodos()
      .subscribe(dados => this.contatos = dados)
  }

}

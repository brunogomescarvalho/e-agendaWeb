import { Component, OnInit } from '@angular/core';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { ListarContatosViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatoService } from '../../contatos/service/contato.service';
import { CompromissoService } from '../service/compromisso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit {

 
  contatos!: ListarContatosViewModel[]

  constructor(private contatoService: ContatoService, private compromissoService: CompromissoService, private router: Router) { }

  ngOnInit(): void {
    this.contatoService.selecionarTodos()
      .subscribe(res => this.contatos = res)
  }

  inserir(compromisso: FormCompromissoViewModel) {
    this.compromissoService.inserir(compromisso)
      .subscribe(() => this.router.navigate(['/compromissos/listar']))
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarContatosViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatoService } from '../../contatos/service/contato.service';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { CompromissoService } from '../service/compromisso.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-editar-compromissos',
  templateUrl: './editar-compromissos.component.html',
  styleUrls: ['./editar-compromissos.component.css']
})
export class EditarCompromissosComponent implements OnInit {

  compromisso!: FormCompromissoViewModel
  contatos!: ListarContatosViewModel[]
  idSelecionado!: string

  constructor(private route: ActivatedRoute, private contatoService: ContatoService, private compromissoService: CompromissoService, private router: Router) { }

  ngOnInit(): void {

    this.idSelecionado = this.route.snapshot.params['id'];

    forkJoin({
      compromisso: this.compromissoService.selecionarPorId(this.idSelecionado),
      contatos: this.contatoService.selecionarTodos()
    }).subscribe(res => {
      this.compromisso = res.compromisso
      this.contatos = res.contatos
    })

  }

  editar(compromisso: FormCompromissoViewModel) {
    this.compromisso = compromisso
    this.compromissoService.editar(this.idSelecionado, this.compromisso)
      .subscribe(() => this.router.navigate(['/compromissos/listar']))
  }

}

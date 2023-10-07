import { Component, OnInit } from '@angular/core';
import { FormCompromissoViewModel } from '../models/form-compromisso.view-model';
import { ListarContatosViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatoService } from '../../contatos/service/contato.service';
import { CompromissoService } from '../service/compromisso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit {


  contatos!: ListarContatosViewModel[]

  constructor(private route: ActivatedRoute, private contatoService: ContatoService, private compromissoService: CompromissoService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.obterContatos();
  }

  private obterContatos() {
    this.route.data.pipe(map((dados => dados['contatos'])))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (contatos) => this.contatos = contatos,
        complete: () => {
          if (this.contatos.length == 0)
            this.toast.warning('Nenhum contato cadastrado até o momento!');
        }
      });
  }

  inserir(compromisso: FormCompromissoViewModel) {
    this.compromissoService.inserir(compromisso)
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: () => {
          this.toast.success('Compromisso cadastrado com sucesso', "Sucesso")
          this.router.navigate(['/compromissos/listar'])
        }
      })
  }

}

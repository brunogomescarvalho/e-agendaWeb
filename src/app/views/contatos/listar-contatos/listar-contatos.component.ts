import { Component, OnInit } from '@angular/core';
import { ListarContatosViewModel } from '../models/listar-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ContatoService } from '../service/contato.service';
import { StatusFavorito } from '../models/status-favorito.enum';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos?: ListarContatosViewModel[]
  opcaoSelecionada: StatusFavorito = StatusFavorito.TODOS

  constructor(private router: Router, private toast: ToastrService, private route: ActivatedRoute, private service: ContatoService) { }

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['contatos']))
      .subscribe({
        error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
        next: (dados) => {
          this.contatos = dados
          if (this.contatos?.length == 0)
            this.toast.warning('Nenhum contato cadastrado até o momento')
        }
      })
  }

  public editar(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/editar', contato.id])
  }

  public excluir(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/excluir', contato.id])
  }

  public detalhes(contato: ListarContatosViewModel) {
    this.router.navigate(['/contatos/detalhes', contato.id])
  }

  public alterarFavorito(contato: ListarContatosViewModel) {
    contato.favorito = !contato.favorito;

    this.service.alterarFavorito(contato.id, contato)
      .subscribe({
        error: (erro) => this.toast.error(erro.message),
        next: (res: any) => {
          let status = res.dados.favorito == true ? 'adicionado aos' : 'removido dos';
          this.toast.success(`Contato ${status} favoritos`, 'Sucesso');
        }
      }).add(() => {
        if (this.opcaoSelecionada == StatusFavorito.FAVORITOS) {
          const index = this.contatos?.findIndex(x => x.id === contato.id)!;
          this.contatos?.splice(index, 1);
        }
      })
  }

  onRadioChange(event: any) {
    this.contatos = []
    this.opcaoSelecionada = event.target.value!;

    this.service.selecionarTodos(this.opcaoSelecionada)
      .subscribe({
        error: (erro: HttpErrorResponse) => this.toast.error(erro.message, 'Erro!'),
        next: (dados) => {
          this.contatos = dados

          if (this.contatos?.length == 0 && this.opcaoSelecionada == StatusFavorito.FAVORITOS)
            this.toast.warning('Nenhum contato favorito até o momento')

          else if (this.contatos?.length == 0 && this.opcaoSelecionada == StatusFavorito.TODOS)
            this.toast.warning('Nenhum contato cadastrado até o momento')
        }
      })
  }

}

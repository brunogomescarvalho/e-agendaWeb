import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarTarefasViewModel } from '../models/tarefas/listar-tarefa.view-model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent implements OnInit {

  tarefas?: ListarTarefasViewModel[]

  constructor(private route: ActivatedRoute, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.data.pipe((map(dados => dados['tarefas']))).subscribe({
      error: (erro: Error) => this.toast.error(erro.message, 'Erro'),
      next: (dados) => {
        this.tarefas = dados
        if (this.tarefas?.length == 0)
          this.toast.warning('Nenhuma tarefa cadastrada até o momento')
      }

    })
  }

  excluir(tarefa: ListarTarefasViewModel) {
    this.router.navigate(['tarefas/excluir', tarefa.id])
  }

  editar(tarefa: ListarTarefasViewModel) {
    this.router.navigate(['tarefas/editar', tarefa.id])
  }

  detalhes(tarefa: ListarTarefasViewModel) {
    this.router.navigate(['tarefas/detalhes', tarefa.id])
  }
}

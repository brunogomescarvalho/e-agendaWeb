import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { VisualizarTarefasViewModel } from '../models/tarefas/visualizar-tarefa.view-model';
import { TarefasService } from '../service/tarefas.service';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css']
})
export class ExcluirTarefaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private toast: ToastrService, private service: TarefasService, private router: Router) { }

  tarefa!: VisualizarTarefasViewModel

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['tarefa']))
      .subscribe({
        error: (erro) => this.toast.error(erro.message),
        next: (tarefa) => this.tarefa = tarefa
      })
  }


  excluirTarefa() {
    this.service.excluir(this.tarefa.id)
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: () => {
          this.toast.success('Tarefa excluída com sucesso', 'Sucesso')
          this.router.navigate(['tarefas/listar'])
        }
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisualizarTarefasViewModel } from '../models/tarefas/visualizar-tarefa.view-model';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes-tarefa',
  templateUrl: './detalhes-tarefa.component.html',
  styleUrls: ['./detalhes-tarefa.component.css']
})
export class DetalhesTarefaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private toast: ToastrService) { }

  tarefa!: VisualizarTarefasViewModel

  ngOnInit(): void {
    this.route.data.pipe(map(dados => dados['tarefa']))
      .subscribe({
        error: (erro) => this.toast.error(erro.message),
        next: (tarefa) => this.tarefa = tarefa
      })
  }

}

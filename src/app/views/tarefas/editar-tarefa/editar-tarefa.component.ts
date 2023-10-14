import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../service/tarefas.service';
import { map } from 'rxjs';
import { FormTarefasViewModel } from '../models/tarefas/form-tarefas.view-model';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  tarefa!: FormTarefasViewModel

  idSelecionado!: string

  constructor(private service: TarefasService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.params['id']
    this.route.data.pipe(map(dados => dados['tarefa']))
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: (tarefa) => this.tarefa = tarefa
      })
  }

  editar(tarefa: FormTarefasViewModel) {
    const tarefaFormatada: FormTarefasViewModel = {
      ...tarefa,
      prioridade: Number(tarefa.prioridade)
    }

    this.service.editar(this.idSelecionado, tarefaFormatada)
      .subscribe({
        error: ((err: Error) => this.toast.error(err.message)),
        next: () => {
          this.toast.success('Tarefa editada com sucesso!')
          this.router.navigate(['tarefas/listar'])
        }
      })
  }

}

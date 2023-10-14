import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../service/tarefas.service';
import { FormTarefasViewModel } from '../models/tarefas/form-tarefas.view-model';
import { StatusItemTarefa } from '../models/itens-tarefas/item-tarefa.view-model';


@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css']
})
export class InserirTarefaComponent {
  constructor(private service: TarefasService, private toast: ToastrService, private router: Router) { }


  inserir(tarefa: FormTarefasViewModel) {

    const tarefaFormatada: FormTarefasViewModel = {
      ...tarefa,
      prioridade: Number(tarefa.prioridade),
      itens: tarefa.itens.filter(x => x.status != StatusItemTarefa.Removido)
    }
    this.service.inserir(tarefaFormatada)
      .subscribe({
        error: ((err: Error) => this.toast.error(err.message)),
        next: () => {
          this.toast.success('Tarefa cadastrada com sucesso!')
          this.router.navigate(['tarefas/listar'])
        }
      })
  }
}

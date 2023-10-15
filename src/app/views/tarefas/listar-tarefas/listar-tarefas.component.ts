import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { ListarTarefasViewModel } from '../models/tarefas/listar-tarefa.view-model';
import { TarefasService } from '../service/tarefas.service';
import { StatusTarefa } from '../models/tarefas/status-tarefa.enum';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent implements OnInit {

  tarefas?: ListarTarefasViewModel[]

  opcoesFiltro: any[] = []

  @Output() onAbrirModalFiltro = new EventEmitter()

  constructor(private route: ActivatedRoute, private toast: ToastrService, private router: Router, private service: TarefasService) { }

  ngOnInit(): void {
    const observable = this.route.data.pipe((map(dados => dados['tarefas'])))
    this.subscribeTarefa(observable)
    this.obterEnumStatus()
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

  filtrar(opcao: any) {
    this.subscribeTarefa(this.service.selecionarTodos(opcao));
  }

  abrirFiltro(){
    this.onAbrirModalFiltro.emit()
  }

  private subscribeTarefa(observable: Observable<ListarTarefasViewModel[]>) {
    observable.subscribe({
      error: (erro: Error) => this.toast.error(erro.message, 'Erro'),
      next: (dados) => {
        this.tarefas = dados
        if (this.tarefas?.length == 0)
          this.toast.warning('Nenhuma tarefa cadastrada até o momento')
      }
    })
  }

  private obterEnumStatus() {
    for (const item in StatusTarefa) {
      if (isNaN(Number(StatusTarefa[item])))
        this.opcoesFiltro.push({ descricao: StatusTarefa[item], valor: Number(item) });
    }
  }

}

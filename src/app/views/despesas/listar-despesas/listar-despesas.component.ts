import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DespesasService } from '../service/despesas.service';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltroDespesas } from '../models/filtro-despesa.enum';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit {

  @Output() onAbrirModalFiltro = new EventEmitter()

  despesas!: ListarDespesasViewModel[]

  opcoesFiltro: any[] = []

  constructor(private service: DespesasService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.obterEnumFiltro();
    this.subscribeDespesas(this.service.selecionarTodos())
  }

  editar(despesa: ListarDespesasViewModel) {
    this.router.navigate(['despesas/editar', despesa.id])
  }
  excluir(despesa: ListarDespesasViewModel) {
    this.router.navigate(['despesas/excluir', despesa.id])
  }

  detalhes(despesa: ListarDespesasViewModel) {
    this.router.navigate(['despesas/detalhes', despesa.id])
  }

  abrirFiltro() {
    this.onAbrirModalFiltro.emit()
  }

  filtrar(opcao: any) {
    let observable!: Observable<ListarDespesasViewModel[]>

    switch (Number(opcao)) {
      case 0: observable = this.service.selecionarTodos(); break
      case 1: observable = this.service.selecionarUltimos30Dias(); break
      case 2: observable = this.service.selecionarAntigas(); break
    }

    this.subscribeDespesas(observable);
  }

  private subscribeDespesas(observable: Observable<ListarDespesasViewModel[]>) {
    observable.subscribe({
      error: (err: Error) => this.toast.error(err.message),
      next: (despesas) => {
        this.despesas = despesas;
        if (this.despesas.length == 0)
          this.toast.warning('Nenhuma despesa cadastrada até o momento!');
      }
    });
  }

  private obterEnumFiltro() {
    for (const item in FiltroDespesas) {
      if (isNaN(Number(FiltroDespesas[item])))
        this.opcoesFiltro.push({ descricao: FiltroDespesas[item], valor: Number(item) });
    }
  }

}

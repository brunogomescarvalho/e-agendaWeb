import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListaCompromissosViewModel } from '../models/listar-compromissos.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroCompromisso } from '../models/filtroCompromisso.model';
import { CompromissoService } from '../service/compromisso.service';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos!: ListaCompromissosViewModel[]

  @Output() onAbrirFiltro = new EventEmitter()

  constructor(private service: CompromissoService, private route: ActivatedRoute, private router: Router, private toast: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obterCompromissos();

  }

  private obterCompromissos() {
    let observer = this.route.data.pipe(map((dados) => dados['compromissos']))
    this.subscribeCompromissos(observer)

  }

  public editar(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/editar', compromisso.id])
  }

  public excluir(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/excluir', compromisso.id])
  }

  public detalhes(compromisso: ListaCompromissosViewModel) {
    this.router.navigate(['/compromissos/detalhes', compromisso.id])
  }

  public abrirFiltro() {
    this.onAbrirFiltro.emit(true)
  }

  public filtrarCompromissos(filtro: FiltroCompromisso) {

    let observable!: Observable<ListaCompromissosViewModel[]>

    switch (filtro.opcaoSelecionada) {
      case 'Hoje':
        observable = this.service.obterCompromissosHoje(); break
      case 'Futuros':
        observable = this.service.obterCompromissosFuturos(filtro.dataInicial, filtro.dataFinal); break
      case 'Passados':
        observable = this.service.obterCompromissosPassados(filtro.dataReferencia); break
    }

    this.subscribeCompromissos(observable)

  };

  private subscribeCompromissos(observer: Observable<ListaCompromissosViewModel[]>) {
    observer.subscribe({
      error: (err: HttpErrorResponse) => this.toast.error(err.message, 'Erro!'),
      next: (dados) => {
        this.compromissos = dados;
        if (this.compromissos?.length == 0)
          this.toast.warning('Nenhum compromisso cadastrado até o momento');
      }
    })
  }



}






import { Component, OnInit } from '@angular/core';
import { DespesasService } from '../service/despesas.service';
import { ListarDespesasViewModel } from '../models/listar-despesas.view-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit {

  despesas!: ListarDespesasViewModel[]
  constructor(private service: DespesasService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.selecionarTodos()
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: (despesas) => {
          this.despesas = despesas
          if (this.despesas.length == 0)
            this.toast.warning('Nenhuma despesa cadastrada até o momento!')
        }
      })
  }

  editar(despesa: ListarDespesasViewModel) {
    this.router.navigate(['despesas/editar', despesa.id])
  }
  excluir(despesa: ListarDespesasViewModel) {
    this.router.navigate(['despesas/excluir', despesa.id])
  }

}

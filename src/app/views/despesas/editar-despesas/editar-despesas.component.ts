import { Component, OnInit } from '@angular/core';
import { FormDespesaViewModel } from '../models/form-despesa.view-model';
import { DespesasService } from '../service/despesas.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarCategoriasViewModel } from '../../categorias/models/listar-categorias-view-model';

@Component({
  selector: 'app-editar-despesas',
  templateUrl: './editar-despesas.component.html',
  styleUrls: ['./editar-despesas.component.css']
})
export class EditarDespesasComponent implements OnInit {
  despesa!: FormDespesaViewModel
  idSelecionado!: string
  categorias!: ListarCategoriasViewModel[]

  constructor(private service: DespesasService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.params['id']
    this.despesa = this.route.snapshot.data['despesa']
    this.categorias = this.route.snapshot.data['categorias']

  }

  editar(despesa: FormDespesaViewModel) {
    this.service.editar(this.idSelecionado, despesa)
      .subscribe({
        error: (erro: Error) => this.toast.error(erro.message),
        next: () => {
          this.toast.success('Despesa Editada com sucesso')
          this.router.navigate(['despesas/listar'])
        },
      })
  }



}

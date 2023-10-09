import { Component } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { FormCategoriaViewModel } from '../models/form-categoria.view-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent {


  constructor(private service: CategoriaService, private toast: ToastrService, private router: Router) { }


  inserir(categoria: FormCategoriaViewModel) {
    this.service.inserir(categoria)
      .subscribe({
        error: ((err: Error) => this.toast.error(err.message)),
        next: () => {
          this.toast.success('Categoria cadastrada com sucesso!')
          this.router.navigate(['categorias/listar'])
        }
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormCategoriaViewModel } from '../models/form-categoria.view-model';
import { CategoriaService } from '../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoria!: FormCategoriaViewModel
  id!: string

  constructor(private service: CategoriaService, private route: ActivatedRoute, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.route.data.pipe(map(res => res['categoria'])).subscribe({
      error: (err: Error) => this.toast.error(err.message),
      next: (dados) => { this.categoria = dados }
    })
  }

  editar(categoria: FormCategoriaViewModel) {
    this.categoria = categoria
    this.service.editar(this.id, this.categoria)
      .subscribe({
        error: (err: Error) => this.toast.error(err.message),
        next: () => {
          this.toast.success('Categoria editada com sucesso!')
          this.router.navigate(['categorias/listar'])
        }
      })
  }

}

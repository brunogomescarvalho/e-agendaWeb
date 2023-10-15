import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuarioService/usuario.service';
import { TokenUsuario } from '../login/models/token.view-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  usuarioLogado?: string;


  ngOnInit() {
    if (!this.usuarioService.tokenValido()) {
      this.router.navigate(['/login'])
    }
    else {
      this.usuarioLogado = this.usuarioService.obterUsuarioLogado().usuario.nome
    }
  }
}



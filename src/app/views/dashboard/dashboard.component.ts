import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/auth/services/usuario.service';
import { TokenUsuario } from '../login/models/token.view-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  usuarioLogado$?: Observable<TokenUsuario | null>;

  ngOnInit() {

    this.usuarioLogado$ = this.usuarioService.usuarioLogado()

  }

}



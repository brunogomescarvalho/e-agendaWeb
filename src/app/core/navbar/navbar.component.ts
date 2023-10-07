import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/views/login/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  estaColapsada: boolean = true;

  constructor(private router: Router) { }

  sair() {

    localStorage.removeItem('tokenEAgenda')
    this.router.navigate(['/login'])

  }
}

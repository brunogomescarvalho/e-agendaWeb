import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

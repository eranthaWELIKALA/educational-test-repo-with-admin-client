import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentRoute: string | undefined

  constructor(private router: Router, public keycloakService: KeycloakService) { }

  ngOnInit(): void {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe({
        next: (event) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = event['url'];
            this.currentRoute = this.currentRoute.replace('/', '');
          }
        }
      });
  }

  logout() {
    this.keycloakService.logout();
  }

}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard extends KeycloakAuthGuard {
  public shouldHaveAllRoles: boolean = true
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // this.shouldHaveAllRoles = route.data['shouldHaveAllRoles'] != null ? route.data['shouldHaveAllRoles'] : true
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {      
      // this.router.navigateByUrl("login");
      // return false;
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }
    return true;

    // Get the roles required from the route.
    // const requiredRoles = route.data['roles'];

    // Allow the user to to proceed if no additional roles are required to access the route.
    // if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
    //   return true;
    // }

    // // Allow the user to proceed if all the required roles are present.
    // if (this.shouldHaveAllRoles && (requiredRoles.every((role) => this.roles.includes(role)))) {
    //   return true
    // }
    // else if (!this.shouldHaveAllRoles && (requiredRoles.some((role) => this.roles.includes(role)))) {
    //   return true
    // }
    // else {
    //   this.router.navigateByUrl("error")
    //   return false
    // }
  }
}
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakUserProfile } from '../utils/keycloak/defs/keycloakUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: KeycloakUserProfile = {}

  constructor(private keycloack: KeycloakService) { }

  ngOnInit(): void {
    this.keycloack.loadUserProfile().then(res => {      
      this.user = res
    })
  }

}

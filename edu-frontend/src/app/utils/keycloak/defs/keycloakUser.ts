import { KeycloakProfile } from 'keycloak-js';

export interface KeycloakUserProfile extends KeycloakProfile {
  attributes?: KeycloakUserAttributes
}

interface KeycloakUserAttributes {
  regNumber: string[]
  subjects?: string[]
  grade?: string[]
}
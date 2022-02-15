import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: `${environment.KEYCLOAK_URL}/auth`,
                realm: environment.KEYCLOAK_REALM,
                clientId: environment.KEYCLOAK_CLIENT_ID
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                checkLoginIframe: true,
                checkLoginIframeInterval: 25
            },
            loadUserProfileAtStartUp: true
        });
}
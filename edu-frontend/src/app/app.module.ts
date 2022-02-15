import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './login/login.component';
import { initializeKeycloak } from './utils/keycloak/app.init';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GetApisComponent } from './get-apis/get-apis.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { GetApiDetailsComponent } from './get-api-details/get-api-details.component';
import { CreateApiComponent } from './create-api/create-api.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GetApisComponent,
    AppNavbarComponent,
    HomeComponent,
    GetApiDetailsComponent,
    CreateApiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

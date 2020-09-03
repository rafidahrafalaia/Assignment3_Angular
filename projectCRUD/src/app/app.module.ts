import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { v4 as uuidv4 } from 'uuid';
import { HomeComponent } from './home/home.component';

import {FormsModule} from '@angular/forms';
import {RouterLink,Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";  
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
   
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch:"full" },
  { path: "home" , component: HomeComponent },
 
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

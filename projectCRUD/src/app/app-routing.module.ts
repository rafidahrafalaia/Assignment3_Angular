import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
   { path: "", redirectTo: "/home", pathMatch:"full" },
   { path: "home" , component: HomeComponent },
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path:'home',component:HomeComponent },
  { path: 'recipe-details/:id', component: DetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
 

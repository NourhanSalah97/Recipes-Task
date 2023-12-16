import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {path:'home',component:HomeComponent },
  { path: 'recipe-details/:id', component: DetailsComponent },
  {path:'favorites',component:FavoritesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
 

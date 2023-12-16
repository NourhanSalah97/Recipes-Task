import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss','../home/home.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteRecipes: any[] = [];
  filteredRecipes: any[] = [];
  constructor(private router:Router){}
  ngOnInit() {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      this.favoriteRecipes = JSON.parse(storedFavorites);
    }
  }
  goToRecipeDetails(recipeId: number): void {
    this.router.navigate(['/recipe-details', recipeId]);
  }
  onSearch(searchText: string): void {

    this.filteredRecipes = this.favoriteRecipes.filter(
      (recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
toggleFavorite(recipe: any) {
  const index = this.favoriteRecipes.findIndex((favRecipe) => favRecipe.id === recipe.id);

  if (index === -1) {
    
    this.favoriteRecipes.push(recipe);
  } else {
    
    this.favoriteRecipes.splice(index, 1);
  }

  
  localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipes));
}
isFavorite(recipe: any): boolean {
  return this.favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);
}
}

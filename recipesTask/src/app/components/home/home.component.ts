import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  favoriteRecipes: any[] = [];
  totalResults: number = 90;
  resultsPerPage: number = 9;
  currentPage: number = 1;
   subscription!: Subscription;
   isFav:boolean=false;

  constructor(private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      this.favoriteRecipes = JSON.parse(storedFavorites);
    }
    this.loadRandomRecipes();
  }
  
  loadRandomRecipes(pageNumber: number = 1, recipesPerPage: number = 9): void {
    this.subscription = this.apiService.getRandomRecipes(pageNumber, recipesPerPage).subscribe(
      (data) => {
        this.recipes = data.recipes;
        this.filteredRecipes = this.recipes;
      },
      (error) => {
        console.error('Error loading random recipes:', error);
      }
    );
  }
  
  getPages(): number[] {
    const pageCount = Math.ceil(this.totalResults / this.resultsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    const recipesPerPage = 9; 
    this.loadRandomRecipes(page, recipesPerPage);
  }
  
  goToRecipeDetails(recipeId: number): void {
    this.router.navigate(['/recipe-details', recipeId]);
  }
  onSearch(searchText: string): void {

    this.filteredRecipes = this.recipes.filter(
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
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
}


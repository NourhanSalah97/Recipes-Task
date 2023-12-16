import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  recipe: any;
 favoriteRecipes: any[]=[];
  constructor(
    private route: ActivatedRoute,
    private DetailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = +params.get('id')!;
      this.loadRecipeDetails(recipeId);
    });
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      this.favoriteRecipes = JSON.parse(storedFavorites);
    }
  }

  loadRecipeDetails(recipeId: number): void {
    this.DetailsService.getRecipeDetails(recipeId).subscribe((data) => {
      this.recipe = data;
    });
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

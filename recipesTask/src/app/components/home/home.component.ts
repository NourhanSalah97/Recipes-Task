import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  recipes: any[] = [];
  totalResults: number = 0;
  resultsPerPage: number = 9;
  currentPage: number = 1;

  constructor(private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    const cuisine = 'Italian';
    const diet = 'vegetarian';

    this.apiService
      .getRecipes(cuisine, diet, this.resultsPerPage, (this.currentPage - 1) * this.resultsPerPage)
      .subscribe((data: any) => {
        this.recipes = data.results;
        this.totalResults = data.totalResults;
      });
  }
  getPages(): number[] {
    const pageCount = Math.ceil(this.totalResults / this.resultsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRecipes();
  }
  goToRecipeDetails(recipeId: number): void {
    this.router.navigate(['/recipe-details', recipeId]);
  }
}


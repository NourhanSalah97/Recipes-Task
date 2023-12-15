import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private DetailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = +params.get('id')!;
      this.loadRecipeDetails(recipeId);
    });
  }

  loadRecipeDetails(recipeId: number): void {
    this.DetailsService.getRecipeDetails(recipeId).subscribe((data) => {
      this.recipe = data;
    });
  }
}

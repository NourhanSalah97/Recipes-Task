import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private apiUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  getRecipeDetails(recipeId: number): Observable<any> {
    const apiKey = 'ab9a1e9e7a8b420ea128952844ce160d'; 
    const url = `${this.apiUrl}/${recipeId}/information`;

    return this.http.get(url, { params: { apiKey } });
  }
}

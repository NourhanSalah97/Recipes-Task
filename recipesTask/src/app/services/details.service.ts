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
    const apiKey = 'f99db906158f4720acafefc139666c1d'; 
    const url = `${this.apiUrl}/${recipeId}/information`;

    return this.http.get(url, { params: { apiKey } });
  }
}

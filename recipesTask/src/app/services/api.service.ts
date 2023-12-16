import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.spoonacular.com/recipes/random';
  private apiKey = 'f99db906158f4720acafefc139666c1d';

  constructor(private http: HttpClient) {}

  getRecipes( diet: string, number: number, offset: number): Observable<any> {
    const params = {
      diet,
      apiKey: this.apiKey,
      number: number.toString(),
      offset: offset.toString(),
      addRecipeInformation: 'true',
    };

    return this.http.get(this.apiUrl, { params });
  }
  getRandomRecipes(pageNumber: number = 1, recipesPerPage: number = 9): Observable<any> {
    const url = `${this.apiUrl}?apiKey=${this.apiKey}&number=${recipesPerPage}`;
    return this.http.get(url);
  }
}

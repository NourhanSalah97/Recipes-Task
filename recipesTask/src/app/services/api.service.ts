import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiKey = 'ab9a1e9e7a8b420ea128952844ce160d';

  constructor(private http: HttpClient) {}

  getRecipes(cuisine: string, diet: string, number: number, offset: number): Observable<any> {
    const params = {
      cuisine,
      diet,
      apiKey: this.apiKey,
      number: number.toString(),
      offset: offset.toString(),
      addRecipeInformation: 'true',
    };

    return this.http.get(this.apiUrl, { params });
  }
  
}

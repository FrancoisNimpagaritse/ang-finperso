import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, throwIfEmpty } from 'rxjs';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private serverUrl: string = "http://localhost:9000";

  constructor(private httpClient: HttpClient) { }

  //Get all categories
  public getAllCategories(): Observable<ICategory[]> {
    let dataUrl: string = `${this.serverUrl}/categories`;    
    return this.httpClient.get<ICategory[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //Get a single category
  public getCategory(categoryId: string): Observable<ICategory> {
    let dataUrl: string = `${this.serverUrl}/categories/${categoryId}`;    
    return this.httpClient.get<ICategory>(dataUrl).pipe(catchError(this.handleError));
  }

  //Create a  category
  public createCategory(category: ICategory): Observable<ICategory> {
    let dataUrl: string = `${this.serverUrl}/categories`;    
    return this.httpClient.post<ICategory>(dataUrl, category).pipe(catchError(this.handleError));
  }

  //Update a  category
  public updateCategory(categoryId: string, category: ICategory): Observable<ICategory> {
    let dataUrl: string = `${this.serverUrl}/categories/${categoryId}`;    
    return this.httpClient.put<ICategory>(dataUrl, category).pipe(catchError(this.handleError));
  }

  //Delete a  category
  public deleteCategory(categoryId: string): Observable<{}> {
    let dataUrl: string = `${this.serverUrl}/categories/${categoryId}`;    
    return this.httpClient.delete<ICategory>(dataUrl).pipe(catchError(this.handleError));
  }

  //Error handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent) {
      //client event
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      //server error
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}

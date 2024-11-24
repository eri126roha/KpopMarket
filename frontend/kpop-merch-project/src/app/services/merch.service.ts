import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Merch } from '../models/merch.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
  private apiUrl = 'http://localhost:3001/api/merchandise';

  constructor(private http: HttpClient) {}

  // Add new merchandise
  addMerch(merchData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addMerch`, merchData, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Public: Retrieve all merchandise items
  getMerchs(): Observable<Merch[]> {
    return this.http.get<Merch[]>(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  // Public: Retrieve a specific merchandise item by ID
  getMerchById(id: string): Observable<Merch> {
    return this.http.get<Merch>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update merchandise (only allowed for the owner)
  updateMerch(id: string, merchData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, merchData, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete merchandise (only allowed for the owner)
  deleteMerch(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Centralized error handling
  private handleError(error: any): Observable<never> {
    console.error('API error occurred:', error);
    return throwError('An error occurred; please try again.');
  }

  // Helper method to retrieve headers with token for secure requests
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Replace with actual token retrieval logic
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map,tap  } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';  // Add this import


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3001/api/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router // Inject the Router here
  ) { }

  getCurrentUser(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    return null;
  }

  
  registerUser(userData: FormData): Observable<any> {
    return this.http.post(`http://localhost:3001/api/users/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = `http://localhost:3001/api/users/login-user`;
    const body = { email, password };
  
    return this.http.post<any>(url, body).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError('Login failed. Please try again.');
      }),
      tap(response => {
        // Store the token and user data after login
        this.cookieService.set('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user)); 
        console.log('API Response:', response); // Log pour vérifier la réponse ici
      })
    );
  }
  

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Helper method to retrieve headers with token for secure requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to validate if token is present and valid
  isTokenValid(token: string): boolean {
    if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000; // Convert to milliseconds
    return expirationDate > new Date().getTime();
  } catch (e) {
    return false;
  }
  }
  


  getToken(): string | null {
    return this.cookieService.get('token'); // Retrieve the token from cookies
  }

  // Centralized error handling
  private handleError(error: any): Observable<never> {
    if (error.status === 401) {
      // handle unauthorized errors (like token expiration or invalid login)
      return throwError('Authentication failed. Please log in again.');
    }
    console.error('API error occurred:', error);
    return throwError('An error occurred; please try again.');
  }

  // Method to log out the user
  logout(): void {
    this.cookieService.delete('token');
  localStorage.removeItem('currentUser');
  this.router.navigate(['/login']); 
  }
  
  
}



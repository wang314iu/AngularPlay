import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

// You can use pipes to link operators together. Pipes let you combine multiple functions into a single function.
// tslint:disable-next-line:max-line-length
// The pipe() function takes as its arguments the functions you want to combine, and returns a new function that, when executed, runs the composed functions in sequence

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  getAll(path: string): Observable<any[]> {
    return this.http.get(`${environment.api_url}${path}`)
      .pipe
      (
      map(response => response as any[]), catchError(e => throwError(new Error('SOMETHING BAD HAPPENED')))
      );
  }

  getOne(path: string, id: number): Observable<any> {
    return this.http.get(`${environment.api_url}${path}` + '/' + id)
      .pipe
      (
      map(response => response), catchError(e => throwError(new Error('SOMETHING BAD HAPPENED')))
      );
  }
  create(path: string, resource: Object = {}, options?): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(resource), options)
      .pipe(map(response => response), catchError(e => throwError(new Error('SOMETHING BAD HAPPENED'))));
  }
  update(path: string, resource) {
    return this.http.put(`${environment.api_url}${path}` + '/' + resource.id, JSON.stringify({ isRead: true }))
      .pipe(map(response => response), catchError(e => throwError(new Error('SOMETHING BAD HAPPENED'))));
  }

  delete(path: string, id) {
    return this.http.delete(`${environment.api_url}${path}` + '/' + id)
      .pipe(map(response => response), catchError(e => throwError(new Error('SOMETHING BAD HAPPENED'))));
  }

  // private handleError(error: Response) {
  //   if (error.status === 400) { return observableThrowError(new BadInputError(error.json())); }
  //   if (error.status === 404) { return observableThrowError(new NotFoundError()); }
  //   if (error.status === 500) { return observableThrowError(new AppError()); }
  //   return observableThrowError(new AppError(error));
  // }
}

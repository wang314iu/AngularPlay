import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { Movie } from '../shared/models/movie';
import { Trailer } from '../shared/models/trailer';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiService: ApiService) { }

  getNowPlayingMovies(): Observable<Movie[]> {
    return this.apiService.getAll('/movies/nowplaying');
  }
  getUpComingMovies(): Observable<Movie[]> {
    return this.apiService.getAll('/movies/upcoming');
  }
  getMostPopularMovies(): Observable<Movie[]> {
    return this.apiService.getAll('/movies/popular');
  }
  getTopMovies(): Observable<Movie[]> {
    return this.apiService.getAll('/movies/top');
  }
  getMoviesByGenre(genreId: number): Observable<Movie[]> {
    console.log('service called');
    return this.apiService.getAll(`${'/movies/genre/'}${genreId}`)
      // .pipe(filter((response: Movie) => response.averageVote > 0));
      // .pipe(
      //   map(
      //     (result) => result.filter((response: Movie) => response.averageVote > 5)
      //   ));
      .pipe(
      //  filter((m: Movie) => m.averageVote > 6),
        map((m: Movie) =>  m )
      );
  }

  getMovieDetailsByTmdbId(id: number): Observable<Movie> {
    return this.apiService.getOne(`${'/movies/details/'}`, id);

  }

  getAllMovies(): Observable<Movie[]> {
    return this.apiService.getAll('/movies/');
  }
  getMovieTrailers(id: number): Observable<Trailer[]> {
    return this.apiService.getAll(`${'/movies/videos/'}${id}`);
  }
}

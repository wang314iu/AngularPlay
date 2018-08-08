import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[];
  gid: number;
  urlsegmant: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        console.log(this.route.snapshot.url);
        this.urlsegmant = this.route.snapshot.url[0].path;
        this.gid = +params.get('id');

        if (this.gid > 0) {
          this.movieService.getMoviesByGenre(this.gid)
            .subscribe(
              g => {
                this.movies = g;
                //  console.log('movie card called');
              }
            );
        } else {
          this.movieService.getAllMovies()
            .subscribe(
              m => {
                this.movies = m;
                console.log(this.movies);
              }
            );
        }
      }
    );


  }

}

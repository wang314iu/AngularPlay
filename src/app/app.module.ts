import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MovieListComponent } from './movies/movie-list.component';
import { MovieComponent } from './movies/movie.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found.component';
import { HeaderComponent } from './shared/layout/header.component';
import { GenreListComponent } from './genre/genre-list.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { MyMoviesComponent } from './movies/my-movies.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    GenreListComponent,
    LoginComponent,
    MyMoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost']
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'movies', component: MovieListComponent },
      { path: 'movie/:id', component: MovieComponent },
      { path: 'login', component: LoginComponent },
      { path: 'genre/:id', component: MovieListComponent },
      { path: 'my/movies', component: MyMoviesComponent, canActivate: [AuthenticationGuardService] },
      { path: '**', component: NotFoundComponent }
    ])

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MovieListComponent } from './movies/movie-list.component';
import { MovieComponent } from './movies/movie.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found.component';
import { HeaderComponent } from './shared/layout/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MovieListComponent },
      { path: 'movies', component: MovieListComponent },
      { path: 'movie/:id', component: MovieComponent },
      { path: '**', component: NotFoundComponent }
    ])

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

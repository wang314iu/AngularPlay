import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { AdminAuthenticationGuardService } from './services/admin-authentication-guard.service';
import { MovieFormComponent } from './movies/movie-form.component';
import { AdminMovieDetailsComponent } from './movies/admin-movie-details.component';
import { AdminMoviesComponent } from './movies/admin-movies.component';
import { AdminOrdersComponent } from './movies/admin-orders.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { CreateAccountComponent } from './account/create-account.component';
import { AboutComponent } from './shared/components/about.component';
import { ContactUsComponent } from './shared/components/contact-us.component';

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
    MyMoviesComponent,
    MovieFormComponent,
    AdminMovieDetailsComponent,
    AdminMoviesComponent,
    AdminOrdersComponent,
    HighlightDirective,
    CreateAccountComponent,
    AboutComponent,
    ContactUsComponent
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
      { path: 'about', component: AboutComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'genre/:id', component: MovieListComponent },
      { path: 'my/movies', component: MyMoviesComponent, canActivate: [AuthenticationGuardService] },
      { path: 'account/create', component: CreateAccountComponent },

      {
        path: 'admin/movie/new', component: MovieFormComponent,
        canActivate: [AuthenticationGuardService, AdminAuthenticationGuardService]
      },
      {
        path: 'admin/movie/:id', component: AdminMovieDetailsComponent,
        canActivate: [AuthenticationGuardService, AdminAuthenticationGuardService]
      },
      {
        path: 'admin/movies', component: AdminMoviesComponent,
        canActivate: [AuthenticationGuardService, AdminAuthenticationGuardService]
      },
      {
        path: 'admin/orders', component: AdminOrdersComponent, data: { expectedRole: ['superAdmin'] },
        canActivate: [AuthenticationGuardService, AdminAuthenticationGuardService]
      },
      { path: '**', component: NotFoundComponent }
    ])

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

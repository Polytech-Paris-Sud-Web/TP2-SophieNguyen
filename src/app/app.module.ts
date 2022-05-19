import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleService } from "./article.service";
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FilterByTitlePipe } from './searchable-articles/filter-by-title.pipe';
import { HomeArticlesComponent } from './home-articles/home-articles.component';
import { SearchableArticlesComponent } from './searchable-articles/searchable-articles.component';
import { AuthorComponent } from './author/author.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeArticlesComponent
  },
  {
    path: 'create',
    component: ArticleCreationComponent,
  },
  {
    path: 'articles',
    component: SearchableArticlesComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleComponent,
  },
  {
    path: 'authors/:id',
    component: AuthorComponent,
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesComponent,
    ArticleCreationComponent,
    NavbarComponent,
    SearchbarComponent,
    FilterByTitlePipe,
    HomeArticlesComponent,
    SearchableArticlesComponent,
    AuthorComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

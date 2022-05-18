import { Component } from '@angular/core';
import {ArticlesComponent} from "../articles/articles.component";

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
})
/**
 * Homepage showing the last 10 articles posted
 */
export class HomeArticlesComponent extends ArticlesComponent {

  override fetchArticles() {
    if (this.articleSubscription?.closed == false) this.articleSubscription?.unsubscribe();
    this.articleSubscription = this.articleService.getLastArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Articles stream completed')
      }
    });
  }

}

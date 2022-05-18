import {Component, OnInit} from '@angular/core';
import {Article} from "../article/article";
import {ArticleService} from "../article.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
/**
 * Base component that handles a list of articles
 */
export class ArticlesComponent implements OnInit {

  /** List of articles */
  articles: Article[] = [];
  /** Observable execution */
  articleSubscription: Subscription | undefined;

  constructor(protected articleService: ArticleService) {
  }

  ngOnInit() {
    this.fetchArticles();
  }

  /**
   * Feed and refresh list of articles
   */
  fetchArticles() {
    if (this.articleSubscription?.closed == false) this.articleSubscription?.unsubscribe();
    this.articleSubscription = this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnDestroy() {
    this.articleSubscription?.unsubscribe();
  }
}
